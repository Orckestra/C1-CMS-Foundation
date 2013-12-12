using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


namespace Composite.Core.Types
{
    /// <summary> 
    /// This class is used when compiling new types at run time in C1.
    /// It is used in two way. The first usage is for creating types that is located in temp assemblies. 
    /// Normaly when temp assemblies has ben made a restart of C1 is done. And this leads into the second
    /// usage which is when the Composite.Generated.dll is compiled. This is done through the implementation
    /// and adding of the interface <see cref="ICodeProvider"/> and <see cref="CodeGenerationManager"/>.
    /// </summary>
    public class CodeGenerationBuilder
    {
        private readonly Dictionary<string, CodeNamespace> _namespaces = new Dictionary<string, CodeNamespace>();
        private readonly List<string> _assemblyLocations = new List<string>();

        internal string DebugLabel { get; private set; }



        /// <summary>
        /// Creates a new instance.
        /// </summary>
        /// <param name="debugLabel">This label will be used for logging when compiling the types.</param>
        public CodeGenerationBuilder(string debugLabel = null)
        {
            DebugLabel = debugLabel ?? "";
        }



        /// <summary>
        /// Adds a referenced assembly to be used in the compilation.
        /// </summary>
        /// <param name="assembly">The referenced assembly.</param>
        public void AddReference(Assembly assembly)
        {
            AddReference(assembly.Location);
        }



        /// <summary>
        /// Adds a referenced assembly to be used in the compilation.
        /// </summary>
        /// <param name="assemblyLocation">The location of the referenced assembly.</param>
        public void AddReference(string assemblyLocation)
        {
            if (!_assemblyLocations.Contains(assemblyLocation, StringComparer.InvariantCultureIgnoreCase))
            {
                _assemblyLocations.Add(assemblyLocation);
            }
        }



        /// <summary>
        /// Adds a code namespace containing types to compile.
        /// </summary>
        /// <param name="codeNamespace">Code namespace to add.</param>
        public void AddNamespace(CodeNamespace codeNamespace)
        {
            CodeNamespace existingCodeNamespace;
            if (!_namespaces.TryGetValue(codeNamespace.Name, out existingCodeNamespace))
            {
                _namespaces.Add(codeNamespace.Name, codeNamespace);
            }
            else
            {
                existingCodeNamespace.Types.AddRange(codeNamespace.Types);
            }
        }



        /// <summary>
        /// Adds a new type declaration to compile. If the type name already exists in
        /// the given namespace. The type is skipped!
        /// </summary>
        /// <param name="namespaceName">Namespace to add the type to.</param>
        /// <param name="codeTypeDeclaration">Type declaration to compile.</param>
        public void AddType(string namespaceName, CodeTypeDeclaration codeTypeDeclaration)
        {
            AddTypes(namespaceName, new[] { codeTypeDeclaration });
        }



        /// <summary>
        /// Adds new type declarations to compile. If a type name already exists in
        /// the given namespace. The type is skipped!
        /// </summary>
        /// <param name="namespaceName"></param>
        /// <param name="codeTypeDeclarations"></param>
        public void AddTypes(string namespaceName, IEnumerable<CodeTypeDeclaration> codeTypeDeclarations)
        {
            CodeNamespace codeNamespace;
            if (!_namespaces.TryGetValue(namespaceName, out codeNamespace))
            {
                codeNamespace = new CodeNamespace(namespaceName);
                _namespaces.Add(namespaceName, codeNamespace);

                codeNamespace.Types.AddRange(codeTypeDeclarations.ToArray());
            }
            else
            {
                foreach (CodeTypeDeclaration newCodeTypeDeclaration in codeTypeDeclarations)
                {
                    bool alreadyExists = false;
                    foreach (CodeTypeDeclaration exitingTypeDeclaration in codeNamespace.Types)
                    {
                        if (exitingTypeDeclaration.Name == newCodeTypeDeclaration.Name)
                        {
                            alreadyExists = true;
                            break;
                        }
                    }

                    if (!alreadyExists)
                    {
                        codeNamespace.Types.Add(newCodeTypeDeclaration);
                    }
                }
            }
        }



        /// <summary>
        /// Added assembly locations
        /// </summary>
        public IEnumerable<string> AssemblyLocations
        {
            get
            {
                return _assemblyLocations;
            }
        }



        /// <summary>
        /// Added namespaces
        /// </summary>
        public IEnumerable<CodeNamespace> Namespaces
        {
            get
            {
                return _namespaces.Values;
            }
        }
    }
}
