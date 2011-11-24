#warning REMOVE THIS LINE!!!
#define OUTPUT_SOURCE_CODE_ON_ERROR

using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.CodeGeneration;
using Microsoft.CSharp;
using System.Diagnostics;
using System.Collections.Specialized;
using Composite.Data.GeneratedTypes;


namespace Composite.Core.Types
{
#warning MRJ: Major cleanup

    




    





    internal class EmptyDataClassCodeProvider : ICodeProvider
    {
        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {

            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.AllDataTypeDescriptors)
            {
#warning MRJ: BM: This need to get the type of the data interface for handling custom builders. DONT THINK SO! Builders can be anything

                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("EmptyDataClassCodeProvider", string.Format("The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor.BuildNewHandlerTypeName ?? dataTypeDescriptor.Name));
                    continue;
                }

                if (string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
                {
                    EmptyDataClassCodeGenerator.AddAssemblyReferences(builder, dataTypeDescriptor);
                    EmptyDataClassCodeGenerator.AddEmptyDataClassTypeCode(builder, dataTypeDescriptor);
                }
            }
            // IPageTemplateFile
        }
    }






    internal class DataWrapperClassCodeProvider : ICodeProvider
    {
        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.AllDataTypeDescriptors)
            {
                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("DataWrapperClassCodeProvider", string.Format("The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor.BuildNewHandlerTypeName));
                    continue;
                }

                DataWrapperCodeGenerator.AddDataWrapperClassCode(builder, dataTypeDescriptor);
            }
        }
    }












#warning MRJ: BM: Documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class CodeGenerationBuilder
    {
        private readonly Dictionary<string, CodeNamespace> _namespaces = new Dictionary<string, CodeNamespace>();
        private readonly List<string> _assemblyLocations = new List<string>();

        internal string DebugLabel { get; private set; }


        /// <exclude />
        public CodeGenerationBuilder(string debugLabel = null)
        {
            DebugLabel = debugLabel ?? "";
        }



        /// <exclude />
        public void AddReference(Assembly assembly)
        {
            AddReference(assembly.Location);
        }



        /// <exclude />
        public void AddReference(string assemblyLocation)
        {
            if (!_assemblyLocations.Contains(assemblyLocation.ToLower()))
            {
                _assemblyLocations.Add(assemblyLocation.ToLower());
            }
        }



        /// <exclude />
        public void AddNamespace(CodeNamespace codeNamespace)
        {
            CodeNamespace existingCodeNamespace;
            if (!_namespaces.TryGetValue(codeNamespace.Name, out existingCodeNamespace))
            {
                _namespaces.Add(codeNamespace.Name, codeNamespace);
            }
            else
            {
#warning MRJ: BM: Copy more?
                existingCodeNamespace.Types.AddRange(codeNamespace.Types);
            }
        }


#warning MRJ: BM: Is it good to skip these double types things?
        /// <exclude />
        public void AddType(string namespaceName, CodeTypeDeclaration codeTypeDeclaration)
        {
            CodeNamespace codeNamespace;
            if (!_namespaces.TryGetValue(namespaceName, out codeNamespace))
            {
                codeNamespace = new CodeNamespace(namespaceName);
                _namespaces.Add(namespaceName, codeNamespace);

                codeNamespace.Types.Add(codeTypeDeclaration);
            }
            else
            {
                bool alreadyExists = false;
                foreach (CodeTypeDeclaration typeDeclaration in codeNamespace.Types)
                {
                    if (typeDeclaration.Name == codeNamespace.Name)
                    {
                        alreadyExists = true;
                        break;

                    }
                }

                if (!alreadyExists)
                {
                    codeNamespace.Types.Add(codeTypeDeclaration);
                }
                else
                {
                    Log.LogVerbose(CodeGenerationManager.LogTitle, string.Format("The type '{0}.{1}' has already been added, skipping this one", namespaceName, codeTypeDeclaration.Name));
                }
            }
        }


#warning MRJ: BM: Is it good to skip these double types things?
        /// <exclude />
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
                    else
                    {
                        Log.LogVerbose(CodeGenerationManager.LogTitle, string.Format("The type '{0}.{1}' has already been added, skipping this one", namespaceName, newCodeTypeDeclaration.Name));
                    }
                }
            }
        }



        internal IEnumerable<string> AssemblyLocations
        {
            get
            {
                return _assemblyLocations;
            }
        }



        internal IEnumerable<CodeNamespace> Namespaces
        {
            get
            {
                return _namespaces.Values;
            }
        }
    }


















    /// <summary>
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class CodeGenerationManager
    {
        private static readonly object _lock = new object();
        private static bool _compositeGeneratedCompiled = false;
        private static List<ICodeProvider> _dynamicallyAddedCodeProviders = new List<ICodeProvider>();

#warning MRJ: BM: Should this be cleaned? I Guess not
        private static readonly List<Assembly> CompiledAssemblies = new List<Assembly>();


        public const string LogTitle = "CodeGenerationManager";
        private const int NumberOfCompileRetries = 10;



        static CodeGenerationManager()
        {
            string assemblyTempPath = PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory);
            if (!Directory.Exists(assemblyTempPath))
            {
                Directory.CreateDirectory(assemblyTempPath);
            }

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        internal static void ValidateCompositeGenerate(DateTime time)
        {
            string filePath = Path.Combine(PathUtil.BaseDirectory, "Bin", "Composite.Generated.dll");
            
            if (!C1File.Exists(filePath)) return;

            DateTime lastWrite = C1File.GetLastWriteTime(filePath);

            if (lastWrite <= time) return;

            _compositeGeneratedCompiled = true;
            Log.LogVerbose(LogTitle, string.Format("Assembly in this application domain is newer than this application domain ({0})", AppDomain.CurrentDomain.Id));
        }



        public static void GenerateCompositeGeneratedAssembly(bool forceGeneration = false)
        {
            if (forceGeneration || !_compositeGeneratedCompiled)
            {
                lock (_lock)
                {
                    if (forceGeneration || !_compositeGeneratedCompiled)
                    {
                        Log.LogVerbose(LogTitle, string.Format("Compiling new assembly in this application domain ({0})", AppDomain.CurrentDomain.Id));

                        int t1 = Environment.TickCount;

                        CodeGenerationBuilder builder = new CodeGenerationBuilder("Composite.Generated.dll");
                        PopulateBuilder(builder);

                        int t2 = Environment.TickCount;

                        Compile(builder);

                        int t3 = Environment.TickCount;

                        int numberOfTypes = builder.Namespaces.SelectMany(f => f.Types.OfType<CodeTypeDeclaration>()).Count();

                        Log.LogVerbose(LogTitle, "Number of types build: " + numberOfTypes);
                        Log.LogVerbose(LogTitle, "Building code dom: " + (t2 - t1) + "ms");
                        Log.LogVerbose(LogTitle, "Compiling code dom: " + (t3 - t2) + "ms");                     
                        Log.LogVerbose(LogTitle, "Total compilation: " + (t3 - t1) + "ms");

                        _compositeGeneratedCompiled = true;

                        return;
                    }
                }
            }

            Log.LogVerbose(LogTitle, string.Format("New assembly already compiled by this application domain ({0})", AppDomain.CurrentDomain.Id));
        }



        /// <summary>
        /// This method will compile the type defined in <paramref name="codeGenerationBuilder"/>
        /// and return the result types. These types exists in a temp assembly, that will be
        /// deleted when the app domain is terminated.
        /// </summary>
        /// <param name="codeGenerationBuilder"></param>
        /// <returns></returns>
        public static IEnumerable<Type> CompileRuntimeTempTypes(CodeGenerationBuilder codeGenerationBuilder)
        {
            int t1 = Environment.TickCount;

            _compositeGeneratedCompiled = false; // When compiling a new type, Composite.Generated.dll should always be recompiled

#warning MRJ: BM: Duplicated code, refact!
            CompilerParameters compilerParameters = new CompilerParameters();
            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = false;

#warning MRJ: BM: Fix this path stuff!
            compilerParameters.OutputAssembly = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory), Guid.NewGuid() + ".dll");

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(codeGenerationBuilder.AssemblyLocations.ToArray());
            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(CompiledAssemblies.Select(f => f.Location).ToArray());
            AddAssemblyLocationsFromBin(compilerParameters);


            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();
            codeCompileUnit.Namespaces.AddRange(codeGenerationBuilder.Namespaces.ToArray());

            CSharpCodeProvider compiler = new CSharpCodeProvider();
            CompilerResults compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);

            if (compileResult.Errors.Count == 0)
            {
                Assembly resultAssembly = compileResult.CompiledAssembly;

                AddCompiledAssembly(resultAssembly);

                Type[] resultTypes = resultAssembly.GetTypes();

                int t2 = Environment.TickCount;
                
                Log.LogVerbose(LogTitle, string.Format("Compile '{0}' in {1}ms", codeGenerationBuilder.DebugLabel, t2 - t1));
                Log.LogVerbose(LogTitle, string.Format("Types from : {0}", compilerParameters.OutputAssembly));

                foreach (Type resultType in resultTypes)
                {
                    TypeManager.CompiledTypes.Add(resultType);
                }

                return resultTypes;
            }


