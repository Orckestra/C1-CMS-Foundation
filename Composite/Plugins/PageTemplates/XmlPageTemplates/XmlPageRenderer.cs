using System;
using System.Web.UI;
using Composite.Core.PageTemplates;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient.Renderings.Page;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    internal class XmlPageRenderer: IPageRenderer
    {
        private Page _aspnetPage;
        private PageContentToRender _job;

        public void AttachToPage(Page renderTaget, PageContentToRender contentToRender)
        {
            _aspnetPage = renderTaget;
            _job = contentToRender;

            _aspnetPage.Init += RendererPage;
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
