using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data.Types;


namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagePageRenderer: IPageRenderer
    {
        private static readonly string PageRenderingJob_Key = "MasterPages.PageRenderingJob";

        private readonly Hashtable<Guid, MasterPageRenderingInfo> _renderingInfo;

        public MasterPagePageRenderer(Hashtable<Guid, MasterPageRenderingInfo> renderingInfo)
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
            aspnetPage.PreRender += (e, args) => PageOnPreRender(aspnetPage, renderJob.Page);

            var master = aspnetPage.Master as MasterPagePageTemplate;
            TemplateDefinitionHelper.BindPlaceholders(master, renderJob, rendering.PlaceholderProperties, null);
        }

        private void PageOnPreRender(Page aspnetPage, IPage page)
        {
            bool emitMenuTitleMetaTag = !page.MenuTitle.IsNullOrEmpty();
            bool emitUrlTitleMetaTag = !page.UrlTitle.IsNullOrEmpty();

            if ((emitMenuTitleMetaTag || emitUrlTitleMetaTag)
                && UserValidationFacade.IsLoggedIn())
            {
                var xhtmlDocument = new XhtmlDocument();

                PageRenderer.AppendC1MetaTags(page, xhtmlDocument);

                string xml = string.Join(string.Empty, xhtmlDocument.Head.Nodes().Select(node => node.ToString()));

                aspnetPage.Header.Controls.Add(new Literal { Text = xml });
            }
        }

        public static PageRenderingJob GetRenderingInfo(Page page)
        {
            return page.Items[PageRenderingJob_Key] as PageRenderingJob;
        }
    }
}
