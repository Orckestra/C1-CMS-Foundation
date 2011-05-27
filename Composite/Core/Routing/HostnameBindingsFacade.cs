using System;
using System.Linq;
using System.Web;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    internal class HostnameBindingsFacade
    {
        static HostnameBindingsFacade()
        {
            DataEventSystemFacade.SubscribeToDataBeforeAdd<IHostnameConfiguration>(OnBeforeUpdatingHostnameConfiguration);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IHostnameConfiguration>(OnBeforeUpdatingHostnameConfiguration);
        }

        private static void OnBeforeUpdatingHostnameConfiguration(object sender, DataEventArgs dataeventargs)
        {
            var configurationNode = dataeventargs.Data as IHostnameConfiguration;

            // Trimming page url suffix
            configurationNode.PageUrlSuffix = (configurationNode.PageUrlSuffix ?? string.Empty).Trim();
        }

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

                    var configurationData = DataFacade.BuildNew<IHostnameConfiguration>();
                    configurationData.Id = new Guid("c7bd886b-7208-4257-b641-df2571a4872b");

                    // By default - extensionless for IIS7+integraded and ".aspx" for IIS6/IIS7+classic mode
                    configurationData.PageUrlSuffix = HttpRuntime.UsingIntegratedPipeline ? string.Empty : ".aspx";

                    DataFacade.AddNew(configurationData);
                }
            }
        }
    }
}
