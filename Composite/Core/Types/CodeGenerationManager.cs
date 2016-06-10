//#warning REMOVE THIS LINE!!!
//#define OUTPUT_SOURCE_CODE_ON_ERROR

using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Data.GeneratedTypes;
using Microsoft.CSharp;


namespace Composite.Core.Types
{
    /// <summary>
    /// Handles all dynamic type compilations and the generation of Composite.Generated.dll
    /// </summary>
    public static class CodeGenerationManager
    {
        internal static readonly string LogTitle = typeof(CodeGenerationManager).Name;
        private const int NumberOfCompileRetries = 10;

        private static readonly object _lock = new object();
        private static bool _compositeGeneratedCompiled = true;
        private static List<ICodeProvider> _dynamicallyAddedCodeProviders = new List<ICodeProvider>();
        private static readonly List<Assembly> _compiledAssemblies = new List<Assembly>();
        private static readonly Dictionary<string, Type>  _compiledTypesByFullName = new Dictionary<string, Type>();

        /// <summary>
        /// If set to <c>true</c>, /Bin/Composite.Generated.dll won't be overwritten on shutdown
        /// </summary>
        public static bool SuppressGeneration { get; set; }

        static CodeGenerationManager()
        {
            string assemblyTempPath = null;

            try
            {
                assemblyTempPath = PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory);
            }
            catch
            {
                // NOTE: We don't want this static constructor fail if GlobalSettingsFacade failed to load.
            }

            if (assemblyTempPath != null)
            {
                if (!C1Directory.Exists(assemblyTempPath))
                {
                    C1Directory.CreateDirectory(assemblyTempPath);
                }
            }

            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());

