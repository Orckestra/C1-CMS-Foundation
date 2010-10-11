using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;
using System.IO;
using System.Xml;

namespace Composite.controls.helpers
{
    public partial class StyleLoaderControl : System.Web.UI.UserControl
    {
        public string adminRelativePath = "xxx";

        protected void Page_Load(object sender, EventArgs e)
        {
            string path = Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(adminRelativePath);
            string tagGoo = string.Format("<link rel='stylesheet' type='text/css' href='{0}'/>\n", path);

            Control headerElementsPlaceHolder = this.FindControl(this.Page, "HeaderPlaceHolder");
            if (headerElementsPlaceHolder == null) throw new InvalidOperationException("Missing 'HeaderPlaceHolder' placeholder on page");
            headerElementsPlaceHolder.Controls.Add(new LiteralControl(tagGoo));
        }


        private Control FindControl(Control toSearch, string idToFind)
        {
            Control c = toSearch.FindControl(idToFind);
            if (c == null && toSearch.Controls != null)
            {
                foreach (Control subControl in toSearch.Controls)
                {
                    c = FindControl(subControl, idToFind);
                    if (c != null) break;
                }
            }

            return c;
        }


    }
}