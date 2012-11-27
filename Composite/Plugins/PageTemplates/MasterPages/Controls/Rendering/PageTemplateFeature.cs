using System.Web.UI;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.PageTemplates.MasterPages.Controls.Functions;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Rendering
{
    /// <summary>
    /// 
    /// </summary>
    public class PageTemplateFeature : Control
    {
        /// <summary>
        /// Name of Page Template Feature to include
        /// </summary>
        public string Name { get; set; }

        /// <exclude />
        protected override void OnInit(System.EventArgs e)
        {
            XhtmlDocument feature = PageTemplateFeatureFacade.GetPageTemplateFeature(this.Name);
            FunctionContextContainer functionContextContainer = PageRenderer.GetPageRenderFunctionContextContainer();

            var markup = new Markup(feature.Root, functionContextContainer);

            Controls.Add(markup);

            base.OnInit(e);
        }

    }
}
