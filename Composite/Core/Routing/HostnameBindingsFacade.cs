using System;
using System.Globalization;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing.Pages;
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
            DataEventSystemFacade.SubscribeToDataBeforeAdd<IUrlConfiguration>(OnBeforeUpdatingHostnameConfiguration, true);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IUrlConfiguration>(OnBeforeUpdatingHostnameConfiguration, true);

            DataEventSystemFacade.SubscribeToDataBeforeAdd<IHostnameBinding>(OnBeforeUpdatingHostnameBinding, true);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IHostnameBinding>(OnBeforeUpdatingHostnameBinding, true);
        }

        private static void OnBeforeUpdatingHostnameConfiguration(object sender, DataEventArgs dataeventargs)
        {
            var configurationNode = dataeventargs.Data as IUrlConfiguration;

            Verify.IsNotNull(configurationNode, "configurationNode is null");

            // Trimming page url suffix
            configurationNode.PageUrlSuffix = (configurationNode.PageUrlSuffix ?? string.Empty).Trim();
        }

        private static void OnBeforeUpdatingHostnameBinding(object sender, DataEventArgs dataeventargs)
        {
            var hostnameBinding = dataeventargs.Data as IHostnameBinding;

            Verify.IsNotNull(hostnameBinding, "hostnameBinding is null");

            // Trimming and lowercasing hostname
            hostnameBinding.Hostname = (hostnameBinding.Hostname ?? string.Empty).Trim().ToLowerInvariant();
            hostnameBinding.PageNotFoundUrl = (hostnameBinding.PageNotFoundUrl ?? string.Empty).Trim();
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

        internal static IHostnameBinding GetAliasBinding(HttpContext httpContext)
        {
            if (httpContext == null)
            {
                return null;
            }

            string hostname = HttpContext.Current.Request.Url.Host.ToLowerInvariant();

            foreach (var hostnameBinding in DataFacade.GetData<IHostnameBinding>(true).AsEnumerable())
            {
                string[] aliases = hostnameBinding.Aliases.Split(new[] {"\r\n", "\n"},
                    StringSplitOptions.RemoveEmptyEntries);

                if (aliases.Any(a => a == hostname))
                {
                    return hostnameBinding;
                }
            }

            return null;
        }

        internal static bool IsPageNotFoundRequest()
        {
            HttpContext context = HttpContext.Current;
            if(context == null)
            {
                return false;
            }

            string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

            if (customPageNotFoundUrl.IsNullOrEmpty())
            {
                return false;
            }

            customPageNotFoundUrl = customPageNotFoundUrl.Trim();

            if(!customPageNotFoundUrl.StartsWith("/") && !customPageNotFoundUrl.Contains("://"))
            {
                customPageNotFoundUrl = "/" + customPageNotFoundUrl;
            }

            var request = context.Request;

            return request.RawUrl == customPageNotFoundUrl
                    || request.Url.PathAndQuery == customPageNotFoundUrl
                    || request.Url.PathAndQuery.StartsWith(customPageNotFoundUrl + "?");
        }

        internal static string GetCustomPageNotFoundUrl()
        {
            var binding = GetBindingForCurrentRequest();
            if(binding == null || string.IsNullOrEmpty(binding.PageNotFoundUrl))
            {
                return null;
            }

            string url = binding.PageNotFoundUrl;

            var defaultCulture = DataLocalizationFacade.DefaultLocalizationCulture;

            var pageUrlData = C1PageRoute.PageUrlData;
            CultureInfo localeFromRequest = pageUrlData != null 
                ? pageUrlData.LocalizationScope
                : defaultCulture;

            using (new DataConnection(localeFromRequest))
            {
                url = InternalUrls.TryConvertInternalUrlToPublic(url) ?? url;
            }

            if (url.StartsWith("~/") && localeFromRequest.Name != defaultCulture.Name)
            {
                using (new DataConnection(defaultCulture))
                {
                    url = InternalUrls.TryConvertInternalUrlToPublic(url) ?? url;
                }
            }

            if (url.StartsWith("~/")) url = UrlUtils.ResolvePublicUrl(url);

            return url;
        }

        internal static bool ServeCustomPageNotFoundPage(HttpContext httpContext)
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

            throw new InvalidOperationException("This code should not be reachable");
        }
    }
}
