using System;
using System.Reflection;

namespace Composite.Core.WebClient
{
    internal static class BuildManagerHelper
    {
        /// <summary>
        /// Gets a user control. Prevents an exception that appears in Visual Studio while debugging
        /// </summary>
        /// <param name="virtualPath"></param>
        /// <returns></returns>
        public static Type GetCompiledType(string virtualPath)
        {
            using(BuildManagerHelper.DisableUrlMetadataCachingScope())
            {
                return System.Web.Compilation.BuildManager.GetCompiledType(virtualPath);
            }
        }

        /// <summary>
        /// Disabling the "url metadata caching" prevents <see cref="System.Web.HttpException" /> in debugger 
        /// </summary>
        /// <param name="disableCaching"></param>
        public static void DisableUrlMetadataCaching(bool disableCaching)
        {
            if (!RuntimeInformation.IsDebugBuild)
            {
                return;
            }

            var systemWeb = typeof (System.Web.TraceMode).Assembly;
            Type cachedPathData = systemWeb.GetType("System.Web.CachedPathData", false);
            if (cachedPathData == null) return;

            FieldInfo field = cachedPathData.GetField("s_doNotCacheUrlMetadata", BindingFlags.Static | BindingFlags.NonPublic);
            if (field == null) return;

            field.SetValue(null, disableCaching);
        }

        /// <summary>
        /// Disabling the "url metadata caching" prevents <see cref="System.Web.HttpException" /> in debugger 
        /// </summary>
        public static IDisposable DisableUrlMetadataCachingScope()
        {
            return new DisableUrlMedataScope();
        }

        public class DisableUrlMedataScope : IDisposable
        {
            public DisableUrlMedataScope()
            {
                DisableUrlMetadataCaching(true);
            }

            public void Dispose()
            {
                DisableUrlMetadataCaching(false);
            }
        }
    }
}
