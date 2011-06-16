//#define DEBUG_MODE
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.Logging;
using Composite.Core.Types.Foundation;
using Microsoft.CSharp;


namespace Composite.Core.Types
{
    internal sealed class BuildManagerImpl : IBuildManager
    {
        private static readonly string LogTitle = "RGB(194, 252, 131)BuildManager";
        private bool _initializeAppDomainLoadedAssembliesHasRun = false;
        private string _tempAssemblyDirectory = null;
        private Hashtable<int, BuildManagerCompileUnit> _buildManagerCompileUnits = new Hashtable<int, BuildManagerCompileUnit>();
        private string _assemblyPackFilename = "Composite.Generated";
        private readonly string PackageFileAlias = "CompositePackageFile";
        private AssemblyFilenameCollection _loadedAssemblyFilenames = new AssemblyFilenameCollection();

        private ConcurrentDictionary<Assembly, int> _assemblyVersions = new ConcurrentDictionary<Assembly, int>();

        private readonly object _lock = new object();


        public BuildManagerImpl()
        {
            ResolveBaseWorkingDirectory();
            this.CachingEnabled = true;
        }



        #region Type and assembly methods

        public Type GetType(string fullName)
        {
            if (fullName == null) throw new ArgumentNullException("fullName");

            lock (_lock)
            {
                string typeName = GetTypeNameFromFullName(fullName);
                foreach (BuildManagerCompileUnit buildManagerCompileUnit in _buildManagerCompileUnits.GetValues())
                {
                    Type type = buildManagerCompileUnit.TryGetGeneretedTypeByFullName(typeName);

                    if (type != null)
                    {
                        return type;
                    }
                }

                return null;
            }
        }

        private ICollection<BuildManagerCompileUnit> GetCompileUnits()
        {
            lock (_lock)
            {
                return _buildManagerCompileUnits.GetValues();
            }
        }


        public bool HasType(Type type)
        {
            if (type == null) throw new ArgumentNullException("type");

            string typeName = type.FullName;
            foreach (BuildManagerCompileUnit buildManagerCompileUnit in GetCompileUnits())
            {
                Type foundType = buildManagerCompileUnit.TryGetGeneretedTypeByFullName(typeName);

                if (foundType != null)
                {
                    return true;
                }
            }

            return false;
        }



        public bool IsAssemlbyCurrentBuildedAssembly(Assembly assembly)
        {
            Verify.ArgumentNotNull(assembly, "assembly");


            if (assembly.IsDynamicBuild() == false) return true;

            int hashedId = assembly.GetAssemblyId().GetHashCode();

            BuildManagerCompileUnit dynamicBuildManagerCompileUnit;

            if (!_buildManagerCompileUnits.TryGetValue(hashedId, out dynamicBuildManagerCompileUnit))
            {
                // Or throw exception? /MRJ
                return true;
            }
            int assemblyVersion = _assemblyVersions.GetOrAdd(assembly, asm => asm.GetTypes().First().GetAssemblyVersionNumber());

            return dynamicBuildManagerCompileUnit.AssemblyVersion == assemblyVersion;
        }



        public void LoadAssemlby(string assemblyFilename)
        {
            if (string.IsNullOrEmpty(assemblyFilename) == true) throw new ArgumentNullException("assemblyFilename");

            lock (_lock)
            {
                if (_loadedAssemblyFilenames.ContainsAssemblyFilename(assemblyFilename) == false)
                {
                    _loadedAssemblyFilenames.Add(assemblyFilename);
                }
            }
        }



        private static string GetTypeNameFromFullName(string fullName)
        {
            if (fullName.IndexOf(',') > -1)
            {
                string[] typeNameParts = fullName.Split(',');
                return typeNameParts[0];
            }

            return fullName;
        }
        #endregion


        #region CompiledTypes methods


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass")]
        public void GetCompiledTypes(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            if (buildManagerCompileUnit == null) throw new ArgumentNullException("buildManagerCompileUnit");

            BuildManagerCompileUnit exsitingBuildManagerCompileUnit;


            int t1 = Environment.TickCount;
            bool makeCompile = false;
            bool generateCsFile = false;

            if (_buildManagerCompileUnits.TryGetValue(buildManagerCompileUnit.HashedId, out exsitingBuildManagerCompileUnit)
                && exsitingBuildManagerCompileUnit.Fingerprint == buildManagerCompileUnit.Fingerprint)
            {
                generateCsFile = CheckWhetherSourcesShouldBeRegenerated(buildManagerCompileUnit, exsitingBuildManagerCompileUnit);
            }
            else
            {
                lock (_lock)
                {
                    _buildManagerCompileUnits.TryGetValue(buildManagerCompileUnit.HashedId, out exsitingBuildManagerCompileUnit);

                    if (exsitingBuildManagerCompileUnit == null)
                    {
                        buildManagerCompileUnit.AssemblyVersion = 1;
                        _buildManagerCompileUnits.Add(buildManagerCompileUnit.HashedId, buildManagerCompileUnit);

                        makeCompile = true;
                    }
                    else if (exsitingBuildManagerCompileUnit.Fingerprint == buildManagerCompileUnit.Fingerprint)
                    {
                        generateCsFile = CheckWhetherSourcesShouldBeRegenerated(buildManagerCompileUnit, exsitingBuildManagerCompileUnit);
                    }
                    else
                    {
                        buildManagerCompileUnit.AssemblyVersion = exsitingBuildManagerCompileUnit.AssemblyVersion + 1;
                        _buildManagerCompileUnits[buildManagerCompileUnit.HashedId] = buildManagerCompileUnit;

                        makeCompile = true;
                    }
                }
            }
            
            if (generateCsFile)
            {
                CreateCsFileOnly(buildManagerCompileUnit);
            }

            if (makeCompile)
            {
                Compile(buildManagerCompileUnit);
            }
            int t2 = Environment.TickCount;

            LoggingService.LogVerbose("DynamicBuildManager", string.Format("Compile unit with id '{0}' compiled ({1} ms)", buildManagerCompileUnit.Id, t2 - t1));
        }

