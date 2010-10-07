using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using Composite;
using Composite.Core;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.C1Console.Security;
using Composite.Core.WebClient;
using System.Reflection;


public partial class Renderers_Page : System.Web.UI.Page
{
    private IDisposable _dataScope;

    private PageUrl _url;
    private NameValueCollection _foreignQueryStringParameters;
    private string _cacheUrl = null;
    private bool _requestCompleted = false;


    public Renderers_Page()
    {
        string query = HttpContext.Current.Request.Url.OriginalString;

        _url = PageUrl.Parse(query, out _foreignQueryStringParameters);

        if (_url.PublicationScope != PublicationScope.Published)
        {
            if (UserValidationFacade.IsLoggedIn() == false)
            {
                HttpContext.Current.Response.Redirect(string.Format("/Composite/Login.aspx?ReturnUrl={0}", HttpUtility.UrlEncodeUnicode(HttpContext.Current.Request.Url.OriginalString)), false);
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                return;
            }
        }

        _cacheUrl = HttpContext.Current.Request.Url.PathAndQuery;

        RewritePath();
    }



    protected void Page_Init(object sender, EventArgs e)
    {
        if (_url.PublicationScope != PublicationScope.Published)
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
        }

        _dataScope = new DataScope(DataScopeIdentifier.FromPublicationScope(_url.PublicationScope), _url.Locale); // IDisposable, Disposed in OnUnload

        IPage page = PageManager.GetPageById(_url.PageId);

        if (page == null)
        {
            // GUID not found in lookup
            this.Controls.Add(new LiteralControl("<div>Unknown page id - either this page has not been published yet or it has been deleted.</div>"));
            return;
        }
        
        RenderingResponseHandlerResult responseHandling = RenderingResponseHandlerFacade.GetDataResponseHandling(page.GetDataEntityToken());

        if ((responseHandling != null) && (responseHandling.PreventPublicCaching == true))
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
        }

        if ((responseHandling != null) && (responseHandling.EndRequest || responseHandling.RedirectRequesterTo != null))
        {
            if (responseHandling.RedirectRequesterTo != null)
            {
                Response.Redirect(responseHandling.RedirectRequesterTo.AbsoluteUri, false);
            }

            Context.ApplicationInstance.CompleteRequest();
            _requestCompleted = true;
            return;
        }

        IEnumerable<IPagePlaceholderContent> contents = PageManager.GetPlaceholderContent(page.Id);
        Control renderedPage = PageRenderer.Render(page, contents);
        this.Controls.Add(renderedPage);
        if (this.Form != null) this.Form.Action = Request.RawUrl;
    }


    private void RewritePath()
    {
        UrlBuilder structuredUrl = _url.Build(PageUrlType.Published);

        if (structuredUrl == null)
        {
            return;
        }

        structuredUrl.AddQueryParameters(_foreignQueryStringParameters);

        string pathInfo = new UrlBuilder(_cacheUrl).PathInfo;

        Context.RewritePath(structuredUrl.FilePath, pathInfo, structuredUrl.QueryString);
    }


    protected override void Render(HtmlTextWriter writer)
    {
        if(_requestCompleted)
        {
            return;
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
            base.Render(new HtmlTextWriter(sw));
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

        string xhtml = PageUrlHelper.ChangeRenderingPageUrlsToPublic(markupBuilder.ToString());
        xhtml = Composite.Core.Xml.XhtmlPrettifier.Prettify(xhtml);

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
        Context.RewritePath(_cacheUrl.Replace("%20", " "));
    }

}
