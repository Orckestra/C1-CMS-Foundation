using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection;
using System.Runtime.Caching;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.UI;

namespace Composite.AspNet.Caching
{
    internal static class OutputCacheHelper
    {
        private const string CacheProfileName = "C1Page";
        private static readonly FieldInfo CacheabilityFieldInfo;

        private static readonly Dictionary<string, OutputCacheProfile> _outputCacheProfiles;

        static OutputCacheHelper()
        {
            CacheabilityFieldInfo = typeof(HttpCachePolicy).GetField("_cacheability", BindingFlags.Instance | BindingFlags.NonPublic);

            var section = WebConfigurationManager.OpenWebConfiguration(HostingEnvironment.ApplicationVirtualPath)
                                                 .GetSection("system.web/caching/outputCacheSettings");

            if (section is OutputCacheSettingsSection settings)
            {
                _outputCacheProfiles = settings.OutputCacheProfiles.OfType<OutputCacheProfile>()
                                               .ToDictionary(_ => _.Name);
            }
        }

        /// <summary>
        /// Returns <value>true</value> and sets the cache key value for the current request if
        /// ASP.NET full page caching is enabled.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cacheKey"></param>
        /// <returns></returns>
        public static bool TryGetCacheKey(HttpContext context, out string cacheKey)
        {
            var cacheProfile = _outputCacheProfiles[CacheProfileName];

            if (!cacheProfile.Enabled || cacheProfile.Duration <= 0
                || !(cacheProfile.Location == (OutputCacheLocation) (-1) /* Unspecified */
                     || cacheProfile.Location == OutputCacheLocation.Any
                     || cacheProfile.Location == OutputCacheLocation.Server
                     || cacheProfile.Location == OutputCacheLocation.ServerAndClient))
            {
                cacheKey = null;
                return false;
            }

            var request = context.Request;

            var sb = new StringBuilder(1 + request.Path.Length + (request.PathInfo ?? "").Length );

            sb.Append(request.HttpMethod[0]).Append(request.Path).Append(request.PathInfo);

            if (cacheProfile.VaryByCustom != null)
            {
                string custom = context.ApplicationInstance.GetVaryByCustomString(context, cacheProfile.VaryByCustom);
                sb.Append("c").Append(custom);
            }

            if (!string.IsNullOrEmpty(cacheProfile.VaryByParam))
            {
                var filter = GetVaryByFilter(cacheProfile.VaryByParam);

                AppendParameters(sb, "Q", request.QueryString, filter);

                if (request.HttpMethod == "POST")
                {
                    AppendParameters(sb, "F", request.Form, filter);
                }
            }

            if (!string.IsNullOrEmpty(cacheProfile.VaryByHeader))
            {
                var filter = GetVaryByFilter(cacheProfile.VaryByHeader);

                AppendParameters(sb, "H", request.Headers, filter);
            }

            cacheKey = sb.ToString();
            return true;
        }

        private static Func<string, bool> GetVaryByFilter(string varyBy)
        {
            if (varyBy == "*")
            {
                return parameter => true;
            }

            var list = varyBy.Split(';');
            return parameter => list.Contains(parameter);
        }


        private static void AppendParameters(StringBuilder sb, string cacheKeyDelimiter, NameValueCollection collection, Func<string, bool> filter)
        {
            foreach (string key in collection.OfType<string>().Where(filter))
            {
                sb.Append(cacheKeyDelimiter).Append(key).Append("=").Append(collection[key]);
            }
        }


        public static DonutCacheEntry GetFromCache(HttpContext context, string cacheKey)
        {
            var provider = GetCacheProvider(context);

            if (provider == null)
            {
                return MemoryCache.Default.Get(cacheKey) as DonutCacheEntry;
            }

            return provider.Get(cacheKey) as DonutCacheEntry;
        }


        public static void AddToCache(HttpContext context, string cacheKey, DonutCacheEntry entry)
        {
            var provider = GetCacheProvider(context);

            if (provider == null)
            {
                MemoryCache.Default.Add(cacheKey, entry, new CacheItemPolicy
                {
                    SlidingExpiration = TimeSpan.FromSeconds(60)
                });
                return;
            }

            provider.Add(cacheKey, entry, DateTime.UtcNow.AddSeconds(60));
        }


        static OutputCacheProvider GetCacheProvider(HttpContext context)
        {
            var cacheName = context.ApplicationInstance.GetOutputCacheProviderName(context);

            return cacheName != "AspNetInternalProvider" ? OutputCache.Providers?[cacheName] : null;
        }


        public static bool ResponseCacheable(HttpContext context)
        {
            if (context.Response.StatusCode != 200)
            {
                return false;
            }

            var cacheability = GetPageCacheability(context);

            return cacheability > HttpCacheability.NoCache;
        }


        private static HttpCacheability GetPageCacheability(HttpContext context)
            => (HttpCacheability)CacheabilityFieldInfo.GetValue(context.Response.Cache);



        public static void InitializeFullPageCaching(HttpContext context)
        {
            using (var page = new CacheableEmptyPage())
            {
                page.ProcessRequest(context);
            }
        }


        private class CacheableEmptyPage : Page
        {
            protected override void FrameworkInitialize()
            {
                base.FrameworkInitialize();

                // That's an equivalent of having <%@ OutputCache CacheProfile="C1Page" %> 
                // on an *.aspx page

                InitOutputCache(new OutputCacheParameters
                {
                    CacheProfile = CacheProfileName
                });
            }
        }
    }
}
