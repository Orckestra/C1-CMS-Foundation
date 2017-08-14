using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;


namespace Composite.Core.Types
{
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class CodeGenerationCommon
    {
        /// <summary>
        /// Adds all assemblies from bin, except Composite.Generated.dll
        /// </summary>
        /// <param name="compilerParameters"></param>
        public static void AddAssemblyLocationsFromBin(this CompilerParameters compilerParameters)
        {
            AssemblyFacade.GetAssembliesFromBin().ForEach(compilerParameters.ReferencedAssemblies.AddIfNotContained);
        }


        /// <summary>
        /// Add assemblies that are loaded in the app domain.
        /// </summary>
        /// <param name="compilerParameters">The compiler parameters.</param>
        /// <param name="includeAppCode">if set to <c>true</c> reference to App_Code will be included to results.</param>
        public static void AddLoadedAssemblies(this CompilerParameters compilerParameters, bool includeAppCode)
        {
            var foundAssemblyLocations = new Dictionary<string, string>();

            IEnumerable<Assembly> assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(AssemblyHasLocation);
                
            if(!includeAppCode)
            {
                assemblies = assemblies.Where(asm => !asm.GetName().Name.StartsWith("App_Code"));
            }
                
            IEnumerable<string> locations = assemblies.Select(a => a.Location);

            foreach (string location in locations)
            {
                string locationKey = Path.GetFileName(location).ToLowerInvariant();


                if (!foundAssemblyLocations.ContainsKey(locationKey))
                {
                    foundAssemblyLocations.Add(locationKey, location);
                }
                else
                {
                    string currentUsedLocation = foundAssemblyLocations[locationKey];

                    DateTime currentlyUsedLastWrite = C1File.GetLastWriteTime(currentUsedLocation);
                    DateTime locationCandidateLastWrite = C1File.GetLastWriteTime(location);

                    if (locationCandidateLastWrite > currentlyUsedLastWrite)
                    {
                        foundAssemblyLocations.Remove(locationKey);
                        foundAssemblyLocations.Add(locationKey, location);
                    }
                }
            }

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(foundAssemblyLocations.Values);
        }



        /// <summary>
        /// Add common used assemblies
        /// </summary>
        /// <param name="compilerParameters"></param>
        public static void AddCommonAssemblies(this CompilerParameters compilerParameters)
        {
            var commonAssemblies = new List<string>
            {
                typeof(System.Linq.Expressions.Expression).Assembly.Location,
                typeof(System.Xml.Linq.XElement).Assembly.Location,
                typeof(System.Xml.Serialization.IXmlSerializable).Assembly.Location,
                typeof(System.Data.Linq.Mapping.TableAttribute).Assembly.Location,
                typeof(System.ComponentModel.IContainer).Assembly.Location,
                typeof(System.Data.SqlClient.SqlCommand).Assembly.Location
            };

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(commonAssemblies);
        }



        /// <summary>
        /// Removes generated assemblies including Composite.Generated.dll
        /// </summary>
        /// <param name="compilerParameters"></param>
        public static void RemoveGeneratedAssemblies(this CompilerParameters compilerParameters)
        {
            List<string> assembliesToRemove = compilerParameters.ReferencedAssemblies.
                OfType<string>().
                Where(f => f.IndexOf(CodeGenerationManager.CompositeGeneratedFileName, StringComparison.InvariantCultureIgnoreCase) >= 0 ||
                           f.StartsWith(PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory), StringComparison.InvariantCultureIgnoreCase)).
                Select(f => f).
                ToList();

            assembliesToRemove.ForEach(compilerParameters.ReferencedAssemblies.Remove);
        }



        [DebuggerStepThrough]
        private static bool AssemblyHasLocation(Assembly assembly)
        {
            if (assembly.GetType().FullName == "System.Reflection.Emit.InternalAssemblyBuilder")
            {
                return false;
            }

            if (assembly.GlobalAssemblyCache)
            {
                return true;
            }

            try
            {
                return assembly.ManifestModule.Name != "<Unknown>" &&
                       assembly.ManifestModule.FullyQualifiedName != "<In Memory Module>" &&
                       assembly.ManifestModule.ScopeName != "RefEmit_InMemoryManifestModule" &&
                       !string.IsNullOrEmpty(assembly.Location);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
