using System;
using System.Collections.Generic;
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
        private static readonly string LogTitle = typeof (AssemblyFacade).Name;
        private static readonly Type RuntimeModuleType = typeof(Module).Assembly.GetType("System.Reflection.RuntimeModule");

        private static bool _compositeGeneratedErrorLogged;

        /// <exclude />
        public static IEnumerable<Assembly> GetLoadedAssembliesFromBin()
        {
            string binDirectory = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLowerInvariant().Replace('\\', '/');

            List<Assembly> assemblies = new List<Assembly>();
            foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (assembly.IsDynamic) continue;

                try
                {
                    string codebase = assembly.CodeBase.ToLowerInvariant();

                    if (codebase.Contains(binDirectory))
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


        /// <summary>
        /// Gets list of file pathes of .NET dll files from "~/Bin" folder, excluding Composite.Generated.dll.
        /// </summary>
        /// <returns></returns>
        /// <exclude />
        public static IEnumerable<string> GetAssembliesFromBin()
        {
            return GetAssembliesFromBin(false);
        }

        /// <summary>
        /// Gets list of file pathes of .NET dll files from "~/Bin" folder.
        /// </summary>
        /// <param name="includeCompositeGenerated">if set to <c>true</c> Composite.Generated.dll will also be included.</param>
        /// <returns></returns>
        /// <exclude />
        public static IEnumerable<string> GetAssembliesFromBin(bool includeCompositeGenerated)
        {
            var assembliesFromBin = new List<string>();

            foreach (string binFilePath in C1Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll")) {
                string assemblyFileName = Path.GetFileName(binFilePath);

                if (!includeCompositeGenerated)
                {
                    if (assemblyFileName.IndexOf(CodeGenerationManager.CompositeGeneratedFileName, StringComparison.OrdinalIgnoreCase) >= 0) continue;
                }

                if (IsDotNetAssembly(binFilePath)) {
                    assembliesFromBin.Add(binFilePath);
                }
            }

            return assembliesFromBin;
        }

        /// <summary>
        /// Gets the Composite.Generated assembly from the  "~/Bin" folder
        /// </summary>
        /// <exclude />
        public static Assembly GetGeneratedAssemblyFromBin()
        {
            foreach (string binFilePath in C1Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll"))
            {
                string assemblyFileName = Path.GetFileName(binFilePath);

                if (assemblyFileName.IndexOf(CodeGenerationManager.CompositeGeneratedFileName, StringComparison.OrdinalIgnoreCase) < 0)
                {
                    continue;
                }

                try
                {
                    return Assembly.LoadFrom(binFilePath);
                }
                catch(Exception ex)
                {
                    if (!_compositeGeneratedErrorLogged)
                    {
                        Log.LogInformation(LogTitle, "Failed to load ~/Bin/Composite.Generated.dll ");
                        Log.LogWarning(LogTitle, ex);

                        _compositeGeneratedErrorLogged = true;
                    }
                }
            }

            return null;
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

            if (!RuntimeModuleType.IsInstanceOfType(asm.ManifestModule)) return false;

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
            List<Assembly> assemblies = GetLoadedAssembliesFromBin().ToList();

            Assembly appCodeAssembly = GetAppCodeAssembly();

            if (appCodeAssembly != null)
            {
                assemblies.Add(appCodeAssembly);
            }

            return assemblies;
        }

        internal static bool AssemblyPotentiallyUsesType(Assembly assembly, Type type)
        {
            Verify.ArgumentNotNull(assembly, nameof(assembly));
            Verify.ArgumentNotNull(type, nameof(type));

            var typeAssembly = type.Assembly;
            string typeAssemblyName = typeAssembly.GetName().Name;

            return assembly == typeAssembly
                   || assembly.GetReferencedAssemblies().Any(r => r.Name == typeAssemblyName);
        }
	}
}
