using System;
using System.Linq;
using System.Web;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    internal class HostnameBindingsFacade
    {
        static HostnameBindingsFacade()
        {
            DataEventSystemFacade.SubscribeToDataBeforeAdd<IUrlConfiguration>(OnBeforeUpdatingHostnameConfiguration);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IUrlConfiguration>(OnBeforeUpdatingHostnameConfiguration);

            DataEventSystemFacade.SubscribeToDataBeforeAdd<IHostnameBinding>(OnBeforeUpdatingHostnameBinding);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IHostnameBinding>(OnBeforeUpdatingHostnameBinding);
        }

        private static void OnBeforeUpdatingHostnameConfiguration(object sender, DataEventArgs dataeventargs)
        {
            var configurationNode = dataeventargs.Data as IUrlConfiguration;

            // Trimming page url suffix
            configurationNode.PageUrlSuffix = (configurationNode.PageUrlSuffix ?? string.Empty).Trim();
        }

        private static void OnBeforeUpdatingHostnameBinding(object sender, DataEventArgs dataeventargs)
        {
            var hostnameBinding = dataeventargs.Data as IHostnameBinding;

            // Trimming and lowercasing hostname
            hostnameBinding.Hostname = hostnameBinding.Hostname.Trim().ToLowerInvariant();
            hostnameBinding.PageNotFoundUrl = hostnameBinding.PageNotFoundUrl.Trim();
        }


        public static void Initialize()
        {
            lock (typeof(HostnameBindingsFacade))
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    if (DataFacade.GetData<IUrlConfiguration>().Any())
                    {
                        return;
                    }

                    var configurationData = DataFacade.BuildNew<IUrlConfiguration>();
                    configurationData.Id = new Guid("c7bd886b-7208-4257-b641-df2571a4872b");

                    // By default - extensionless for IIS7+integraded and ".aspx" for IIS6/IIS7+classic mode
                    configurationData.PageUrlSuffix = HttpRuntime.UsingIntegratedPipeline ? string.Empty : ".aspx";

                    DataFacade.AddNew(configurationData);
                }
            }
        }

        internal static IHostnameBinding GetBindingForCurrentRequest()
        {
            var httpContext = HttpContext.Current;
            if(httpContext == null)
            {
                return null;
            }


            string host = HttpContext.Current.Request.Url.Host;

            // TODO: optimize?
            return DataFacade.GetData<IHostnameBinding>().AsEnumerable().FirstOrDefault(b => b.Hostname == host);
        }

        internal static string GetCustomPageNotFoundUrl()
        {
            var binding = GetBindingForCurrentRequest();
            if(binding == null || string.IsNullOrEmpty(binding.PageNotFoundUrl))
            {
                return null;
            }

            string url = binding.PageNotFoundUrl;

            return url.StartsWith("~") ? UrlUtils.PublicRootPath + url.Substring(1) : url;
        }
    }
}