        private bool CheckWhetherSourcesShouldBeRegenerated(BuildManagerCompileUnit buildManagerCompileUnit, BuildManagerCompileUnit exsitingBuildManagerCompileUnit)
        {
            buildManagerCompileUnit.CopyResultsFrom(exsitingBuildManagerCompileUnit);
            buildManagerCompileUnit.AssemblyVersion = exsitingBuildManagerCompileUnit.AssemblyVersion;


            bool csFileFound = false;
            foreach (string filePath in Directory.GetFiles(_tempAssemblyDirectory, "*.cs"))
            {
                CreatedFilenameParser parser = CreatedFilenameParser.Create(filePath);

                if ((parser != null) &&
                    (parser.HashedId == exsitingBuildManagerCompileUnit.HashedId) &&
                    (parser.HashedFingerprint == exsitingBuildManagerCompileUnit.Fingerprint.GetHashCode()) &&
                    (parser.AssemblyVersion == exsitingBuildManagerCompileUnit.AssemblyVersion))
                {
                    csFileFound = true;
                    break;
                }

            }

            return !csFileFound;
        }


        /// <summary>
        /// This is for most parts a copy of the Compile method.
        /// If and when we refactor this class, this should be made better, so its not a copy of the Compile method.
        /// </summary>
        /// <param name="buildManagerCompileUnit"></param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass", Justification = "This is what we want, touch is used later on")]
        private void CreateCsFileOnly(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            if (!buildManagerCompileUnit.IsCacheble && buildManagerCompileUnit.AllowCrossReferences)
            {
                throw new NotImplementedException("Not cacheable compile units are not supported.");
            }

            if (buildManagerCompileUnit.IsCacheble == false) return;


            CompilerParameters compilerParameters = new CompilerParameters();
            foreach (Assembly assembly in buildManagerCompileUnit.ReferencedAssemblies)
            {
                if (compilerParameters.ReferencedAssemblies.Contains(assembly.Location) == false)
                {
                    compilerParameters.ReferencedAssemblies.Add(assembly.Location);
                }
            }           

            AddReferencedAssembliesLocations(compilerParameters.ReferencedAssemblies);

            RemoveReferencesToTempAssemblies(compilerParameters.ReferencedAssemblies);


            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();

            CopyTypes(buildManagerCompileUnit, codeCompileUnit);

            if (buildManagerCompileUnit.AllowSiloing)
            {
                BuildManagerSiloHelper.SiloEmbedClasses(codeCompileUnit, buildManagerCompileUnit.ReferencedAssemblies, compilerParameters);
            }

            AddBuildManagerAttributes(buildManagerCompileUnit, codeCompileUnit);

            CSharpCodeProvider compiler = new CSharpCodeProvider();

            string sourceBaseFilename = CreatedFilenameParser.CreateFilename(buildManagerCompileUnit, "cs");
            string sourceFilename = Path.Combine(_tempAssemblyDirectory, sourceBaseFilename);

            using (FileStream file = File.Create(sourceFilename))
            {
                using (var sw = new StreamWriter(file))
                {
                    compiler.GenerateCodeFromCompileUnit(codeCompileUnit, sw, new CodeGeneratorOptions());
                    sw.Close();
                }
                file.Close();
            }

            IEnumerable<string> lines = File.ReadAllLines(sourceFilename).SkipWhile(f => f.StartsWith("namespace") == false);

            if (buildManagerCompileUnit.AllowCrossReferences)
            {
                File.WriteAllLines(sourceFilename, GetAliasesDefinitionCode(false, buildManagerCompileUnit).Concat(lines));
            }
            else
            {
                File.WriteAllLines(sourceFilename, lines.ToArray());
            }
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass", Justification = "This is what we want, touch is used later on")]
        private void Compile(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            if (!buildManagerCompileUnit.IsCacheble && buildManagerCompileUnit.AllowCrossReferences)
            {
                throw new NotImplementedException("Not cacheable compile units are not supported.");
            }

            foreach (BuildManagerCompileType buildManagerCompileType in buildManagerCompileUnit.Types)
            {
                buildManagerCompileType.ResultType = null;
            }

            string baseFilename = CreatedFilenameParser.CreateFilename(buildManagerCompileUnit);
            string filename = Path.Combine(_tempAssemblyDirectory, baseFilename);


            CompilerParameters compilerParameters = new CompilerParameters();

            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = false;
            compilerParameters.OutputAssembly = filename;

            foreach (Assembly assembly in buildManagerCompileUnit.ReferencedAssemblies)
            {
                if (compilerParameters.ReferencedAssemblies.Contains(assembly.Location) == false)
                {
                    compilerParameters.ReferencedAssemblies.Add(assembly.Location);
                }
            }

            bool aliasToPackageFileExists = false;
            if (buildManagerCompileUnit.AllowCrossReferences)
            {
                aliasToPackageFileExists = InsertAliasToPackageFile(compilerParameters);
            }

            AddReferencedAssembliesLocations(compilerParameters.ReferencedAssemblies);

            RemoveReferencesToTempAssemblies(compilerParameters.ReferencedAssemblies);

            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();

            CopyTypes(buildManagerCompileUnit, codeCompileUnit);

            BuildManagerSiloHelper.BuildManagerSiloHelperToken buildManagerSiloHelperToken = null;

            if (buildManagerCompileUnit.AllowSiloing == true)
            {
                buildManagerSiloHelperToken = BuildManagerSiloHelper.SiloEmbedClasses(codeCompileUnit, buildManagerCompileUnit.ReferencedAssemblies, compilerParameters);
            }

            AddBuildManagerAttributes(buildManagerCompileUnit, codeCompileUnit);

            CSharpCodeProvider compiler = new CSharpCodeProvider();

            var temporaryFiles = new List<string>();

            try
            {
                string sourceFilename = null;
                if (buildManagerCompileUnit.IsCacheble == true)
                {
                    string sourceBaseFilename = CreatedFilenameParser.CreateFilename(buildManagerCompileUnit, "cs");
                    sourceFilename = Path.Combine(_tempAssemblyDirectory, sourceBaseFilename);

                    using (FileStream file = File.Create(sourceFilename))
                    {
                        using (var sw = new StreamWriter(file))
                        {
                            compiler.GenerateCodeFromCompileUnit(codeCompileUnit, sw, new CodeGeneratorOptions());
                            sw.Close();
                        }
                        file.Close();
                    }

                    IEnumerable<string> lines = File.ReadAllLines(sourceFilename).SkipWhile(f => f.StartsWith("namespace") == false);

                    if (buildManagerCompileUnit.AllowCrossReferences)
                    {
                        File.WriteAllLines(sourceFilename, GetAliasesDefinitionCode(false, buildManagerCompileUnit).Concat(lines));

                        if (aliasToPackageFileExists)
                        {
                            string tempSourceFileName = sourceFilename + "temp";
                            File.WriteAllLines(tempSourceFileName, GetAliasesDefinitionCode(true, buildManagerCompileUnit).Concat(lines));

                            sourceFilename = tempSourceFileName;
                            temporaryFiles.Add(tempSourceFileName);
                        }
                    }
                    else
                    {
                        File.WriteAllLines(sourceFilename, lines.ToArray());
                    }
                    lines = null;
                }



                CompilerResults compileResult = null;
                int retries = 0;
                string assemlblyVersionFile = null;
                while (true)
                {
                    // Resetting temp files collection, so compilation won't fail on the second time with exception like
                    // "The file '{$WinRoot}\TEMP\XXXXXXXXX.out' already exists."
                    compilerParameters.TempFiles = new TempFileCollection(); 

                    if (buildManagerCompileUnit.AllowCrossReferences)
                    {
                        if(retries == 0)
                        {
                            assemlblyVersionFile = GetAssemblyVersionFile(buildManagerCompileUnit);
                            temporaryFiles.Add(assemlblyVersionFile);
                        }
                        
                        compileResult = compiler.CompileAssemblyFromFile(compilerParameters, sourceFilename, assemlblyVersionFile);
                    }
                    else
                    {
                        if(retries == 0)
                        {
                            compilerParameters.ReferencedAssemblies.Add(typeof(EditorBrowsableAttribute).Assembly.Location); // This is a small hach /MRJ                        
                        }
                        
                        compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);
                    }


                    if (compileResult.Errors.Count == 0)
                    {
                        break;
                    }

                    if ((compileResult.Errors.Count == 1) && (compileResult.Errors[0].ErrorNumber == "CS0016") && (retries < 3))
                    {
                        // The file is used by another process. This is not a thread issue but a multi process issue
                        // For now, ignore the exception and retry. /MJR
                        Thread.Sleep(retries * 100);
                    }
                    else
                    {
                        CompilerError compilerError = compileResult.Errors[0];
                        for (int i = 0; i < compileResult.Errors.Count; i++)
                        {
                            if (!compileResult.Errors[i].IsWarning)
                            {
                                compilerError = compileResult.Errors[i];
                                break;
                            }

                        }
                        throw new InvalidOperationException("Compilation returned error \"{0}\", File: \"{1}\", Line: \"{2}\""
                            .FormatWith(compilerError.ErrorText, compilerError.FileName ?? string.Empty, compilerError.Line));
                    }

                    retries++;
                }


                // Dump info to file
                //try
                //{
                //    using (StreamWriter sw2 = new StreamWriter(Path.Combine(_tempAssemblyDirectory, "HashedToIdMap.txt"), true))
                //    {
                //        sw2.WriteLine(string.Format("{0:X8}\t\t{1}\t{2}\t\t\t\t\t\t{3}", buildManagerCompileUnit.HashedId, buildManagerCompileUnit.AssemblyVersion, buildManagerCompileUnit.Id, buildManagerCompileUnit.Fingerprint));
                //    }
                //}
                //catch
                //{
                //    // Ignore
                //}

                Assembly resultAssembly = compileResult.CompiledAssembly;

                buildManagerCompileUnit.ExtractTypes(resultAssembly);

                if (buildManagerCompileUnit.AllowSiloing == true)
                {
                    BuildManagerSiloHelper.UpdateSiloedPointers(buildManagerSiloHelperToken, resultAssembly, buildManagerCompileUnit);
                }
            }
            finally
            {
                foreach (string tempFile in temporaryFiles)
                {
                    try
                    {
                        File.Delete(tempFile);
                    }
                    catch
                    {
                    }
                }
            }
        }



