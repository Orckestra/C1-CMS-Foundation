using System;
using System.Web.Hosting;
using Composite.Types;

namespace Composite.Spikes.DDZ
{
    public partial class ClearAssemblyCache : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void process(object sender, EventArgs e)
        {
            BuildManager.ClearCache();
            HostingEnvironment.InitiateShutdown();
        }
    }
}
