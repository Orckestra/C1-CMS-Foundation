using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;

using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;
using System.Globalization;


public partial class Renderers_Page : System.Web.UI.Page
{
    private static readonly string ProfilerXslPath = UrlUtils.PublicRootPath + "/Composite/Transformations/page_profiler.xslt";

    private IDisposable _dataScope;

    private bool _profilingEnabled = false;
    private IDisposable _pagePerfMeasuring;
    private IDisposable _pageEventsPageMeasuring;

    private bool _isInMemPreview;
    private PageUrl _url;
    private NameValueCollection _foreignQueryStringParameters;
    private string _cacheUrl = null;
    private bool _requestCompleted = false;

    protected override void OnPreInit(EventArgs e)
    {
        IPage currentPage;

        _isInMemPreview = Context.Items.Contains("SelectedPage") && Context.Items.Contains("SelectedContents");

        if (_isInMemPreview)
        {
            currentPage = (IPage)Context.Items["SelectedPage"];
            _url = new PageUrl(PublicationScope.Unpublished, CultureInfo.CreateSpecificCulture(currentPage.CultureName), currentPage.Id);
            _dataScope = new DataScope(DataScopeIdentifier.FromPublicationScope(_url.PublicationScope), _url.Locale); // IDisposable, Disposed in OnUnload
        }
        else
        {
            _profilingEnabled = UserValidationFacade.IsLoggedIn() && Request.Url.OriginalString.Contains("c1mode=perf");
            if (_profilingEnabled)
            {
                Profiler.BeginProfiling();
                _pagePerfMeasuring = Profiler.Measure("C1 Page");
            }

            _url = PageUrl.Parse(Context.Request.Url.OriginalString, out _foreignQueryStringParameters);
            _dataScope = new DataScope(DataScopeIdentifier.FromPublicationScope(_url.PublicationScope), _url.Locale); // IDisposable, Disposed in OnUnload
            currentPage = PageManager.GetPageById(_url.PageId);

            _cacheUrl = Request.Url.PathAndQuery;
            RewritePath();
        }

        ValidateViewUnpublishedRequest();

        if (currentPage == null)
        {
            throw new HttpException((int)System.Net.HttpStatusCode.NotFound, "Page not found - either this page has not been published yet or it has been deleted.");
        }

        PageRenderer.CurrentPage = currentPage;
        InitializeCulture();

        base.OnPreInit(e);
    }



    protected override void OnInit(EventArgs e)
    {
        if (_url == null || _url.PublicationScope != PublicationScope.Published || Request.IsSecureConnection)
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
        }

        if (!_isInMemPreview)
        {
            var responseHandling = RenderingResponseHandlerFacade.GetDataResponseHandling(PageRenderer.CurrentPage.GetDataEntityToken());
            if (responseHandling != null)
            {
                if (responseHandling.PreventPublicCaching == true)
                {
                    Response.Cache.SetCacheability(HttpCacheability.NoCache);
                }

                if (responseHandling.EndRequest || responseHandling.RedirectRequesterTo != null)
                {
                    if (responseHandling.RedirectRequesterTo != null)
                    {
                        Response.Redirect(responseHandling.RedirectRequesterTo.AbsoluteUri, false);
                    }

                    Context.ApplicationInstance.CompleteRequest();
                    _requestCompleted = true;

                    return;
                }
            }
        }

        var contents = _isInMemPreview ? (IEnumerable<IPagePlaceholderContent>)Context.Items["SelectedContents"] : PageManager.GetPlaceholderContent(PageRenderer.CurrentPage.Id);

        Control renderedPage;
        using (Profiler.Measure("Executing C1 functions"))
        {
            renderedPage = PageRenderer.Render(PageRenderer.CurrentPage, contents);
        }

        if (_isInMemPreview)
        {
            PageRenderer.DisableAspNetPostback(renderedPage);
        }

        using (Profiler.Measure("ASP.NET controls: PageInit"))
        {
            Controls.Add(renderedPage);
        }

        if (Form != null)
        {
            Form.Action = Request.RawUrl;
        }

        _pageEventsPageMeasuring = Profiler.Measure("ASP.NET controls: PageLoad, Event handling, PreRender");

