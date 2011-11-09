using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;

using Composite.Core.Instrumentation;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data.Types;


public partial class Renderers_Page : System.Web.UI.Page
{
    private IDisposable _pageEventsPageMeasuring;

    private bool _requestCompleted = false;

    RenderingContext _renderingContext;

    protected override void OnPreInit(EventArgs e)
    {
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

        IEnumerable<IPagePlaceholderContent> contents = _renderingContext.GetPagePlaceholderContents();

        if (Master == null)
        {
            Control renderedPage;
            using (Profiler.Measure("Executing C1 functions"))
            {
                    renderedPage = PageRenderer.Render(PageRenderer.CurrentPage, contents);
            }

            if (_renderingContext.PreviewMode)
            {
                PageRenderer.DisableAspNetPostback(renderedPage);
            }

            using (Profiler.Measure("ASP.NET controls: PageInit"))
            {
                Controls.Add(renderedPage);
            }
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

        _renderingContext.PreRenderRedirectCheck();

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

        xhtml = _renderingContext.FormatXhtml(xhtml);

        // Inserting perfomance profiling information
        if (_renderingContext.ProfilingEnabled)
        {
            xhtml = _renderingContext.BuildProfilerReport();

            Response.ContentType = "text/xml";
        }

        writer.Write(xhtml);
    }


    private static void CheckForMultipleAspNetFormsException(HttpException ex)
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