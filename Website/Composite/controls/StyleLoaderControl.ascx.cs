using System.Web.Hosting;
using System.Web.UI;
using Composite.Core.WebClient;

namespace Composite.controls
{
    public partial class StyleLoaderControl : System.Web.UI.UserControl
    {
        public string Directive { get; set; }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.Write(StyleLoader.Render(Directive));
        }

 
    }
}