        /// <summary>
        /// Generates a cs file that has an instance of [BuildManagerCompileUnitAssemblyAttribute] attrubute.
        /// </summary>
        /// <param name="buildManagerCompileUnit"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        private string GetAssemblyVersionFile(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            string filename = Path.Combine(_tempAssemblyDirectory, "main.cstemp");
            File.WriteAllLines(filename, new[] { string.Format(@"[assembly: {0}(""{1}"", true)]",
                                                                       typeof (BuildManagerCompileUnitAssemblyAttribute)
                                                                           .FullName, buildManagerCompileUnit.Id),
                                                     });
            return filename;
        }



        private bool InsertAliasToPackageFile(CompilerParameters compilerParameters)
        {
            // Adding assembly alias for the package file
            foreach (string reference in compilerParameters.ReferencedAssemblies)
            {
                if (reference.ToLower().Contains("\\" + _assemblyPackFilename.ToLower() + ".dll"))
                {
                    compilerParameters.ReferencedAssemblies.Remove(reference);

                    //   CSharpCodeProvider generates the following command line for a reference:
                    //
                    //  csc.exe ....  /R:"pathToTheAssembly" .....
                    //
                    //   It doesn't support alias by default, so we're using the following workaround
                    // instead of assembly path, we're inserting line '" /R:OurAlias="pathToTheAssembly" /R:"', so the
                    // generated command will be like
                    //
                    //  csc.exe ....  /R:"" /R:OurAlias="pathToTheAssembly" /R:"" .....
                    //
                    // The '/R:""' arguments are just skipped, so we don't have any errors here
                    string referenceWithAlias = "\" /R:{0}=\"{1}\" /R:\"".FormatWith(PackageFileAlias, reference);
                    compilerParameters.ReferencedAssemblies.Add(referenceWithAlias);
                    return true;
                }
            }
            return false;
        }


        private static Guid GetImmutableTypeId(string[] codeLines)
        {
            for (int i = 0; i < 50 && i < codeLines.Length; i++)
            {
                if (codeLines[i].Contains("ImmutableTypeIdAttribute"))
                {
                    // Parsing a line like:    [Composite.Data.ImmutableTypeIdAttribute("1bdc3b18-468c-4439-b2fa-d7a796e3bdba")]

                    string codeLine = codeLines[i];
                    int leftQuoteOffset = codeLine.IndexOf("\"");
                    int rightQuoteOffset = codeLine.LastIndexOf("\"");

                    string logWarning = "Failed to parse a code line.";
                    if (leftQuoteOffset != rightQuoteOffset)
                    {

                        try
                        {
                            string guidStr = codeLine.Substring(leftQuoteOffset + 1, 36);
                            return new Guid(guidStr);
                        }
                        catch (Exception)
                        {
                            LoggingService.LogWarning(LogTitle, logWarning);
                        }

                        break;
                    }
                    LoggingService.LogWarning(LogTitle, logWarning);
                    break;
                }
            }
            return Guid.Empty;
        }

