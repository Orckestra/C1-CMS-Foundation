using System;
using System.Web.UI;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Presentation;

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
