using System;
using System.Linq;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    internal class HostnameBindingsFacade
    {
        public static void Initialize()
        {
            lock (typeof(HostnameBindingsFacade))
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    if (DataFacade.GetData<IHostnameConfiguration>().Any())
                    {
                        return;
                    }

                    IHostnameConfiguration configurationNode = DataFacade.BuildNew<IHostnameConfiguration>();

                    // Extensionless urls by default
                    configurationNode.PageUrlSuffix = string.Empty;
                    configurationNode.Id = new Guid("c7bd886b-7208-4257-b641-df2571a4872b");

                    DataFacade.AddNew(configurationNode);
                }
            }
        }
    }
}