#if OUTPUT_SOURCE_CODE_ON_ERROR
            using (FileStream file = File.Create(Path.Combine(PathUtil.BaseDirectory, "output.cs")))
            {
                using (var sw = new StreamWriter(file))
                {
                    compiler.GenerateCodeFromCompileUnit(codeCompileUnit, sw, new CodeGeneratorOptions());
                }
            }
#endif

            List<Type> referencedTypes = new List<Type>();
            List<string> failedAssemblyLoads = new List<string>();
            foreach (string assemblyLocation in compilerParameters.ReferencedAssemblies)
            {
                try
                {
                    Assembly assembly = Assembly.LoadFrom(assemblyLocation);
                    referencedTypes.AddRange(assembly.GetTypes());
                }
                catch (Exception)
                {
                    failedAssemblyLoads.Add(assemblyLocation);
                }
            }

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Failed building: " + codeGenerationBuilder.DebugLabel);
            foreach (CompilerError compilerError in compileResult.Errors)
            {
                if (compilerError.IsWarning) continue;

                string entry = "Compile error: " + compilerError.ErrorNumber + "(" + compilerError.Line + ")" + ": " + compilerError.ErrorText.Replace("{", "{{").Replace("}", "}}");

                Log.LogError(LogTitle, entry);

                sb.AppendLine(entry);
            }

            throw new InvalidOperationException(sb.ToString());
        }



        public static CompatibilityCheckResult CheckCompatibilityWithAppCodeFolder(DataTypeDescriptor dataTypeDescriptorToTest)
        {
            return CheckAgainsAppCode(dataTypeDescriptorToTest, true);
        }

        #warning MRJ: BM: Consider moving this to a helper class
        /// <summary>
        /// This method will try to compile the given type to see if any changes done to the type
        /// will conflict with code in App_Code
        /// </summary>
        /// <param name="dataTypeDescriptorToTest"></param>
        /// <returns></returns>
        public static CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(DataTypeDescriptor dataTypeDescriptorToTest)
        {
            return CheckAgainsAppCode(dataTypeDescriptorToTest, false);
        }


