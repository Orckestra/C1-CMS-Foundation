using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class HtmlEncodedPlaceHolder : PlaceHolder
	{
        protected override void Render(HtmlTextWriter writer)
        {
            StringBuilder markupBuilder = new StringBuilder();
            StringWriter sw = new StringWriter(markupBuilder);
            base.Render(new HtmlTextWriter(sw));

            writer.Write( HttpUtility.HtmlEncode(markupBuilder.ToString()));
        }
	}
}
