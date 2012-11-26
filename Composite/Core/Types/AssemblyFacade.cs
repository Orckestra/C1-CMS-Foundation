using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core.IO;
using Composite.Core.Configuration;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
	public static class AssemblyFacade
	{
        private static readonly Type RuntimeModuleType = typeof(Module).Assembly.GetType("System.Reflection.RuntimeModule");
        private static ReadOnlyCollection<string> AssembliesFromBin;


        /// <exclude />
        public static IEnumerable<Assembly> GetLoadedAssembliesFromBin()
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
        public static IEnumerable<string> GetAssembliesFromBin()
        {
            if (AssembliesFromBin == null) {
                var assembliesFromBin = new List<string>();

                foreach (string binFilePath in C1Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll")) {
                    string assemblyFileName = Path.GetFileName(binFilePath);

                    if (assemblyFileName.IndexOf(CodeGenerationManager.CompositeGeneratedFileName, StringComparison.OrdinalIgnoreCase) >= 0) continue;

                    if (IsDotNetAssembly(binFilePath)) {
                        assembliesFromBin.Add(binFilePath);
                    }
                }

                AssembliesFromBin = new ReadOnlyCollection<string>(assembliesFromBin);
            }

            return AssembliesFromBin;
        }

        private static bool IsDotNetAssembly(string dllFilePath)
        {
            try {
                AssemblyName.GetAssemblyName(dllFilePath);
            }
            catch (BadImageFormatException) {
                return false;
            }
            catch (Exception) {
            }

            return true;
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
            List<Assembly> assemblies = GetLoadedAssembliesFromBin() as List<Assembly>;

            Assembly appCodeAssembly = GetAppCodeAssembly();

            if (appCodeAssembly != null)
            {
                assemblies.Add(appCodeAssembly);
            }

            return assemblies;
        }
	}
}
