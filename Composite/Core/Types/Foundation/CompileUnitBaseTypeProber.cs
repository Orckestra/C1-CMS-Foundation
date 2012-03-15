using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


namespace Composite.Core.Types.Foundation
{
    // This code do NOT take generic base types into account. See http://msdn2.microsoft.com/en-us/library/system.codedom.codetypereference.basetype.aspx
    internal static class CompileUnitBaseTypeProber
    {
        /// <summary>
        /// Probes all class declarations, locates types with base types and return a map from found base types to all type declarations having this base type.
        /// </summary>
        /// <param name="compileUnit">The compile unit to probe</param>
        /// <param name="allowedBaseTypeAssemblies">The collection of assemblies all base types are expected to stem from.</param>
        /// <returns>A dictionary of all found base types that map to a list of type declarations using this base type.</returns>
        public static Dictionary<Type, List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>> MapTypeDeclarationInheritance(this CodeCompileUnit compileUnit, IEnumerable<Assembly> allowedBaseTypeAssemblies)
        {
            Func<string, Type> typeResolver = f => allowedBaseTypeAssemblies.Select(g => g.GetType(f, false)).FirstOrDefault(g => g != null);

            return MapTypeDeclarationInheritance(compileUnit, typeResolver);
        }


        /// <summary>
        /// Probes all class declarations, locates types with base types and return a map from found base types to all type declarations having this base type.
        /// </summary>
        /// <param name="compileUnit">The compile unit to probe</param>
        /// <param name="parms">The parameters used for compilation. Used to locate relevant assemblies</param>
        /// <returns>A dictionary of all found base types that map to a list of type declarations using this base type.</returns>
        public static Dictionary<Type, List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>> MapTypeDeclarationInheritance(this CodeCompileUnit compileUnit, CompilerParameters parms)
        {
            Func<string, Type> typeResolver = f => GetTypeFromReferencedAssemblies(parms, f);

            return MapTypeDeclarationInheritance(compileUnit, typeResolver);
        }


        /// <summary>
        /// Probes all class declarations, locates types with base types and return a map from found base types to all type declarations having this base type.
        /// </summary>
        /// <param name="compileUnit">The compile unit to probe</param>
        /// <param name="typeResolver">A function that can map a type full name (without assembly information) to a Type</param>
        /// <returns>A dictionary of all found base types that map to a list of type declarations using this base type.</returns>
        public static Dictionary<Type, List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>> MapTypeDeclarationInheritance(this CodeCompileUnit compileUnit, Func<string, Type> typeResolver)
        {
            var baseTypeToTypeDeclaration = new Dictionary<Type, List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>>();

            foreach (CodeNamespace codeNamespace in compileUnit.Namespaces)
            {
                foreach (CodeTypeDeclaration codeTypeDeclaration in codeNamespace.Types)
                {
                    foreach (CodeTypeReference baseTypeReference in codeTypeDeclaration.BaseTypes)
                    {
                        string baseTypeName = baseTypeReference.BaseType;

                        Type baseType = typeResolver(baseTypeName);

                        if (baseType == null)
                        {
                            // Base class be null since some generated classes are based on someother generated classes
                            continue;
                        }

                        if (baseTypeToTypeDeclaration.ContainsKey(baseType) == false) baseTypeToTypeDeclaration.Add(baseType, new List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>());

                        baseTypeToTypeDeclaration[baseType].Add(new KeyValuePair<CodeNamespace, CodeTypeDeclaration>(codeNamespace, codeTypeDeclaration));
                    }
                }
            }

            return baseTypeToTypeDeclaration;
        }





        private static Type GetTypeFromReferencedAssemblies(CompilerParameters parms, string baseTypeName)
        {
            Assembly[] knownAssemblies = AppDomain.CurrentDomain.GetAssemblies();

            Type baseType = Type.GetType(baseTypeName, false);

            if (baseType == null)
            {
                foreach (string referencedAssemblyFileName in parms.ReferencedAssemblies)
                {
                    Assembly assembly = knownAssemblies
                                        .FirstOrDefault(f => f.CodeBase.EndsWith(referencedAssemblyFileName, StringComparison.OrdinalIgnoreCase));

                    if (assembly != null)
                    {
                        baseType = assembly.GetType(baseTypeName, false);

                        if (baseType != null)
                            break;
                    }
                    else
                    {
                        throw new InvalidOperationException(string.Format("Did not find a candidate for referenced assembly '{0}'", referencedAssemblyFileName));
                    }

                }
            }

            return baseType;
        }

    }
}
