using System;
using System.CodeDom;
using System.Reflection;
using System.CodeDom.Compiler;
using System.Collections.Generic;

using Composite.Data;
using Composite.Data.Types;

using Microsoft.CSharp;


namespace Composite.StandardPlugins.Data.DataProviders.FileSystemDataProvider.Foundation
{
    internal static class FileSystemFileGenerator
    {
        internal static Type GenerateFileSystemFileWithInterface(Type interfaceType)
        {
            CompilerParameters compilerParameters = GenerateCompilerParameters(interfaceType);

            CodeCompileUnit codeCompileUnit = GenerateCodeCompileUnit(interfaceType);

            CSharpCodeProvider compiler = new CSharpCodeProvider();
            CompilerResults compileResult = compiler.CompileAssemblyFromDom(compilerParameters, codeCompileUnit);

            if (compileResult.Errors.Count > 0)
            {
                throw new InvalidOperationException(string.Format("Compilation returned error ({0}: {1}", compileResult.Errors[0].Line, compileResult.Errors[0].ErrorText));
            }

            Type type = compileResult.CompiledAssembly.GetTypes()[0];

            return type;
        }

        private static CompilerParameters GenerateCompilerParameters(Type interfaceType)
        {
            CompilerParameters compilerParameters = new CompilerParameters();

            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = true;

            compilerParameters.ReferencedAssemblies.Add("system.dll");            
            compilerParameters.ReferencedAssemblies.Add(typeof(FileSystemFile).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(IFile).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(typeof(IData).Assembly.Location);
            compilerParameters.ReferencedAssemblies.Add(interfaceType.Assembly.Location);
            return compilerParameters;
        }

        private static CodeCompileUnit GenerateCodeCompileUnit(Type interfaceType)
        {
            CodeNamespace codeNamespace = new CodeNamespace(string.Format("{0}.Generated", typeof(FileSystemFileGenerator).Namespace));
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(string.Format("{0}_{1}", interfaceType.Namespace.Replace('.','_'), interfaceType.Name));
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(FileSystemFile));
            declaration.BaseTypes.Add(interfaceType);
            codeNamespace.Types.Add(declaration);

            CodeCompileUnit codeCompileUnit = new CodeCompileUnit();
            codeCompileUnit.Namespaces.Add(codeNamespace);
            return codeCompileUnit;
        }
    }
}
