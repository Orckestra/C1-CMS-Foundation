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

        public static bool ShutdownInitiated(this IApplicationHost host)
        {
            return (bool)_shutdownInitiatedPropertyInfo.GetValue(null, new object[0]);
        }
    }
}