        /// <summary>
        /// Checks whether removing a type with specified id will cause exceptions while building sources from 'App_Code' folder.
        /// </summary>
        /// <param name="immutableTypeId">The type id.</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(Guid immutableTypeId)
        {

            string[] appCodeFiles = GetAppCodeFiles();

            if (appCodeFiles.Length == 0)
            {
                return new CompatibilityCheckResult();
            }

            string tempDllFilePath = Path.Combine(_tempAssemblyDirectory, immutableTypeId + "tempBuild.dll");

            IEnumerable<string> generatedInterfaces = GetInterfaceSourcesToCompile(immutableTypeId).Evaluate();
            if (generatedInterfaces.FirstOrDefault() == null)
            {
                return new CompatibilityCheckResult();
            }

            IEnumerable<string> filesToCompile = generatedInterfaces.Concat(appCodeFiles);


            IEnumerable<string> assemblyReferences = GetLoadedAssemblyLocationsWithoutAppCodeDll();

            try
            {
                CompilerResults compilerResults = GeneratePackageDll(tempDllFilePath, filesToCompile, assemblyReferences.ToArray());

                if (compilerResults == null)
                {
                    return new CompatibilityCheckResult();
                }

                return new CompatibilityCheckResult(compilerResults);

            }
            finally
            {
                File.Delete(tempDllFilePath);
            }
        }


        /// <summary>
        /// Checks if changes that are applied in the compilation unit will cause build error while compilation cs-files from "/App_Code" directory.
        /// </summary>
        /// <param name="buildManagerCompileUnit">The compile unit.</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass", Justification = "This is what we want, touch is used later on")]
        public CompatibilityCheckResult CheckAppCodeCompatibility(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            Verify.ArgumentNotNull(buildManagerCompileUnit, "buildManagerCompileUnit");

            if (!buildManagerCompileUnit.IsCacheble)
            {
                return new CompatibilityCheckResult();
            }

            string[] appCodeFiles = GetAppCodeFiles();

            var compileUnit = new CodeCompileUnit();
            CopyTypes(buildManagerCompileUnit, compileUnit);

            // Adding default wrappers
            var compilerParameters = new CompilerParameters();
            AddReferencedAssembliesLocations(compilerParameters.ReferencedAssemblies);
            BuildManagerSiloHelper.SiloEmbedClasses(compileUnit, buildManagerCompileUnit.ReferencedAssemblies, compilerParameters);

            string tempCsFileName = CreatedFilenameParser.CreateFilename(buildManagerCompileUnit, "temp");
            string tempCsFilePath = Path.Combine(_tempAssemblyDirectory, tempCsFileName);

            string tempDllFilePath = tempCsFilePath + "dll";

            try
            {
                using (FileStream file = File.Create(tempCsFilePath))
                {
                    using (var sw = new StreamWriter(file))
                    {
                        new CSharpCodeProvider().GenerateCodeFromCompileUnit(compileUnit, sw, new CodeGeneratorOptions());
                        sw.Close();
                    }
                    file.Close();
                }

                string[] lines = File.ReadAllLines(tempCsFilePath).SkipWhile(f => f.StartsWith("namespace") == false).ToArray();
                File.WriteAllLines(tempCsFilePath, lines);

                Guid immutableTypeId = GetImmutableTypeId(lines);
                Verify.That(immutableTypeId != Guid.Empty, "Failed to find 'ImmutableTypeId' class attribute.");

                // Compiling generated interfaces
                IEnumerable<string> generatedInterfaces = GetInterfaceSourcesToCompile(immutableTypeId);

                IEnumerable<string> filesToCompile = generatedInterfaces
                    .Concat(appCodeFiles)
                    .Concat(new[] { tempCsFilePath }).Evaluate();

                IEnumerable<string> assemblyReferences = GetLoadedAssemblyLocationsWithoutAppCodeDll();

                CompilerResults compilerResults = GeneratePackageDll(tempDllFilePath, filesToCompile, assemblyReferences.ToArray());
                if (compilerResults == null)
                {
                    return new CompatibilityCheckResult();
                }

                return new CompatibilityCheckResult(compilerResults);
            }
            finally
            {
                File.Delete(tempCsFilePath);
                File.Delete(tempDllFilePath);
            }
        }



