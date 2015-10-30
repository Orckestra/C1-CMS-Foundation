using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.UI;
using Composite.Core.Configuration;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings;


public partial class Renderers_Page : System.Web.UI.Page
{
    private IDisposable _pageEventsPageMeasuring;

    private bool _requestCompleted = false;

    RenderingContext _renderingContext;

    protected override void OnPreInit(EventArgs e)
    {
        // If there's no parameters to the request, redirecting to the application root url
        if (Request.RawUrl.Equals( UrlUtils.ResolvePublicUrl("~/Renderers/Page.aspx"), StringComparison.OrdinalIgnoreCase))
        {
            Response.Redirect(HostingEnvironment.ApplicationVirtualPath, true);
            return;
        }

        _renderingContext = RenderingContext.InitializeFromHttpContext();

        InitializeCulture();

        base.OnPreInit(e);
    }

    protected override void OnInit(EventArgs e)
    {
        if (_renderingContext.RunResponseHandlers())
        {
            _requestCompleted = true;
            return;
        }

        using (Profiler.Measure("ASP.NET controls : OnInit"))
        {
            base.OnInit(e);
        }

        _pageEventsPageMeasuring = Profiler.Measure("ASP.NET controls: PageLoad, Event handling, PreRender");
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

        if (isUpdatePanelPostback)
        {
            base.Render(writer);
            return;
        }

        if (_renderingContext.PreRenderRedirectCheck())
        {
            return;
        }

        var markupBuilder = new StringBuilder();
        var sw = new StringWriter(markupBuilder);
        try
        {
            using (Profiler.Measure("ASP.NET controls: Render"))
            {
                base.Render(new HtmlTextWriter(sw));
            }
        }
        catch (HttpException ex)
        {
            CheckForMultipleAspNetFormsException(ex);
            throw;
        }

        string xhtml = _renderingContext.ConvertInternalLinks(markupBuilder.ToString());

        if (GlobalSettingsFacade.PrettifyPublicMarkup)
        {
            xhtml = _renderingContext.FormatXhtml(xhtml);
        }

        // Inserting perfomance profiling information
        if (_renderingContext.ProfilingEnabled)
        {
            xhtml = _renderingContext.BuildProfilerReport();

            Response.ContentType = "text/xml";
        }

        writer.Write(xhtml);
    }


    private void CheckForMultipleAspNetFormsException(HttpException ex)
    {
        MethodInfo setStringMethod = typeof(HttpContext).Assembly /* System.Web */
                .GetType("System.Web.SR")
                .GetMethod("GetString", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);

        string multipleFormNotAllowedMessage = (string)setStringMethod.Invoke(null, new object[] { "Multiple_forms_not_allowed" });

        bool multipleAspFormTagsExists = ex.Message == multipleFormNotAllowedMessage;
        if (multipleAspFormTagsExists)
        {
            string errorMessage = (this.MasterPageFile != null)
                ? "Multiple <form runat=\"server\" /> elements exist on this page." +
                  "ASP.NET supports only one visible <form runat=\"server\" /> control at a time.\n " +
                  "To fix this, insert a <form runat=\"server\"> ... </form> tag in your master page template that spans all placeholders."
                : "Multiple <asp:form /> elements exist on this page. " +
                  "ASP.NET supports only one visible <form runat=\"server\" /> control at a time.\n " +
                  "To fix this, insert a <asp:form> ... </asp:form> section in your template that spans all controls.";
            
            throw new HttpException(errorMessage);

        }
    }

    protected override void OnUnload(EventArgs e)
    {
        base.OnUnload(e);

        if (_renderingContext != null)
        {
            _renderingContext.Dispose();
        }
    }


    protected override void InitializeCulture()
    {
        if (_renderingContext != null)
        {
            this.Culture = this.UICulture = _renderingContext.Page.DataSourceId.LocaleScope.Name;
        }

        base.InitializeCulture();
    }
}