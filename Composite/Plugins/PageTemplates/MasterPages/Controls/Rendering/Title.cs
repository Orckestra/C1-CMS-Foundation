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
            writer.WriteEncodedText(PageRenderer.CurrentPage.Title);
        }
    }
}
