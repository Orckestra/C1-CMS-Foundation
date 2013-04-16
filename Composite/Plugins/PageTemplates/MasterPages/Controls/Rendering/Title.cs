using System.Web.UI;
using Composite.Core.WebClient.Renderings.Page;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Rendering
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Title : Control
    {
        /// <exclude />
        protected override void Render(HtmlTextWriter writer)
        {
            string pageTitle = string.IsNullOrWhiteSpace(Page.Title) ? PageRenderer.CurrentPage.Title : Page.Title;
            writer.WriteEncodedText(pageTitle);
            this.Page.Title = pageTitle;
        }
    }
}
