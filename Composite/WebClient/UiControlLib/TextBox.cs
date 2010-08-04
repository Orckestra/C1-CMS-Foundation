using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Composite.WebClient.UiControlLib
{
    /// <summary>
    /// Fixes a basic 'System.Web.UI.WebControls.TextBox' control, so it renders correctly in 'MultiLine' mode
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TextBox : System.Web.UI.WebControls.TextBox
    {
        protected override void Render(HtmlTextWriter writer)
        {
            this.RenderBeginTag(writer);
            if (this.TextMode == TextBoxMode.MultiLine)
            {
                HttpUtility.HtmlEncode(/* Environment.NewLine + */this.Text, writer);
            }
            this.RenderEndTag(writer);
        }
    }
}