#warning MRJ: BM: Consider moving this to a helper class
#warning MRJ: BM: All the referenced assemblies kinda stinks, move to a nother class?
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataTypeDescriptorToTest"></param>
        /// <param name="includeDataTypeDescriptor">
        /// If true, the data type descriptor will be used instead of the original.
        /// If false, it will be excluded.
        /// </param>
        /// <returns></returns>
        private static CompatibilityCheckResult CheckAgainsAppCode(DataTypeDescriptor dataTypeDescriptorToTest, bool includeDataTypeDescriptor)
        {
            List<string> filesToCompile = GetAppCodeFiles().ToList();

            if (filesToCompile.Count == 0) return new CompatibilityCheckResult();
            

#warning MRJ: BM: Refac this out using the CodeGeneratorBuilder as parameter
            CSharpCodeProvider csCompiler = new CSharpCodeProvider();

            List<Assembly> referencedAssemblies = new List<Assembly>();
            Dictionary<string, List<CodeTypeDeclaration>> codeTypeDeclarations = new Dictionary<string, List<CodeTypeDeclaration>>();

            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors)
            {           
                if ((!includeDataTypeDescriptor) && (dataTypeDescriptor.DataTypeId == dataTypeDescriptorToTest.DataTypeId)) continue;

                DataTypeDescriptor dataTypeDescriptorToUse = dataTypeDescriptor;
                if ((includeDataTypeDescriptor) && (dataTypeDescriptor.DataTypeId == dataTypeDescriptorToTest.DataTypeId)) dataTypeDescriptorToUse = dataTypeDescriptorToTest;


                CodeTypeDeclaration codeTypeDeclaration = InterfaceCodeGenerator.CreateCodeTypeDeclaration(dataTypeDescriptorToUse, referencedAssemblies);

                List<CodeTypeDeclaration> declarations;
                if (!codeTypeDeclarations.TryGetValue(dataTypeDescriptorToUse.Namespace, out declarations))
                {
                    declarations = new List<CodeTypeDeclaration>();
                    codeTypeDeclarations.Add(dataTypeDescriptorToUse.Namespace, declarations);
                }
                declarations.Add(codeTypeDeclaration);

                string tempFilePath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory), dataTypeDescriptorToUse.DataTypeId + ".cs");
                filesToCompile.Add(tempFilePath);

