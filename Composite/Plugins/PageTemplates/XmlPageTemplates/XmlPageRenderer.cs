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
        private PageRenderingJob _job;

        public void AttachToPage(Page renderTaget, PageRenderingJob renderJob)
        {
            _aspnetPage = renderTaget;
            _job = renderJob;

            _aspnetPage.Init += RendererPage;
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
}
