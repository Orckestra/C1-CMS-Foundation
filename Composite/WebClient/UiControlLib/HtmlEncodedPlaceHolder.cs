using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI.WebControls;
using System.Web.UI;
using System.Web;
using System.IO;

namespace Composite.WebClient.UiControlLib
{
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