#warning MRJ: BM: Cleanup these temp files. Put them another place?
                using (FileStream file = File.Create(tempFilePath))
                {
                    using (var sw = new StreamWriter(file))
                    {
                        CodeNamespace codeNamespace = new CodeNamespace(dataTypeDescriptorToUse.Namespace);
                        codeNamespace.Types.Add(codeTypeDeclaration);
                        csCompiler.GenerateCodeFromNamespace(codeNamespace, sw, new CodeGeneratorOptions());
                    }

                    StringBuilder sb = new StringBuilder();
                    using (var sw = new StringWriter(sb))
                    {
                        csCompiler.GenerateCodeFromMember(codeTypeDeclaration, sw, new CodeGeneratorOptions());
                    }

                }
            }
            

#warning MRJ: BM: Duplicated code, refact!
            CompilerParameters compilerParameters = new CompilerParameters();
            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = true;

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(referencedAssemblies.Select(f => f.Location).ToArray());
            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(CompiledAssemblies.Select(f => f.Location).ToArray());
#warning MRJ: BM: 
            AddAssemblyLocationsFromBin(compilerParameters);
            AddLoadedAssemblies(compilerParameters);
            AddCommonAssemblies(compilerParameters);
            RemoveGeneratedAssemblies(compilerParameters);

            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();
            foreach (var kvp in codeTypeDeclarations)
            {
                CodeNamespace codeNamespace = new CodeNamespace(kvp.Key);
                codeNamespace.Types.AddRange(kvp.Value.ToArray());
                codeCompileUnit.Namespaces.Add(codeNamespace);
            }

            CSharpCodeProvider compiler = new CSharpCodeProvider();
            CompilerResults compileResult = compiler.CompileAssemblyFromFile(compilerParameters, filesToCompile.ToArray());

            if (compileResult.Errors.Count == 0) return new CompatibilityCheckResult();

            return new CompatibilityCheckResult(compileResult);
        }



        /// <summary>
        /// This method returns true if the given type <paramref name="type"/> is
        /// compiled at runetime. Otherwice false.
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static bool IsCompiledAtRuntime(Type type)
        {
            return type.Assembly.Location.StartsWith(PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory), StringComparison.InvariantCultureIgnoreCase);
        }




        /// <summary>
        /// This method returns true if the types given by <paramref name="dependingTypes"/> needs a recompile because
        /// they either is null or the type given by <paramref name="dependableType"/> has changed and there for
        /// exists in a compiled at runtime assembly.
        /// </summary>
        /// <param name="dependableType">A type that all the types given by <paramref name="dependingTypes"/> depends on. </param>
        /// <param name="dependingTypes">All types in this enumerable should either be null or depend on the typoe given by <paramref name="dependableType"/></param>
        /// <returns>Returns true if the types given by <paramref name="dependingTypes"/> needs a recompile.</returns>
        public static bool IsRecompileNeeded(Type dependableType, IEnumerable<Type> dependingTypes)
        {
            foreach (Type dependingType in dependingTypes)
            {
                if (dependingType == null) return true;

                if (IsCompiledAtRuntime(dependableType) && !IsCompiledAtRuntime(dependingType)) return true;
            }

            return false;
        }



        /// <summary>
        /// Use this method to add a <see cref="ICodeProvider"/> impelementation
        /// that will be used when (and only) generating the final Composite.Generated.dll.
        /// </summary>
        /// <param name="codeProvider"></param>
        public static void AddAssemblyCodeProvider(ICodeProvider codeProvider)
        {
            _dynamicallyAddedCodeProviders.Add(codeProvider);
        }



        private static void Compile(CodeGenerationBuilder builder)
        {
            CompilerParameters compilerParameters = new CompilerParameters();
            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = false;
#warning MRJ: BM: Assembly file name fix
            compilerParameters.OutputAssembly = Path.Combine(PathUtil.BaseDirectory, "Bin", "Composite.Generated.dll");

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(builder.AssemblyLocations.ToArray());
            AddAssemblyLocationsFromBin(compilerParameters);

            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();
            codeCompileUnit.Namespaces.AddRange(builder.Namespaces.ToArray());


            for (int i = 0; i < NumberOfCompileRetries; i++)
            {
                CSharpCodeProvider compiler = new CSharpCodeProvider();
                CompilerResults compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);


                if (compileResult.Errors.Count == 0) return;

                if (i == NumberOfCompileRetries - 1)
                {
#warning MRJ: BM: Remove this
                    using (FileStream file = File.Create(Path.Combine(PathUtil.BaseDirectory, "output.cs")))
                    {
                        using (var sw = new StreamWriter(file))
                        {
                            compiler.GenerateCodeFromCompileUnit(codeCompileUnit, sw, new CodeGeneratorOptions());
                        }
                    }


                    StringBuilder sb = new StringBuilder();
                    foreach (CompilerError compilerError in compileResult.Errors)
                    {
                        if (compilerError.IsWarning) continue;

                        string entry = "Compile error: " + compilerError.ErrorNumber + "(" + compilerError.Line + ")" + ": " + compilerError.ErrorText.Replace("{", "{{").Replace("}", "}}");

                        Log.LogError(LogTitle, entry);

                        sb.AppendLine(entry);
                    }

                    throw new InvalidOperationException(sb.ToString());                    
                }
            }
        }



        private static void PopulateBuilder(CodeGenerationBuilder builder)
        {
            foreach (ICodeProvider provider in CodeProviders)
            {
                provider.GetCodeToCompile(builder);
            }
        }



