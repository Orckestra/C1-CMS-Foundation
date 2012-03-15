using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.IO;
using Composite.Core.Configuration;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class AssemblyFacade
	{
        private static readonly Type RuntimeModuleType = typeof(System.Reflection.Module).Assembly.GetType("System.Reflection.RuntimeModule");

        /// <exclude />
        public static IEnumerable<Assembly> GetAssembliesFromBin()
        {
            string binDirectory = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLowerInvariant().Replace('\\', '/');

            List<Assembly> assemblies = new List<Assembly>();
            foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.IsDynamic == true) continue;

                try
                {
                    string codebase = assembly.CodeBase.ToLowerInvariant();

                    if (codebase.Contains(binDirectory) == true)
                    {
                        assemblies.Add(assembly);
                    }
                }
                catch
                {
                    // Ignore exceptions
                }
            }

            return assemblies;
        }



        /// <exclude />
        public static Assembly GetAppCodeAssembly()
        {
            return AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(IsAppCodeDll);
        }


        /// <exclude />
        public static bool IsInMemoryAssembly(Assembly asm)
        {
            // Checking 
            // (asm.ManifestModule as System.Reflection.RuntimeModule).GetFullyQualifiedName() == "<In Memory Module>"

            if (!RuntimeModuleType.IsAssignableFrom(asm.ManifestModule.GetType())) return false;

            var method = RuntimeModuleType.GetMethod("GetFullyQualifiedName", BindingFlags.NonPublic | BindingFlags.Instance);
            return (method.Invoke(asm.ManifestModule, new object[0]) as string) == "<In Memory Module>";
        }


        /// <exclude />
        public static bool IsAppCodeDll(Assembly assembly)
        {
            string fullName = assembly.FullName;
            return fullName != null && (fullName.StartsWith("App_Code.") || fullName.StartsWith("App_Code,"));
        }

        /// <summary>
        /// Gets assemblies from bin and app code assembly
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Assembly> GetAllAssemblies()
        {
            List<Assembly> assemblies = GetAssembliesFromBin() as List<Assembly>;

            Assembly appCodeAssembly = GetAppCodeAssembly();

            if (appCodeAssembly != null)
            {
                assemblies.Add(appCodeAssembly);
            }

            return assemblies;
        }
	}
}
