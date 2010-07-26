using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.IO;
using Composite.GlobalSettings;


namespace Composite.Types
{
	public static class AssemblyFacade
	{
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



        public static Assembly GetAppCodeAssembly()
        {
            foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.FullName != null
                    && assembly.FullName.StartsWith("App_Code."))
                {
                    return assembly;
                }
            }

            return null;
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