#warning MRJ: BM: Move this to some other class
        private static IEnumerable<ICodeProvider> CodeProviders
        {
            get
            {
#warning MRJ: BM: Hardcode stuff
                yield return new InterfaceCodeProvider();
                yield return new EmptyDataClassCodeProvider();
                yield return new DataWrapperClassCodeProvider();

                foreach (ICodeProvider codeProvider in _dynamicallyAddedCodeProviders)
                {
                    yield return codeProvider;
                }

                yield break;
            }
        }

        


        private static void AddAssemblyLocationsFromBin(CompilerParameters compilerParameters)
        {
            foreach (string binFilePath in Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll"))
            {
                string assemblyFileName = Path.GetFileName(binFilePath);

#warning MRJ: BM: Fix this hardcoded name
                if (assemblyFileName.IndexOf("Composite.Generated.dll", StringComparison.InvariantCultureIgnoreCase) >= 0) continue;


                compilerParameters.ReferencedAssemblies.AddIfNotContained(binFilePath);
            }
        }



        /// <summary>
        /// Add assemblies that are loaded in the app domain.
        /// </summary>
        /// <param name="compilerParameters"></param>
        /// <returns></returns>
        private static void AddLoadedAssemblies(CompilerParameters compilerParameters)
        {
            Dictionary<string, string> foundAssemblyLocations = new Dictionary<string, string>();

            IEnumerable<string> locations =
                from a in AppDomain.CurrentDomain.GetAssemblies()
                where AssemblyHasLocation(a)
                select a.Location;


            foreach (string location in locations)
            {
                string locationKey = Path.GetFileName(location).ToLower();


                if (foundAssemblyLocations.ContainsKey(locationKey) == false)
                {
                    foundAssemblyLocations.Add(locationKey, location);
                }
                else
                {
                    string currentUsedLocation = foundAssemblyLocations[locationKey];

                    DateTime currentlyUsedLastWrite = File.GetLastWriteTime(currentUsedLocation);
                    DateTime locationCandidateLastWrite = File.GetLastWriteTime(location);

                    if (locationCandidateLastWrite > currentlyUsedLastWrite)
                    {
                        foundAssemblyLocations.Remove(locationKey);
                        foundAssemblyLocations.Add(locationKey, location);
                    }
                }
            }

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(foundAssemblyLocations.Values);
        }


#warning MRJ: BM: Move this method
        private static void AddRangeIfNotContained(this StringCollection stringCollection, IEnumerable<string> assemblyLocations)
        {
            foreach (string assemblyLocation in assemblyLocations)
            {
                AddIfNotContained(stringCollection, assemblyLocation);
            }
        }

#warning MRJ: BM: Move this method
        private static void AddIfNotContained(this StringCollection stringCollection, string assemblyLocation)
        {
            string assemblyFileName = Path.GetFileName(assemblyLocation);

            bool isContained = stringCollection.
                OfType<string>().
                Where(f => f.IndexOf(assemblyFileName, StringComparison.InvariantCultureIgnoreCase) >= 0).
                Any();

            if (!isContained)
            {
                stringCollection.Add(assemblyLocation);
            }
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
                       string.IsNullOrEmpty(assembly.Location) == false;
            }
            catch (Exception)
            {
                return false;
            }
        }


        private static void AddCommonAssemblies(CompilerParameters compilerParameters)
        {
            List<string> commonAssemblies = new List<string>()
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



        private static void RemoveGeneratedAssemblies(CompilerParameters compilerParameters)
        {
#warning MRJ: BM: Hardcoded name here
            List<string> assembliesToRemove = compilerParameters.ReferencedAssemblies.
                OfType<string>().
                Where(f => f.IndexOf("Composite.Generated.dll", StringComparison.InvariantCultureIgnoreCase) >= 0 || 
                           f.StartsWith(PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory), StringComparison.InvariantCultureIgnoreCase)).
                Select(f => f).
                ToList();

            foreach (string assemblyToRemove in assembliesToRemove)
            {
                compilerParameters.ReferencedAssemblies.Remove(assemblyToRemove);
            }
        }



        private static void AddCompiledAssembly(Assembly newAssembly)
        {
            Type newType = newAssembly.GetTypes().First();

            List<Assembly> assembliesToRemove = new List<Assembly>();
            foreach (Assembly assembly in CompiledAssemblies)
            {
                Type type = assembly.GetTypes().Where(f => f.FullName == newType.FullName).SingleOrDefault();
                if (type != null)
                {
                    assembliesToRemove.Add(assembly);
#warning MRJ: BM: Fix this !!!!!!!!!!!!!
//                    throw new NotImplementedException("The old assembly should be removed! Just want to see if this happens :)");
                }
            }

            foreach (Assembly assemblyToRemove in assembliesToRemove)
            {
                CompiledAssemblies.Remove(assemblyToRemove);
            }

            CompiledAssemblies.Add(newAssembly);
        }




        private static string[] GetAppCodeFiles()
        {
            string appCodeFolderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, GlobalSettingsFacade.AppCodeDirectory);

            if (!Directory.Exists(appCodeFolderPath)) return new string[0];

            return Directory.GetFiles(appCodeFolderPath, "*.cs", SearchOption.AllDirectories);
        }





        private static void Flush()
        {
            _dynamicallyAddedCodeProviders = new List<ICodeProvider>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }        
    }
}
