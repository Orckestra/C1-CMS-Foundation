using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.IO;
using Composite.WebClient;
using Composite.Logging;
using Composite.WebClient.Presentation;

public partial class Composite_controls_RegisterOutputTransformation : System.Web.UI.UserControl
{
    public string path = "";
    public string position = "10";

    public Composite_controls_RegisterOutputTransformation()
    {
        OutputTransformationManager.Activate();
    }


    // Overriding render - making it NOT run during ASP.NET Ajax UpdatePanel updtates
    protected override void Render(HtmlTextWriter writer)
    {
        if (string.IsNullOrEmpty(this.path) == true)
        {
            throw new InvalidOperationException("RegisterOutputTransformation.ascx missing path param");
        }

        //LoggingService.LogVerbose("RegisterOutputTransformation.ascx", "Running");
        int positionParsed = Int32.Parse(this.position);
        string webPath = UrlUtils.ResolveAdminUrl(this.path);

        OutputTransformationManager.RegisterTransformation(this.MapPath(webPath), positionParsed);
    }
}
