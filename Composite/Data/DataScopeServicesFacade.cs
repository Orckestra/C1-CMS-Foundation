using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Composite.Data
{
    /// <summary>
    /// Facade for added services to data scope
    /// </summary>
    public static class DataScopeServicesFacade
    {
        /// <summary>
        /// Adds a default service to data scope manager. All DataScopes created after this point will include the service you provide.
        /// </summary>
        /// <param name="service"></param>
        public static void RegisterDefaultService(object service)
        {
            DataServiceScopeManager.AddDefaultService(service);
        }
    }
}
