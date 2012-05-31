using System;
using System.Web.UI;
using Composite.Core.Collections.Generic;
using Composite.Core.PageTemplates;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagesPageRenderer: IPageRenderer
    {
        private static readonly string PageRenderingJob_Key = "MasterPages.PageRenderingJob";

        private readonly Hashtable<Guid, MasterPageRenderingInfo> _renderingInfo;

        public MasterPagesPageRenderer(Hashtable<Guid, MasterPageRenderingInfo> renderingInfo)
        {
            Verify.ArgumentNotNull(renderingInfo, "renderingInfo");

            _renderingInfo = renderingInfo;
        }

        public void AttachToPage(Page aspnetPage, PageRenderingJob renderJob)
        {
            Verify.ArgumentNotNull(aspnetPage, "aspnetPage");
            Verify.ArgumentNotNull(renderJob, "renderJob");

            aspnetPage.Items.Add(PageRenderingJob_Key, renderJob);

            Guid templateId = renderJob.Page.TemplateId;
            var rendering = _renderingInfo[templateId];
            Verify.IsNotNull(rendering, "Failed to get master page by template ID '{0}'. Check for compilation errors", templateId);

            aspnetPage.MasterPageFile = rendering.VirtualPath;  

            var master = aspnetPage.Master as C1MasterPage;
            TemplateDefinitionHelper.BindPlaceholders(master, renderJob, rendering.PlaceholderProperties, null);
        }

        public static PageRenderingJob GetRenderingInfo(Page page)
        {
            return page.Items[PageRenderingJob_Key] as PageRenderingJob;
        }
    }
}
