using System;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Core.PageTemplates;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Functions;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    internal class XmlPageRenderer: IPageRenderer, ISlimPageRenderer
    {
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
            var document = TemplateInfo.GetTemplateDocument(contentToRender.Page.TemplateId);

            PageRenderer.ResolvePlaceholders(document, contentToRender.Contents);

            return document;
        }

        private void RendererPage(object sender, EventArgs e)
        {
            if (_aspnetPage.Master != null)
            {
                // Backward compatibility with CompositeC1Contrib.Renderes.MasterPages package
                return;
            }

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
}
