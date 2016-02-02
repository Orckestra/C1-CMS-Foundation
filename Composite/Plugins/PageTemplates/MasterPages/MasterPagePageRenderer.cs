using System;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Linq;
using System.Web;
using Composite.C1Console.Security;
using Composite.Core.Application;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data.Types;


namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagePageRenderer : IPageRenderer
    {
        private static readonly string PageRenderingJob_Key = "MasterPages.PageRenderingJob";

        private readonly Hashtable<Guid, MasterPageRenderingInfo> _renderingInfo;
        private readonly Hashtable<Guid, Exception> _loadingExceptions;

        public MasterPagePageRenderer(
            Hashtable<Guid, MasterPageRenderingInfo> renderingInfo,
            Hashtable<Guid, Exception> loadingExceptions)
        {
            Verify.ArgumentNotNull(renderingInfo, "renderingInfo");

            _renderingInfo = renderingInfo;
            _loadingExceptions = loadingExceptions;
        }

        public void AttachToPage(Page aspnetPage, PageContentToRender contentToRender)
        {
            Verify.ArgumentNotNull(aspnetPage, "aspnetPage");
            Verify.ArgumentNotNull(contentToRender, "contentToRender");

            aspnetPage.Items.Add(PageRenderingJob_Key, contentToRender);

            Guid templateId = contentToRender.Page.TemplateId;
            var rendering = _renderingInfo[templateId];

            if (rendering == null)
            {
                Exception loadingException = _loadingExceptions[templateId];
                if (loadingException != null)
                {
                    throw loadingException;
                }

                Verify.ThrowInvalidOperationException("Failed to get master page by template ID '{0}'. Check for compilation errors".FormatWith(templateId));
            }

            var dir = Path.GetDirectoryName(rendering.VirtualPath);
            var template = Path.GetFileNameWithoutExtension(rendering.VirtualPath);
            var file = SpecialModesFileResolver.ResolveFileInInDirectory(dir, template, ".master", new HttpContextWrapper(HttpContext.Current));

            aspnetPage.MasterPageFile = file;
            aspnetPage.PreRender += (e, args) => PageOnPreRender(aspnetPage, contentToRender.Page);

            var master = aspnetPage.Master;
            TemplateDefinitionHelper.BindPlaceholders(master, contentToRender, rendering.PlaceholderProperties, null);
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


                if (aspnetPage.Header != null)
                {
                    string xml = string.Join(string.Empty, xhtmlDocument.Head.Nodes().Select(node => node.ToString()));

                    aspnetPage.Header.Controls.Add(new Literal { Text = xml });
                }
            }
        }

        public static PageContentToRender GetRenderingInfo(Page page)
        {
            return page.Items[PageRenderingJob_Key] as PageContentToRender;
        }
    }
}