            GlobalEventSystemFacade.SubscribeToShutDownEvent(args => ClearOldTempFiles());
        }



        /// <summary>
        /// Validates that the current Composite.Generated.dll is not compiled after the given 
        /// time. If it is compiled after the given time. Any attempts to recompile Composite.Generated.dll
        /// will be ignored. This is used to stop app domains from shutting each other down by recompiles.
        /// </summary>
        /// <param name="time"></param>
        internal static void ValidateCompositeGenerate(DateTime time)
        {
            if (SuppressGeneration) return;

            string filePath = Path.Combine(PathUtil.BaseDirectory, "Bin", "Composite.Generated.dll");

            if (!C1File.Exists(filePath)) return;

            DateTime lastWrite = C1File.GetLastWriteTime(filePath);

            if (lastWrite <= time) return;

            _compositeGeneratedCompiled = true;
            Log.LogVerbose(LogTitle, string.Format("Assembly in this application domain is newer than this application domain ({0})", AppDomain.CurrentDomain.Id));
        }



        /// <summary>
        /// This method will recompile Composite.Generated.dll and drop it into bin.
        /// </summary>
        /// <param name="forceGeneration"></param>
        public static void GenerateCompositeGeneratedAssembly(bool forceGeneration = false)
        {
            if (SuppressGeneration) return;

            if (forceGeneration || !_compositeGeneratedCompiled)
            {
                lock (_lock)
                {
                    if (forceGeneration || !_compositeGeneratedCompiled)
                    {
                        Log.LogVerbose(LogTitle, string.Format("Compiling new assembly in this application domain ({0})", AppDomain.CurrentDomain.Id));

                        int t1 = Environment.TickCount;

                        var builder = new CodeGenerationBuilder("Composite.Generated.dll");
                        PopulateBuilder(builder);

                        int t2 = Environment.TickCount;

                        Compile(builder);

                        int t3 = Environment.TickCount;

                        int numberOfTypes = builder.Namespaces.SelectMany(f => f.Types.OfType<CodeTypeDeclaration>()).Count();

                        Log.LogVerbose(LogTitle, "Number of types build: " + numberOfTypes +
                                                 "\nBuilding code dom: " + (t2 - t1) + "ms" + 
                                                 "\nCompiling code dom: " + (t3 - t2) + "ms" +
                                                 "\nTotal compilation: " + (t3 - t1) + "ms");

                        _compositeGeneratedCompiled = true;

                        return;
                    }
                }
            }

            Log.LogVerbose(LogTitle, "New assembly already compiled by this application domain ({0})", AppDomain.CurrentDomain.Id);
        }



        /// <summary>
        /// This method will compile the type defined in <paramref name="codeGenerationBuilder"/>
        /// and return the result types. These types exists in a temp assembly, that will be
        /// deleted when the app domain is terminated.
        /// </summary>
        /// <param name="codeGenerationBuilder"></param>
        /// <param name="verbose"></param>
        /// <returns></returns>
        public static IEnumerable<Type> CompileRuntimeTempTypes(CodeGenerationBuilder codeGenerationBuilder, bool verbose = true)
        {
            int t1 = Environment.TickCount;

            _compositeGeneratedCompiled = false; // When compiling a new type, Composite.Generated.dll should always be recompiled

            var compilerParameters = new CompilerParameters
            {
                GenerateExecutable = false,
                GenerateInMemory = false,
                OutputAssembly = Path.Combine(TempAssemblyFolderPath, Guid.NewGuid() + ".dll")
            };

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(codeGenerationBuilder.AssemblyLocations.ToArray());
            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(_compiledAssemblies.Select(f => f.Location).ToArray());
            compilerParameters.AddAssemblyLocationsFromBin();


            var codeCompileUnit = new CodeCompileUnit();
            codeCompileUnit.Namespaces.AddRange(codeGenerationBuilder.Namespaces.ToArray());

            var compiler = new CSharpCodeProvider();
            var compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);

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
                    _compiledTypesByFullName[resultType.FullName] = resultType;
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

            var failedAssemblyLoads = new List<Pair<string, Exception>>();
            foreach (string assemblyLocation in compilerParameters.ReferencedAssemblies)
            {
                try
                {
                    Assembly assembly = Assembly.LoadFrom(assemblyLocation);
                    var types = assembly.GetTypes(); // Accessing GetTypes() to iterate classes
                }
                catch (Exception ex)
                {
                    Exception exceptionToLog = ex;

                    var loadException = ex as ReflectionTypeLoadException;
                    if (loadException != null 
                        && loadException.LoaderExceptions != null
                        && loadException.LoaderExceptions.Any())
                    {
                        exceptionToLog = loadException.LoaderExceptions.First();
                    }

                    failedAssemblyLoads.Add(new Pair<string, Exception>( assemblyLocation, exceptionToLog));
                }
            }


            var sb = new StringBuilder();
            failedAssemblyLoads.ForEach(asm => sb.AppendFormat("Failed to load dll: '{0}' : {1}", asm.First, asm.Second).AppendLine());

            sb.AppendLine("Failed building: " + codeGenerationBuilder.DebugLabel);
            foreach (CompilerError compilerError in compileResult.Errors)
            {
                if (compilerError.IsWarning) continue;

                string entry = "Compile error: " + compilerError.ErrorNumber + "(" + compilerError.Line + ")" + ": " + compilerError.ErrorText.Replace("{", "{{").Replace("}", "}}");

                if (verbose)
                {
                    Log.LogError(LogTitle, entry);
                }

                sb.AppendLine(entry);
            }

            throw new InvalidOperationException(sb.ToString());
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


        /// <summary>
        /// Gets the compiled types.
        /// </summary>
        /// <returns></returns>
        public static Type GetCompiledType(string fullName)
        {
            Type type;
            return _compiledTypesByFullName.TryGetValue(fullName, out type) ? type : null;
        }


        private static void Compile(CodeGenerationBuilder builder)
        {
            var compilerParameters = new CompilerParameters
            {
                GenerateExecutable = false,
                GenerateInMemory = false,
                OutputAssembly = CompositeGeneratedAssemblyPath,
                TempFiles = new TempFileCollection(TempAssemblyFolderPath)
            };

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(builder.AssemblyLocations.ToArray());
            compilerParameters.AddAssemblyLocationsFromBin();

            var codeCompileUnit = new CodeCompileUnit();
            codeCompileUnit.Namespaces.AddRange(builder.Namespaces.ToArray());


            for (int i = 0; i < NumberOfCompileRetries; i++)
            {
                var compiler = new CSharpCodeProvider();
                CompilerResults compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);


                if (compileResult.Errors.Count == 0) return;

                if (i == NumberOfCompileRetries - 1)
                {
#if OUTPUT_SOURCE_CODE_ON_ERROR
                    using (FileStream file = File.Create(Path.Combine(PathUtil.BaseDirectory, "output.cs")))
                    {
                        using (var sw = new StreamWriter(file))
                        {
                            compiler.GenerateCodeFromCompileUnit(codeCompileUnit, sw, new CodeGeneratorOptions());
                        }
                    }
#endif

                    var sb = new StringBuilder();
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



        /// <summary>
        /// Returns all currently temp compiled assemblies.
        /// </summary>
        internal static IEnumerable<Assembly> CompiledAssemblies
        {
            get
            {
                return _compiledAssemblies;
            }
        }



        /// <summary>
        /// </summary>
        internal static string TempAssemblyFolderPath
        {
            get
            {
                return PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory);
            }
        }



        /// <summary>
        /// </summary>
        internal static string BinFolder
        {
            get
            {
                return RuntimeInformation.IsUnittest 
                    ? PathUtil.BaseDirectory
                    : Path.Combine(PathUtil.BaseDirectory, "Bin");
            }
        }



        /// <summary>
        /// </summary>
        internal static string CompositeGeneratedFileName
        {
            get
            {
                return "Composite.Generated.dll";
            }
        }



        /// <summary>
        /// </summary>
        internal static string CompositeGeneratedAssemblyPath
        {
            get
            {
                return Path.Combine(BinFolder, "Composite.Generated.dll");
            }
        }



        private static void PopulateBuilder(CodeGenerationBuilder builder)
        {
            foreach (ICodeProvider provider in CodeProviders)
            {
                provider.GetCodeToCompile(builder);
            }
        }



        private static IEnumerable<ICodeProvider> CodeProviders
        {
            get
            {
                yield return new InterfaceCodeProvider();
                yield return new EmptyDataClassCodeProvider();
                yield return new DataWrapperClassCodeProvider();

                foreach (ICodeProvider codeProvider in _dynamicallyAddedCodeProviders)
                {
                    yield return codeProvider;
                }
            }
        }



        private static void AddCompiledAssembly(Assembly newAssembly)
        {
            Type newType = newAssembly.GetTypes().First();

            var assembliesToRemove = new List<Assembly>();
            foreach (Assembly assembly in _compiledAssemblies)
            {
                Type type = assembly.GetTypes().SingleOrDefault(f => f.FullName == newType.FullName);
                if (type != null)
                {
                    assembliesToRemove.Add(assembly);
                }
            }

            foreach (Assembly assemblyToRemove in assembliesToRemove)
            {
                _compiledAssemblies.Remove(assemblyToRemove);
            }

            _compiledAssemblies.Add(newAssembly);
        }



        private static void Flush()
        {
            _dynamicallyAddedCodeProviders = new List<ICodeProvider>();
        }

        private static void ClearOldTempFiles()
        {
            DateTime yeasterday = DateTime.Now.AddDays(-1);
            var oldFiles = C1Directory.GetFiles(TempAssemblyFolderPath, "*.*").Where(filePath => C1File.GetCreationTime(filePath) < yeasterday).ToArray();

            foreach (var file in oldFiles)
            {
                try
                {
                    C1File.Delete(file);
                }
                catch
                {
                    // Silent
                }
            }
        }
    }
}