        base.OnInit(e);
    }



    protected override void Render(HtmlTextWriter writer)
    {
        if (_requestCompleted)
        {
            return;
        }

        if (_pageEventsPageMeasuring != null)
        {
            _pageEventsPageMeasuring.Dispose();
        }

        ScriptManager scriptManager = ScriptManager.GetCurrent(this);
        bool isUpdatePanelPostback = scriptManager != null && scriptManager.IsInAsyncPostBack;

        if (isUpdatePanelPostback == true)
        {
            base.Render(writer);
            return;
        }

        StringBuilder markupBuilder = new StringBuilder();
        StringWriter sw = new StringWriter(markupBuilder);
        try
        {
            using (Profiler.Measure("ASP.NET controls: Render"))
            {
                base.Render(new HtmlTextWriter(sw));
            }
        }
        catch (HttpException ex)
        {
            MethodInfo setStringMethod = typeof(HttpContext).Assembly /* System.Web */
                .GetType("System.Web.SR")
                .GetMethod("GetString", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);

            string multipleFormNotAllowedMessage = (string)setStringMethod.Invoke(null, new object[] { "Multiple_forms_not_allowed" });

            bool multipleAspFormTagsExists = ex.Message == multipleFormNotAllowedMessage;

            if (multipleAspFormTagsExists)
            {
                throw new HttpException("Multiple <asp:form /> elements exists on this page. ASP.NET only support one form. To fix this, insert a <asp:form> ... </asp:form> section in your template that spans all controls.");
            }

            throw;
        }

        string xhtml;

        using (Profiler.Measure("Changing 'internal' page urls to 'public'"))
        {
            xhtml = PageUrlHelper.ChangeRenderingPageUrlsToPublic(markupBuilder.ToString());
        }

        try
        {
            using (Profiler.Measure("Formatting output XHTML with Composite.Core.Xml.XhtmlPrettifier"))
            {
                xhtml = Composite.Core.Xml.XhtmlPrettifier.Prettify(xhtml);
            }
        }
        catch
        {
            Log.LogWarning("/Renderers/Page.aspx", "Failed to format output xhtml. Url: " + (_cacheUrl ?? string.Empty));
        }

        // Inserting perfomance profiling information
        if (_profilingEnabled)
        {
            _pagePerfMeasuring.Dispose();

            xhtml = BuildProfilerReport(Profiler.EndProfiling());

            Response.ContentType = "text/xml";
        }

        writer.Write(xhtml);
    }



    protected override void OnUnload(EventArgs e)
    {
        base.OnUnload(e);

        if (_dataScope != null)
            _dataScope.Dispose();

        if (_requestCompleted)
        {
            return;
        }

        // Rewrite path to what it was when this page was constructed. This ensure full page caching can work.
        if (_cacheUrl != null)
        {
            Context.RewritePath(_cacheUrl.Replace("%20", " "));
        }
    }



    private void ValidateViewUnpublishedRequest()
    {
        if (_url != null && _url.PublicationScope != PublicationScope.Published && !UserValidationFacade.IsLoggedIn())
        {
            Response.Redirect(String.Format("{0}/Composite/Login.aspx?ReturnUrl={1}", UrlUtils.PublicRootPath, HttpUtility.UrlEncodeUnicode(Request.Url.OriginalString)), true);
            Context.ApplicationInstance.CompleteRequest();
        }
    }

    
    
    protected override void InitializeCulture()
    {
        var page = PageRenderer.CurrentPage;
        if (page != null)
        {
            this.Culture = this.UICulture = page.CultureName;
        }

        base.InitializeCulture();
    }



    private void RewritePath()
    {
        var structuredUrl = _url.Build(PageUrlType.Public);
        if (structuredUrl == null)
        {
            return;
        }

        structuredUrl.AddQueryParameters(_foreignQueryStringParameters);

        string pathInfo = new UrlBuilder(_cacheUrl).PathInfo;
        Context.RewritePath(structuredUrl.FilePath, pathInfo, structuredUrl.QueryString);
    }




    private string BuildProfilerReport(Measurement measurement)
    {
        string xmlHeader = @"<?xml version=""1.0""?>
                             <?xml-stylesheet type=""text/xsl"" href=""{0}""?>"
                .FormatWith(ProfilerXslPath);

        XElement reportXml = ProfilerReport.BuildReportXml(measurement);
        var url = new UrlBuilder(Context.Request.Url.ToString());
        url["c1mode"] = null;

        reportXml.Add(new XAttribute("description", "URL: " + url));

        return xmlHeader + reportXml.ToString();
    }


    
    public static Control FindControlRecursive(Control current, string controlID)
    {
        if (current == null) throw new ArgumentNullException("current");
        if (controlID == null) throw new ArgumentNullException("controlID");

        if (current.ID == controlID)
        {
            return current;
        }

        foreach (Control c in current.Controls)
        {
            var t = FindControlRecursive(c, controlID);
            if (t != null) return t;
        }

        return null;
    }
}
