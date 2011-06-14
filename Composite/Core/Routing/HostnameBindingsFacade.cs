using System;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
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

                    configurationData.PageUrlSuffix = string.Empty;

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

        internal static bool RedirectCustomPageNotFoundUrl(HttpContext httpContext)
        {
            string rawUrl = httpContext.Request.RawUrl;

            string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

            if (string.IsNullOrEmpty(customPageNotFoundUrl))
            {
                return false;
            }
            
            if (rawUrl == customPageNotFoundUrl || httpContext.Request.Url.PathAndQuery == customPageNotFoundUrl)
            {
                throw new HttpException(404, "'Page not found' wasn't handled. Url: '{0}'".FormatWith(rawUrl));
            }

            if (HttpRuntime.UsingIntegratedPipeline && customPageNotFoundUrl.StartsWith("/"))
            {
                httpContext.Server.TransferRequest(customPageNotFoundUrl);
                return true;
            }

            httpContext.Response.Redirect(customPageNotFoundUrl, true);

            throw new IndexOutOfRangeException("This code should not be reachable");
        }
    }
}
