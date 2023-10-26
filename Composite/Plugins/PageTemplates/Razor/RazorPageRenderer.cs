using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.WebPages;
using System.Xml.Linq;
using Composite.AspNet.Razor;
using Composite.Core.Collections.Generic;
using Composite.Core.Instrumentation;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Functions;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class RazorPageRenderer : IPageRenderer, ISlimPageRenderer, IAsyncPageRenderer
    {
        private readonly Hashtable<Guid, TemplateRenderingInfo> _renderingInfo;
        private readonly Hashtable<Guid, Exception> _loadingExceptions;

        public RazorPageRenderer(
            Hashtable<Guid, TemplateRenderingInfo> renderingInfo,
            Hashtable<Guid, Exception> loadingExceptions)
        {
            _renderingInfo = renderingInfo;
            _loadingExceptions = loadingExceptions;
        }

        private Page _aspnetPage;
        private PageContentToRender _job;

        public void AttachToPage(Page renderTarget, PageContentToRender contentToRender)
        {
            _aspnetPage = renderTarget;
            _job = contentToRender;

            _aspnetPage.Init += RendererPage;
        }

        public XDocument Render(PageContentToRender contentToRender, FunctionContextContainer functionContextContainer)
        {
            return RenderInternalAsync(contentToRender, functionContextContainer, true)
                .ConfigureAwait(false).GetAwaiter().GetResult();
        }

        public Task<XDocument> RenderAsync(PageContentToRender contentToRender, FunctionContextContainer functionContextContainer)
        {
            return RenderInternalAsync(contentToRender, functionContextContainer, false);
        }


        public async Task<XDocument> RenderInternalAsync(PageContentToRender contentToRender, FunctionContextContainer functionContextContainer, bool sync)
        {
            Guid templateId = contentToRender.Page.TemplateId;
            var renderingInfo = _renderingInfo[templateId];

            if (renderingInfo == null)
            {
                Exception loadingException = _loadingExceptions[templateId];
                if (loadingException != null)
                {
                    throw loadingException;
                }

                Verify.ThrowInvalidOperationException($"Missing template '{templateId}'");
            }

            string output;

            RazorPageTemplate webPage = null;
            try
            {
                webPage = WebPageBase.CreateInstanceFromVirtualPath(renderingInfo.ControlVirtualPath) as RazorPageTemplate;
                Verify.IsNotNull(webPage, "Razor compilation failed or base type does not inherit '{0}'",
                    typeof(RazorPageTemplate).FullName);

                webPage.Configure();

                using (Profiler.Measure("Evaluating placeholders"))
                {
                    if (sync)
                    {
                        TemplateDefinitionHelper.BindPlaceholders(webPage, contentToRender, renderingInfo.PlaceholderProperties,
                            functionContextContainer);
                    }
                    else
                    {
                        await TemplateDefinitionHelper.BindPlaceholdersAsync(webPage, contentToRender, renderingInfo.PlaceholderProperties,
                            functionContextContainer);
                    }
                }

                // Executing razor code
                var httpContext = new HttpContextWrapper(HttpContext.Current);
                var startPage = StartPage.GetStartPage(webPage, "_PageStart", new[] { "cshtml" });
                var pageContext = new WebPageContext(httpContext, webPage, startPage);
                pageContext.PageData.Add(RazorHelper.PageContext_FunctionContextContainer, functionContextContainer);

                var sb = new StringBuilder();
                using (var writer = new StringWriter(sb))
                {
                    using (Profiler.Measure("Executing Razor page template"))
                    {
                        webPage.ExecutePageHierarchy(pageContext, writer);
                    }
                }

                output = sb.ToString();
            }
            finally
            {
                webPage?.Dispose();
            }

            return XDocument.Parse(output);
        }

        private void RendererPage(object sender, EventArgs e)
        {
            var functionContextContainer = PageRenderer.GetPageRenderFunctionContextContainer();

            var resultDocument = Render(_job, functionContextContainer);

            var controlMapper = (IXElementToControlMapper)functionContextContainer.XEmbedableMapper;
            Control control;

            using (Profiler.Measure("Rendering the page"))
            {
                control = PageRenderer.Render(resultDocument, functionContextContainer, controlMapper, _job.Page);
            }

            using (Profiler.Measure("ASP.NET controls: PagePreInit"))
            {
                _aspnetPage.Controls.Add(control);
            }
        }
    }
}
