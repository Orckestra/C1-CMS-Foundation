using System;
using System.Reflection;
using System.Web.Hosting;

namespace Composite.Core.Extensions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IApplicationHostExtensionMethods
    {
        static readonly PropertyInfo _shutdownInitiatedPropertyInfo = typeof(HostingEnvironment).GetProperty("ShutdownInitiated", BindingFlags.NonPublic | BindingFlags.Static);

        private static bool _processExit;

        static IApplicationHostExtensionMethods()
        {
            AppDomain.CurrentDomain.ProcessExit += (s, a) => _processExit = true;
        }

        /// <exclude />
        public static bool ShutdownInitiated(this IApplicationHost host)
        {
            if (!HostingEnvironment.IsHosted)
            {
                return _processExit;
            }

            return (bool)_shutdownInitiatedPropertyInfo.GetValue(null, null);
        }
    }
}
