using System;
using System.Reflection;
using System.Web.Hosting;

namespace Composite.Extensions
{
    internal static class IApplicationHostExtensionMethods
    {
        static readonly PropertyInfo _shutdownInitiatedPropertyInfo = typeof(HostingEnvironment).GetProperty("ShutdownInitiated", BindingFlags.NonPublic | BindingFlags.Static);

        public static bool ShutdownInitiated(this IApplicationHost host)
        {
            return (bool)_shutdownInitiatedPropertyInfo.GetValue(null, new object[0]);
        }
    }
}
