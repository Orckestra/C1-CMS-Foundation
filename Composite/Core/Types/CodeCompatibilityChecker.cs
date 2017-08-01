using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Microsoft.CSharp;


namespace Composite.Core.Types
{
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class CodeCompatibilityChecker
    {
        /// <summary>
        /// This method will try to compile the given type to see if any changes done to the type
        /// will conflict with code in App_Code
        /// </summary>
        /// <param name="dataTypeDescriptorToTest"></param>
        /// <returns></returns>
        public static CompatibilityCheckResult CheckCompatibilityWithAppCodeFolder(DataTypeDescriptor dataTypeDescriptorToTest)
        {
            return CheckAgainsAppCode(dataTypeDescriptorToTest, true);
        }



        /// <summary>
        /// This method will check if any code in en App_Code folder depends on the given data interface.
        /// </summary>
        /// <param name="dataTypeDescriptorToTest"></param>
        /// <returns></returns>
        public static CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(DataTypeDescriptor dataTypeDescriptorToTest)
        {
            return CheckAgainsAppCode(dataTypeDescriptorToTest, false);
        }



        /// <summary>
        /// This method checks to see if any change in the given data type descriptor will make code 
        /// in App_Code fail and hence the site will fail.
        /// </summary>
        /// <param name="dataTypeDescriptorToTest"></param>
        /// <param name="includeDataTypeDescriptor">
        /// If true, the data type descriptor will be used instead of the original.
        /// If false, it will be excluded.
        /// </param>
        /// <returns></returns>
        [SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass", Justification = "File api is used for creating temporary files")]
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "File api is used for creating temporary files")]
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "File api is used for creating temporary files")]
        private static CompatibilityCheckResult CheckAgainsAppCode(DataTypeDescriptor dataTypeDescriptorToTest, bool includeDataTypeDescriptor)
        {
            List<string> filesToCompile = GetAppCodeFiles().ToList();

            if (filesToCompile.Count == 0) return new CompatibilityCheckResult();

            var csCompiler = new CSharpCodeProvider();

            List<Assembly> referencedAssemblies = new List<Assembly>();
            var codeTypeDeclarations = new Dictionary<string, List<CodeTypeDeclaration>>();

            foreach (var dataTypeDescriptor in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors)
            {
                if (!includeDataTypeDescriptor && dataTypeDescriptor.DataTypeId == dataTypeDescriptorToTest.DataTypeId) continue;

                DataTypeDescriptor dataTypeDescriptorToUse = dataTypeDescriptor;
                if (includeDataTypeDescriptor && dataTypeDescriptor.DataTypeId == dataTypeDescriptorToTest.DataTypeId) dataTypeDescriptorToUse = dataTypeDescriptorToTest;

                referencedAssemblies.AddRange(InterfaceCodeGenerator.GetReferencedAssemblies(dataTypeDescriptorToUse));
                CodeTypeDeclaration codeTypeDeclaration = InterfaceCodeGenerator.CreateCodeTypeDeclaration(dataTypeDescriptorToUse);

                List<CodeTypeDeclaration> declarations;
                if (!codeTypeDeclarations.TryGetValue(dataTypeDescriptorToUse.Namespace, out declarations))
                {
                    declarations = new List<CodeTypeDeclaration>();
                    codeTypeDeclarations.Add(dataTypeDescriptorToUse.Namespace, declarations);
                }
                declarations.Add(codeTypeDeclaration);

                string tempFilePath = GetTempFileName(dataTypeDescriptorToUse);
                filesToCompile.Add(tempFilePath);

                using (FileStream file = File.Create(tempFilePath))
                {
                    using (var sw = new StreamWriter(file))
                    {
                        var codeNamespace = new CodeNamespace(dataTypeDescriptorToUse.Namespace);
                        codeNamespace.Types.Add(codeTypeDeclaration);
                        csCompiler.GenerateCodeFromNamespace(codeNamespace, sw, new CodeGeneratorOptions());
                    }

                    var sb = new StringBuilder();
                    using (var sw = new StringWriter(sb))
                    {
                        csCompiler.GenerateCodeFromMember(codeTypeDeclaration, sw, new CodeGeneratorOptions());
                    }
                }
            }

            filesToCompile.Sort();


            var compilerParameters = new CompilerParameters
            {
                GenerateExecutable = false,
                GenerateInMemory = true
            };

            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(referencedAssemblies.Select(f => f.Location).ToArray());
            compilerParameters.ReferencedAssemblies.AddRangeIfNotContained(CodeGenerationManager.CompiledAssemblies.Select(f => f.Location).ToArray());
            compilerParameters.AddLoadedAssemblies(false);
            compilerParameters.AddAssemblyLocationsFromBin();
            compilerParameters.AddCommonAssemblies();
            compilerParameters.RemoveGeneratedAssemblies();


            var codeCompileUnit = new CodeCompileUnit();
            foreach (var kvp in codeTypeDeclarations)
            {
                var codeNamespace = new CodeNamespace(kvp.Key);
                codeNamespace.Types.AddRange(kvp.Value.ToArray());
                codeCompileUnit.Namespaces.Add(codeNamespace);
            }

            var compiler = new CSharpCodeProvider();
            var compileResult = compiler.CompileAssemblyFromFile(compilerParameters, filesToCompile.ToArray());

            if (compileResult.Errors.Count == 0) return new CompatibilityCheckResult();

            // Checking for a missing assembly error, if it is present, that means that App_Code check isn't applicable due to circular reference
            foreach (CompilerError error in compileResult.Errors)
            {
                if (error.ErrorNumber == "CS0012" && error.ErrorText.Contains("Composite.Generated"))
                {
                    return new CompatibilityCheckResult();
                }
            }

            return new CompatibilityCheckResult(compileResult);
        }


        private static string GetTempFileName(DataTypeDescriptor typeDescriptor)
        {
            string folderPath = PathUtil.Resolve(GlobalSettingsFacade.GeneratedAssembliesDirectory);

            string filePath = Path.Combine(folderPath, typeDescriptor.GetFullInterfaceName() + ".cs");
            if (filePath.Length > 255)
            {
                filePath = Path.Combine(folderPath, typeDescriptor.DataTypeId + ".cs");
            }

            return filePath;
        }

        [SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass")]
        private static string[] GetAppCodeFiles()
        {
            string appCodeFolderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, GlobalSettingsFacade.AppCodeDirectory);

            if (!Directory.Exists(appCodeFolderPath)) return new string[0];

            return Directory.GetFiles(appCodeFolderPath, "*.cs", SearchOption.AllDirectories);
        }
    }
}