        private void AddBuildManagerAttributes(BuildManagerCompileUnit buildManagerCompileUnit, CodeCompileUnit codeCompileUnit)
        {
            codeCompileUnit.AssemblyCustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(BuildManagerCompileUnitAssemblyAttribute).FullName,
                    new CodeAttributeArgument[] 
                    { 
                        new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerCompileUnit.Id)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerCompileUnit.IsCacheble)) 
                    }));

            foreach (CodeNamespace codeNamespace in codeCompileUnit.Namespaces)
            {
                foreach (CodeTypeDeclaration codeTypeDeclaration in codeNamespace.Types)
                {
                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(BuildManagerCompileUnitIdAttribute).FullName,
                            new CodeAttributeArgument[] { new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerCompileUnit.Id)) }));

                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(BuildManagerFingerprintAttribute).FullName,
                            new CodeAttributeArgument[] { new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerCompileUnit.Fingerprint)) }));

                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(BuildManagerAssemblyVersionAttribute).FullName,
                            new CodeAttributeArgument[] { new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerCompileUnit.AssemblyVersion)) }));
                }
            }
        }



        [DebuggerStepThrough]
        private static IEnumerable<string> GetLoadedAssemblyLocationsWithoutAppCodeDll()
        {
            return (from asm in AppDomain.CurrentDomain.GetAssemblies()
                    where AssemblyHasLocation(asm)
                          && !asm.GetCustomAttributes(typeof (BuildManagerCompileUnitAssemblyAttribute), true).Any()
                          && !AssemblyFacade.IsAppCodeDll(asm)
                    select asm.Location).ToList();
        }



        private void AddReferencedAssembliesLocations(StringCollection stringCollection)
        {
            foreach (string location in GetReferencedAssembliesLocations())
            {
                if (stringCollection.Contains(location) == false)
                {
                    stringCollection.Add(location);
                }
            }
        }

        private static void RemoveReferencesToTempAssemblies(StringCollection stringCollection)
        {
            // Sometimes ASP .NET does load dll-s from bin folder before restarting application domain,
            // in this case we should check that the same file will not be loaded twice.

            string tempFolderPath = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            List<string> assembliesNotFromCache = new List<string>();

            foreach (string filePath in stringCollection)
            {
                // We have that situation for the path to Composite.Generate.dll
                if (filePath.StartsWith("\""))
                {
                    continue;
                }

                if (!filePath.StartsWith(tempFolderPath, true))
                {
                    assembliesNotFromCache.Add(Path.GetFileName(filePath));
                }
            }


            for (int i = stringCollection.Count - 1; i >= 0; i--)
            {
                string filePath = stringCollection[i];

                if (filePath.StartsWith(tempFolderPath, true)
                    && assembliesNotFromCache.Contains(Path.GetFileName(filePath), StringComparer.OrdinalIgnoreCase))
                {
                    stringCollection.RemoveAt(i);
                }
            }
        }

        private void CopyTypes(BuildManagerCompileUnit buildManagerCompileUnit, CodeCompileUnit codeCompileUnit)
        {
            var codeNamespaces = new Dictionary<string, CodeNamespace>();
            foreach (BuildManagerCompileType buildManagerCompileType in buildManagerCompileUnit.Types)
            {
                CodeNamespace codeNamespace;
                if (codeNamespaces.TryGetValue(buildManagerCompileType.CodeNamespaceName, out codeNamespace) == false)
                {
                    codeNamespace = new CodeNamespace(buildManagerCompileType.CodeNamespaceName);
                    codeNamespaces.Add(buildManagerCompileType.CodeNamespaceName, codeNamespace);
                }

                codeNamespace.Types.Add(buildManagerCompileType.CodeTypeDeclaration);
            }
            codeCompileUnit.Namespaces.AddRange(codeNamespaces.Values.ToArray());
        }

        [DebuggerStepThrough]
        private static bool AssemblyHasLocation(Assembly a)
        {
            if(a.GetType().FullName == "System.Reflection.Emit.InternalAssemblyBuilder")
            {
                return false;
            }

            if(a.GlobalAssemblyCache)
            {
                return true;
            }

            try
            {
                return a.ManifestModule.Name != "<Unknown>" &&
                       a.ManifestModule.FullyQualifiedName != "<In Memory Module>" &&
                       a.ManifestModule.ScopeName != "RefEmit_InMemoryManifestModule" &&
                       string.IsNullOrEmpty(a.Location) == false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private IEnumerable<string> GetReferencedAssembliesLocations()
        {
            var locations = new Dictionary<string, string>();

            var locationCandidates = from a in AppDomain.CurrentDomain.GetAssemblies()
                                     where AssemblyHasLocation(a)
                                     select a.Location;

            foreach (string locationCandidate in locationCandidates)
            {
                string locationKey = Path.GetFileName(locationCandidate).ToLower();
                if (locations.ContainsKey(locationKey) == false)
                {
                    locations.Add(locationKey, locationCandidate);
                }
                else
                {
                    string currentUsedLocation = locations[locationKey];

                    DateTime currentlyUsedLastWrite = File.GetLastWriteTime(currentUsedLocation);
                    DateTime locationCandidateLastWrite = File.GetLastWriteTime(locationCandidate);

                    if (locationCandidateLastWrite > currentlyUsedLastWrite)
                    {
                        locations.Remove(locationKey);
                        locations.Add(locationKey, locationCandidate);
                        LoggingService.LogWarning(LogTitle, string.Format("Assembly '{0}' was found in multiple locations, '{1}' and '{2}' - last one not loaded.", locationKey, currentUsedLocation, locationCandidate));
                    }
                    else
                    {
                        LoggingService.LogWarning(LogTitle, string.Format("Assembly '{0}' was found in multiple locations, '{1}' and '{2}' - first one not loaded.", locationKey, currentUsedLocation, locationCandidate));
                    }
                }
            }

            foreach (string binFilename in Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll"))
            {
                string filename = Path.GetFileName(binFilename).ToLower();

                if (filename.ToLower().StartsWith(_assemblyPackFilename.ToLower()) == false)
                {
                    if (locations.ContainsKey(filename) == true)
                    {
                        yield return locations[filename];
                    }
                }
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public bool RemoveCompiledType(Guid immutableTypeId)
        {
            lock (_lock)
            {
                List<int> keys = new List<int>(_buildManagerCompileUnits.GetKeys());

                foreach (int key in keys)
                {
                    var compileUnit = _buildManagerCompileUnits[key];
                    if (compileUnit.Fingerprint.Contains(immutableTypeId.ToString()))
                    {
                        _buildManagerCompileUnits.Remove(key);
                    }
                }
            }

            // Removing cs file with interface class defition, and files that have the immutableTypeId in its fingerprint
            var filesToBeDeleted = new List<string>();
            foreach (var filePath in GetSourcesToCompile())
            {
                string[] codeLines = File.ReadAllLines(filePath);
                for (int i = 0; i < 50 && i < codeLines.Length; i++)
                {
                    string line = codeLines[i];

                    if (line.Contains("public interface"))
                    {
                        if (GetImmutableTypeId(codeLines) == immutableTypeId)
                        {
                            filesToBeDeleted.Add(filePath);
                        }
                        break;
                    }

                    if (line.Contains(typeof(BuildManagerFingerprintAttribute).FullName)
                        && line.Contains(immutableTypeId.ToString()))
                    {
                        filesToBeDeleted.Add(filePath);
                        break;
                    }
                }
            }

            try
            {
                foreach (string fileName in filesToBeDeleted)
                {
                    File.Delete(fileName);
                }

                return true;
            }
            catch (Exception e)
            {
                Exception exceptionToLog = new InvalidOperationException("Failed to delete sources of a compiled type", e);
                LoggingService.LogError(LogTitle, exceptionToLog);
                return false;
            }
        }


        #endregion


        #region Initialization and finalization of the caching system methods

        public bool CachingEnabled { get; set; }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "This is what we want, touch is used later on")]
        public bool ClearCache(bool alsoBinFiles)
        {
            List<string> interfaceSources = GetInterfaceSourcesToCompile().ToList();

            bool result = false;
            if (alsoBinFiles == true)
            {
                string fullFilename = GetAssemblyPackFilename();

                // Recreating Composite.Generated dll, so it will contain only interfaces. 
                // It's done in order to avoid compilation errors for App_Code folder

                GeneratePackageDll(fullFilename, interfaceSources, new string[0]);

                result = true;
            }

            foreach (string filename in Directory.GetFiles(_tempAssemblyDirectory, "*.cs"))
            {
                if (!interfaceSources.Contains(filename))
                {
                    DeleteFileSilent(filename);
                }
            }

            return result;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public void RebuildCache(BuildManagerCompileUnit[] buildManagerCompileUnits)
        {
            _buildManagerCompileUnits.Clear();

            // Deleting all the files
            foreach (var filePath in GetSourcesToCompile())
            {
                File.Delete(filePath);
            }

            // Compiling all the units
            foreach (var compileUnit in buildManagerCompileUnits)
            {
                Compile(compileUnit);
            }
        }


        public void InitializeCachingSytem()
        {
            if (_initializeAppDomainLoadedAssembliesHasRun == true) return; //throw new InvalidOperationException("This may only be called once");
            _initializeAppDomainLoadedAssembliesHasRun = true;

            int startTime = Environment.TickCount;
            LoggingService.LogVerbose(LogTitle, "----------========== Initializing the type caching system! ==========----------");

            DeleteTempAssemblies();
            DeleteCachedSourceFiles();
            ForceCachedAssemblyLoading();

            IEnumerable<Assembly> dynamicGeneratedAssemblies =
                from a in AppDomain.CurrentDomain.GetAssemblies()
                where a.FullName.StartsWith(_assemblyPackFilename)
                select a;


            foreach (Assembly assembly in dynamicGeneratedAssemblies)
            {
                try
                {
                    foreach (Type type in assembly.GetTypes())
                    {
                        if (type.IsNested)
                        {
                            continue;
                        }

                        string id = type.GetTypeCompileUnitId();
                        string fingerprint = type.GetTypeCompileUnitFingerprint();
                        int assemblyVersion = type.GetAssemblyVersionNumber();

                        BuildManagerCompileUnit buildManagerCompileUnit;
                        if (_buildManagerCompileUnits.TryGetValue(id.GetHashCode(), out buildManagerCompileUnit) == false)
                        {
                            buildManagerCompileUnit = new BuildManagerCompileUnit(id, fingerprint);
                            buildManagerCompileUnit.AssemblyVersion = assemblyVersion;

                            _buildManagerCompileUnits.Add(id.GetHashCode(), buildManagerCompileUnit);
                        }

                        // Fingerprint and version intregity chechs
                        Verify.That(buildManagerCompileUnit.Fingerprint == fingerprint, "Unexpected 'fingerprint' value");
                        Verify.That(buildManagerCompileUnit.AssemblyVersion == assemblyVersion, "Unexpected assembly version");

                        buildManagerCompileUnit.AddType(new BuildManagerCompileType(type));
                    }
                }
                catch (ReflectionTypeLoadException)
                {
                    LoggingService.LogWarning("BuildManager", string.Format("Could not load '{0}', probably due to changes in one of the referenced assemblies, cached types not loaded (will be recompiled)", assembly));
                }
            }

            UpdateSiloPointers();

            int endTime = Environment.TickCount;
            LoggingService.LogVerbose(LogTitle, string.Format("----------========== Done initializing the type caching system ({0} ms ) ==========----------", endTime - startTime));
        }


        public void FinalizeCachingSytem()
        {
            int startTime = Environment.TickCount;
            Log.LogVerbose(LogTitle, "----------========== Finalizing the type caching system! ==========----------");

            CreateCompositeGeneretedAssembly();

            int endTime = Environment.TickCount;
            Log.LogVerbose(LogTitle, string.Format("----------========== Done finalizing the type caching system ({0} ms ) ==========----------", endTime - startTime));
        }

        private void UpdateSiloPointers()
        {
            IEnumerable<Assembly> dynamicGeneratedAssemblies =
                from a in AppDomain.CurrentDomain.GetAssemblies()
                where (a.GetCustomAttributes(typeof(BuildManagerCompileUnitAssemblyAttribute), true).Length > 0) ||
                      a.FullName.StartsWith(_assemblyPackFilename)
                select a;


            foreach (Assembly assembly in dynamicGeneratedAssemblies)
            {
                try
                {
                    foreach (Type type in assembly.GetTypes())
                    {
                        if (type.IsNested)
                        {
                            continue;
                        }
                        BuildManagerSiloHelper.UpdateSiloedPointers(type);
                    }
                }
                catch (ReflectionTypeLoadException)
                {
                    LoggingService.LogWarning("BuildManager", string.Format("Could not load '{0}', probably due to changes in one of the referenced assemblies, cached types not loaded (will be recompiled)", assembly));
                }
            }
        }

        /// <summary>
        /// Returns a collection of *.cs files that are located under /App_Code folder
        /// </summary>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "This is what we want, touch is used later on")]
        private static string[] GetAppCodeFiles()
        {
            var folderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, GlobalSettingsFacade.AppCodeDirectory);
            if (!Directory.Exists(folderPath))
                return new string[0];

            return Directory.GetFiles(folderPath, "*.cs", SearchOption.AllDirectories);
        }


        /// <summary>
        /// Generates a package dll AND validation dlls (tmpdll)
        /// </summary>
        /// <param name="targetFileName">The output file's path.</param>        
        /// <param name="filenames">C# files to be compiled</param>
        /// <param name="assemblyReferences">Additional assembly references.</param>
        /// <returns>Null value, if no package has been generated, or compiler results otherwise.</returns>
        private CompilerResults GeneratePackageDll(string targetFileName, IEnumerable<string> filenames, string[] assemblyReferences)
        {
            if (!CachingEnabled)
            {
                return null;
            }

            if (filenames.Count() == 0)
            {
                return null;
            }

            var compilerParameters = new CompilerParameters
                                             {
                                                 GenerateExecutable = false,
                                                 GenerateInMemory = false,
                                                 OutputAssembly = targetFileName
                                             };

            compilerParameters.ReferencedAssemblies.Add(typeof(System.Linq.Expressions.Expression).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Xml.Linq.XElement).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Xml.Serialization.IXmlSerializable).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Data.Linq.Mapping.TableAttribute).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(System.ComponentModel.IContainer).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Data.SqlClient.SqlCommand).Assembly.Location);

            if (assemblyReferences != null)
            {
                foreach (string assemblyReference in assemblyReferences)
                {
                    if (compilerParameters.ReferencedAssemblies.Contains(assemblyReference) == false)
                    {
                        compilerParameters.ReferencedAssemblies.Add(assemblyReference);
                    }
                }
            }

            AddReferencedAssembliesLocations(compilerParameters.ReferencedAssemblies);

            CSharpCodeProvider compiler = new CSharpCodeProvider();

            CompilerResults result = compiler.CompileAssemblyFromFile(compilerParameters, filenames.ToArray());

            if (targetFileName.IndexOf(_assemblyPackFilename, StringComparison.OrdinalIgnoreCase) > -1)
            {
                C1File.Touch(targetFileName); // This ensures that the Composite.Genereted.dll is uploaded to the blob on azure
            }

            return result;
        }

        private IEnumerable<string> GetInterfaceSourcesToCompile()
        {
            return GetInterfaceSourcesToCompile(Guid.Empty);
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        private IEnumerable<string> GetInterfaceSourcesToCompile(Guid typeIdToSkip)
        {
            //                             interface,    file,   creationDate
            var dictionary = new Dictionary<string, Pair<string, DateTime>>();

            foreach (var fileName in GetSourcesToCompile())
            {
                string interfaceLine = null;

                bool containsInterface = false;
                string[] codeLines = File.ReadAllLines(fileName);
                for (int i = 0; i < 50 && i < codeLines.Length; i++)
                {
                    if (codeLines[i].Contains("public interface"))
                    {
                        interfaceLine = codeLines[i];
                        containsInterface = true;
                        break;
                    }
                }

                if (!containsInterface)
                {
                    continue;
                }

                // Skipping previous version of the interface
                if (typeIdToSkip != Guid.Empty && GetImmutableTypeId(codeLines) == typeIdToSkip)
                {
                    continue;
                }

                int nameOffset = interfaceLine.IndexOf(" interface ") + 11;
                string interfaceName = interfaceLine.Substring(nameOffset,
                                                               interfaceLine.IndexOf(" : ", nameOffset) - nameOffset);
                interfaceName = codeLines[0] + interfaceName; // First line contains namespace definition

                DateTime creationTime = File.GetCreationTime(fileName);

                if (!dictionary.ContainsKey(interfaceName))
                {
                    dictionary.Add(interfaceName, new Pair<string, DateTime>(fileName, creationTime));
                }
                else
                {
                    // Taking only the newest file
                    if (dictionary[interfaceName].Second > creationTime)
                    {
                        dictionary[interfaceName].First = fileName;
                    }
                }
            }
            return dictionary.Values.Select(value => value.First);
        }

        private IEnumerable<string> GetSourcesToCompile()
        {
            DeleteAssemblyVersions(_tempAssemblyDirectory, "cs");

            return CreatedFilenameParser.GetParsers(_tempAssemblyDirectory, "cs").Select(f => f.Filename).Evaluate();
        }


        /// <summary>
        /// This method will create Composite.Genereated.dll assemlby
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public void CreateCompositeGeneretedAssembly()
        {
            if (!CachingEnabled)
            {
                return;
            }

            IEnumerable<string> sourcesToCompile = GetSourcesToCompile();
            if (!sourcesToCompile.Any())
            {
                return;
            }

            DateTime lastCodeFileUpdate = sourcesToCompile.Select(f => File.GetLastWriteTime(f)).Max();
            DateTime lastAssemblyPackGeneration = File.GetLastWriteTime(GetAssemblyPackFilename());

            if (lastCodeFileUpdate <= lastAssemblyPackGeneration)
            {
                return;
            }

            string mainFilename = Path.Combine(_tempAssemblyDirectory, "main.cs");
            File.WriteAllLines(mainFilename, new[] 
            { 
                string.Format(@"[assembly: {0}(""{1}"", true)]", 
                typeof (BuildManagerCompileUnitAssemblyAttribute) .FullName, 
                _assemblyPackFilename),
            });


            IEnumerable<string> filesnames = sourcesToCompile.Concat(new[] { mainFilename });

            string assemblyPackFilename = GetAssemblyPackFilename();
            CompilerResults compileResult = GeneratePackageDll(assemblyPackFilename, filesnames, null);

            C1File.Touch(assemblyPackFilename); // This ensures that the Composite.Genereted.dll is uploaded to the blob on azure

            if (compileResult == null)
            {
                Log.LogVerbose("BulidManager", string.Format("Cache file created: {0}", assemblyPackFilename));
            }
            else if (compileResult.Errors.Count > 0)
            {
                Log.LogError("BulidManager", string.Format("Compilation returned error ({0}: {1}", compileResult.Errors[0].Line, compileResult.Errors[0].ErrorText));
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        private void ForceCachedAssemblyLoading()
        {
            string fullFilename = GetAssemblyPackFilename();
            string filename = Path.GetFileName(fullFilename);

            int idx = filename.IndexOf(Path.GetExtension(filename));

            string assemblyName = filename.Remove(idx);

            if (File.Exists(fullFilename) == true)
            {
                Assembly.Load(assemblyName);
            }
        }



        private void DeleteAssemblyVersions(string path, string extension)
        {
            Dictionary<int, List<CreatedFilenameParser>> sortedCreatedFilenameParsers = new Dictionary<int, List<CreatedFilenameParser>>();
            foreach (CreatedFilenameParser createdFilenameParser in CreatedFilenameParser.GetParsers(path, extension))
            {
                List<CreatedFilenameParser> list;
                if (sortedCreatedFilenameParsers.TryGetValue(createdFilenameParser.HashedId, out list) == false)
                {
                    list = new List<CreatedFilenameParser>();
                    sortedCreatedFilenameParsers.Add(createdFilenameParser.HashedId, list);
                }

                list.Add(createdFilenameParser);
            }

            foreach (List<CreatedFilenameParser> createdFilenameParserList in sortedCreatedFilenameParsers.Values)
            {
                if (createdFilenameParserList.Count > 1)
                {
                    IEnumerable<string> filenamesToDelete =
                        (from cfp in createdFilenameParserList
                         orderby cfp.AssemblyVersion
                         select cfp.Filename).Take(createdFilenameParserList.Count - 1);

                    foreach (string filename in filenamesToDelete)
                    {
                        DeleteFileSilent(filename);
                    }
                }
            }
        }



        [DebuggerStepThrough]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "This is what we want, touch is used later on")]
        private void DeleteTempAssemblies()
        {
            try
            {
                foreach (string filename in Directory.GetFiles(_tempAssemblyDirectory, "*.dll"))
                {
                    File.Delete(filename);
                }

                foreach (string filename in Directory.GetFiles(_tempAssemblyDirectory, "*.cstemp"))
                {
                    File.Delete(filename);
                }
            }
            catch (UnauthorizedAccessException)
            {
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "This is what we want, touch is used later on")]
        private void DeleteCachedSourceFiles()
        {
            if (File.Exists(GetAssemblyPackFilename()) == false)
            {
                foreach (string filename in Directory.GetFiles(_tempAssemblyDirectory, "*.cs"))
                {
                    DeleteFileSilent(filename);
                }
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        private void DeleteFileSilent(string filename)
        {
            try
            {
                File.Delete(filename);
            }
            catch (UnauthorizedAccessException)
            {
                LoggingService.LogVerbose("BuildManager", "UnauthorizedAccessException while trying to delete file '{0}'".FormatWith(filename));
                return;
            }

            LoggingService.LogVerbose("BuildManager", "Successfully deleted '{0}'.".FormatWith(filename));
        }



        private string GetAssemblyPackFilename()
        {
            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), string.Format("{0}.dll", _assemblyPackFilename));
        }
        #endregion


        #region Event methods

        public Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            string filename = args.Name;

            if (filename.Contains(',') == true)
            {
                CreatedFilenameParser createdFilenameParser = CreatedFilenameParser.Create(filename);
                if (createdFilenameParser != null)
                {
                    return _buildManagerCompileUnits[createdFilenameParser.HashedId].Types.First().ResultType.Assembly;
                }
            }

            // Why can the system not load the "System.Web.Extensions" assembly? 
            // And "Composite.Core.XmlSerializers" <-- Licensing?
            // For now ignore it, so no exception is thrown /MRJ
            if ((filename == "System.Web.Extensions") ||
                (filename.StartsWith("Composite.Core.XmlSerializers") == true))
            {
                return null;
            }

            string fn = filename;
            if (fn.Contains(",") == true)
            {
                fn = fn.Remove(fn.IndexOf(",")).Trim();
            }

            if (_loadedAssemblyFilenames.ContainsAssemblyName(fn) == true)
            {
                filename = _loadedAssemblyFilenames.GetFilenameByAssemblyName(fn);
            }

            Assembly assembly = null;
            if (filename.Contains(@":\"))
            {
                try
                {
                    assembly = Assembly.LoadFile(filename);
                }
                catch
                {
                    // Ignore exceptions
                }
            }

            return assembly;
        }



        public void Flush()
        {
            _tempAssemblyDirectory = null;

            CleanNonCachedAssemblies();

            ResolveBaseWorkingDirectory();
        }



        public void PostFlush()
        {
            foreach (BuildManagerCompileUnit buildManagerCompileUnit in _buildManagerCompileUnits.GetValues())
            {
                foreach (BuildManagerCompileType buildManagerCompileType in buildManagerCompileUnit.Types)
                {
                    if (buildManagerCompileType.IsCompiled)
                    {
                        BuildManagerSiloHelper.UpdateSiloedPointers(buildManagerCompileType.ResultType);
                    }
                }
            }
        }



        private void CleanNonCachedAssemblies()
        {
            List<int> unitsToRemove = new List<int>();

            foreach (BuildManagerCompileUnit buildManagerCompileUnit in _buildManagerCompileUnits.GetValues())
            {
                if (buildManagerCompileUnit.IsCacheble == false)
                {
                    unitsToRemove.Add(buildManagerCompileUnit.HashedId);
                }
            }

            foreach (int hashedId in unitsToRemove)
            {
                _buildManagerCompileUnits.Remove(hashedId);
            }
        }

        #endregion

        /// <summary>
        /// Generates a code block with type aliases definition for generated interfaces. To be used while compiling a unit
        /// that has references to more than one generated interface at the same time.
        /// </summary>
        /// <param name="packageFileIsReferenced">If set to <c>true</c>, the code will be referencing package file.</param>
        /// <param name="buildManagerCompileUnit">The compilation unit.</param>
        /// <example>
        /// Here's a sample of resut code:
        /// 
        /// extern alias CompositePackageFile;
        /// 
        /// using Composite_Test_TestType = CompositePackageFile::Composite.Test.TestType;
        /// using Composite_Test_TestType2 = Composite.Test.TestType2;
        /// 
        /// </example>
        /// <returns></returns>
        private IEnumerable<string> GetAliasesDefinitionCode(bool packageFileIsReferenced, BuildManagerCompileUnit buildManagerCompileUnit)
        {
            var result = new List<string>();

            Assembly packageFileAssembly = null;

            if (packageFileIsReferenced)
            {
                result.Add("extern alias {0};".FormatWith(PackageFileAlias));

                packageFileAssembly = (from a in AppDomain.CurrentDomain.GetAssemblies()
                                       where a.FullName.StartsWith(_assemblyPackFilename)
                                       select a).FirstOrDefault();
            }

            foreach (Type generatedInterface in buildManagerCompileUnit.UsedTypes)
            {
                result.Add("using {0} = {1}{2};"
                    .FormatWith(CodeGenerationHelper.GetTypeAlias(generatedInterface),
                    generatedInterface.Assembly == packageFileAssembly ? PackageFileAlias + "::" : string.Empty,
                                generatedInterface.FullName));
            }
            return result;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirecotryClass:DoNotUseDirecotryClass", Justification = "This is what we want, touch is used later on")]
        private void ResolveBaseWorkingDirectory()
        {
            string generatedAssembliesDir = GlobalSettingsFacade.GeneratedAssembliesDirectory;

            _tempAssemblyDirectory = PathUtil.Resolve(generatedAssembliesDir);

            if (Directory.Exists(_tempAssemblyDirectory) == false)
            {
                LoggingService.LogVerbose("BuildManager", string.Format("Creating directory '{0}' for storing generated assemblies", _tempAssemblyDirectory));
                Directory.CreateDirectory(_tempAssemblyDirectory);
            }
        }
    }
}
