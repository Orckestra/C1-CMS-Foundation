using System;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Application;

namespace Composite.AspNet
{
    /// <summary>
    /// Fixed the issue of temporary asp.net assemblies not being resolved correctly.
    /// </summary>
    [ApplicationStartup]
    class TempAssembliesFix
    {
        public static void OnInitialized()
        {
            AppDomain.CurrentDomain.AssemblyResolve += CurrentDomainOnAssemblyResolve;
        }

        private static Assembly CurrentDomainOnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            string asmName = args.Name;

            if (!asmName.StartsWith("App_") || !asmName.Contains(","))
            {
                return null;
            }

            var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(asm => asm.FullName == asmName);
            if (assembly != null)
            {
                return assembly;
            }

            Log.LogVerbose("OnAssemblyResolve", $"Failed to resolve assembly: {args.Name}"
                        + (args.RequestingAssembly != null ? $", requesting assembly: '{args.RequestingAssembly.FullName}'" : ""));
            return null;
        }
    }
}
