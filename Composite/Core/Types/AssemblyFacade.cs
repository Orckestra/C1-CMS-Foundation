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
        /// <exclude />
        public static IEnumerable<Assembly> GetAssembliesFromBin()
        {
            string binDirectory = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLower().Replace('\\', '/');

            List<Assembly> assemblies = new List<Assembly>();
            foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.IsDynamic == true) continue;

                try
                {
                    string codebase = assembly.CodeBase.ToLower();

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
