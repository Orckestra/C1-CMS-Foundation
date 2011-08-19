using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using Composite.C1Console.Security;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient.Renderings;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data.Types;

/// <summary>
/// Expect your provider to be instanciated only once (singleton). Config/factory classes not included here. 
/// </summary>
public interface IPageLayoutProvider
{
    /// <summary>
    /// Used in general to have providers declare what page layouts (identified by Guid Id) it is handling. 
    /// At render time this info allow Composite C1 to route a page to the page layout provider that it 
    /// is currently using. This info should be expected to be cached by Composite C1 and changes to cached state
    /// require a call back to Composite C1 (not described here).
    /// </summary>
    /// <returns>Descriptions of layouts known to this provider</returns>
    IEnumerable<PageLayoutDescriotor> GetPageLayoutDescriptions();

    /// <summary>
    /// Factory that give Composite C1 a IPageLayouter capable of rendering a Composite C1 page with the specified layout ID.
    /// The factory will be called for each individual page rendering 
    /// </summary>
    /// <param name="pageLayoutId">Id ot the page layout, this Id must belong to the provider</param>
    /// <returns></returns>
    IPageRenderer BuildPageRenderer(Guid pageLayoutId);
}



/// <summary>
/// Describes a page layout to the Composite C1 core so it may set up editingt UI
/// </summary>
public class PageLayoutDescriotor
{
    /// <summary>
    /// Used to identify page layouts. This has to be unique and imutable.
    /// </summary>
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    /// <summary>
    /// The EntityToken will be used in the C1 Console tree and will allow devs to hook commands to
    /// specific templates (like 'Edit')
    /// </summary>
    public Composite.C1Console.Security.EntityToken EntityToken { get; set; }
    public IEnumerable<PageLayoutPlaceholderDescriptor> PlaceholderDescriptions { get; set; }
    /// <summary>
    /// The default is the placeholder to focus/use when users edit a page or a layout is used in ad hoc renderings.
    /// </summary>
    public string DefaultPlaceholderId { get; set; }
}



/// <summary>
/// Describe a placeholder on a layout template (key/value).
/// (existing class TemplatePlaceholdersInfo should be used+refactored).
/// </summary>
public class PageLayoutPlaceholderDescriptor
{
    /// <summary>
    /// Used to identify a layout placeholder. This has to be unique only within a single page layout.
    /// </summary>
    public string Id { get; set; }
    public string Title { get; set; }
}



/// <summary>
/// This class is responsible for rendering the provided job onto the provided asp.net web forms page. The Render method is called at page construction
/// and is expected to hook on to asp.net page events (like PreInit) to drive the rendering. This happens early enough to enable the renderer to attach
/// a Master page to the page if desired.
/// </summary>
public interface IPageRenderer
{
    void Render(System.Web.UI.Page renderTaget, PageRenderingJob renderJob);
}



/// <summary>
/// Describe the page and content desired to be rendered.
/// </summary>
public class PageRenderingJob
{
    public PageRenderingJob(IPage page, IEnumerable<IPagePlaceholderContent> contents)
    {
        this.Page = page;
        this.Contents = contents;
    }

    public IPage Page { get; private set; }
    public bool IsPreview { get; private set; }
    public IEnumerable<IPagePlaceholderContent> Contents { get; private set; }
}



public class XmlLayoutPageRenderer : IPageRenderer
{
    private Page _aspnetPage;
    private PageRenderingJob _job;

    public void Render(System.Web.UI.Page renderTaget, PageRenderingJob renderJob)
    {
        _aspnetPage = renderTaget;
        _job = renderJob;

        _aspnetPage.PreInit += new EventHandler(RendererPage);
    }

    private void RendererPage(object sender, EventArgs e)
    {
        Control renderedPage;
        using (Profiler.Measure("Page build up"))
        {
            renderedPage = PageRenderer.Render(_job.Page, _job.Contents);
        }

        using (Profiler.Measure("ASP.NET controls: PagePreInit"))
        {
            _aspnetPage.Controls.Add(renderedPage);
        }
    }
}







public class LayouterPluginMock
{
    private Page _aspnetPage;
    private PageRenderingJob _job;

    public void RenderToPage(Page aspnetPage, PageRenderingJob job)
    {
        _aspnetPage = aspnetPage;
        _job = job;

        //        _aspnetPage.MasterPageFile = "~/App_Data/PageTemplates/Common.master";
        _aspnetPage.Init += new EventHandler(RendererPage);
    }

    private void RendererPage(object sender, EventArgs e)
    {
        Control renderedPage;
        using (Profiler.Measure("Executing C1 functions"))
        {
            renderedPage = PageRenderer.Render(_job.Page, _job.Contents);
        }

        using (Profiler.Measure("ASP.NET controls: PageInit"))
        {
            _aspnetPage.Controls.Add(renderedPage);
        }
    }
}







public partial class Renderers_Page : System.Web.UI.Page
{
    private IDisposable _pageEventsPageMeasuring;

    private bool _requestCompleted = false;
    private RenderingContext _renderingContext;

    protected override void OnPreInit(EventArgs e)
    {
        _renderingContext = RenderingContext.InitializeFromHttpContext();

        this.Culture = this.UICulture = _renderingContext.Page.DataSourceId.LocaleScope.Name;

        if (_renderingContext.RunResponseHandlers())
        {
            _requestCompleted = true;
            return;
        }

        var layouter = new LayouterPluginMock();
        PageRenderingJob job = new PageRenderingJob(PageRenderer.CurrentPage, _renderingContext.GetPagePlaceholderContents());

        layouter.RenderToPage(this, job);

        // we want this after giving plugin a go
        this.Init += new EventHandler(RenderersPageInitPostLayoterRun);
        this.Unload += new EventHandler(RenderersPageUnloadPostLayoterRun);
        this.PreRenderComplete += new EventHandler(RenderersPagePreRenderComplete);
    }

    void RenderersPagePreRenderComplete(object sender, EventArgs e)
    {
        if (_renderingContext.PreviewMode)
        {
            PageRenderer.DisableAspNetPostback(this);
        }
    }



    void RenderersPageInitPostLayoterRun(object sender, EventArgs e)
    {
        //if (Form != null)
        //{
        //    Form.Action = Request.RawUrl;
        //}

        _pageEventsPageMeasuring = Profiler.Measure("ASP.NET controls: PageLoad, Event handling, PreRender");
    }



    protected override void OnInit(EventArgs e)
    {
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

    private void RenderersPageUnloadPostLayoterRun(object sender, EventArgs e)
    {
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