using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Emit;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Security.Permissions;
using System.Text;
using System.Threading;

namespace Composite.AspNet.Roslyn
{
    internal abstract class CommonCompiler : ICodeCompiler
    {
        private const int Failed = 1;

        private const int Succeeded = 0;

        protected readonly CodeDomProvider _oldProvider;

        private readonly HashSet<Diagnostic> reportedDiagnostics = new HashSet<Diagnostic>();

        private static readonly string CompilerErrorMessageFormat = "{0}({1},{2}): error {3}: {4}";

        public CommonCompiler(CodeDomProvider oldProvider)
        {
            this._oldProvider = oldProvider;
        }

        internal abstract SyntaxTree ParseText(string text);

        internal abstract SyntaxTree ParseFile(string file);

        internal abstract Compilation CreateCompilation(CommonCompilationArguments arguments, IEnumerable<SyntaxTree> syntaxTrees);

        internal Compilation CreateCompilation(CommonCompilationArguments arguments, IEnumerable<SyntaxTree> syntaxTrees, TextWriter outputWriter)
        {
            Compilation result;
            try
            {
                result = this.CreateCompilation(arguments, syntaxTrees);
            }
            catch (Exception ex)
            {
                if (outputWriter != null)
                {
                    outputWriter.WriteLine(CommonCompiler.GetErrorOutput(null, string.Format(Res.Internal_Compiler_Error, ex.Message)));
                }
                result = null;
            }
            return result;
        }

        internal abstract CommonCompilationArguments ArgumentsFromParameters(CompilerParameters parameters, TextWriter outputWriter);

        internal CommonCompilationArguments ArgumentsFromParametersNoThrow(CompilerParameters parameters, TextWriter outputWriter)
        {
            CommonCompilationArguments result;
            try
            {
                result = this.ArgumentsFromParameters(parameters, outputWriter);
            }
            catch (Exception ex)
            {
                if (outputWriter != null)
                {
                    outputWriter.WriteLine(CommonCompiler.GetErrorOutput(null, string.Format(Res.Internal_Compiler_Error, ex.Message)));
                }
                result = null;
            }
            return result;
        }

        public CompilerResults CompileAssemblyFromDom(CompilerParameters parameters, CodeCompileUnit compilationUnit)
        {
            return this.CompileAssemblyFromDomBatch(parameters, new CodeCompileUnit[]
            {
                compilationUnit
            });
        }

        public CompilerResults CompileAssemblyFromDomBatch(CompilerParameters parameters, CodeCompileUnit[] compilationUnits)
        {
            Func<CodeCompileUnit, SyntaxTree> func = null;
            CompilerResults result;
            try
            {
                if (func == null)
                {
                    func = c =>
                    {
                        var stringWriter = new StringWriter();
                        this._oldProvider.GenerateCodeFromCompileUnit(c, stringWriter, new CodeGeneratorOptions());
                        return this.ParseText(stringWriter.ToString());
                    };
                }
                IEnumerable<SyntaxTree> syntaxTrees = compilationUnits.Select(func);
                result = this.Compile(parameters, syntaxTrees);
            }
            finally
            {
                parameters.TempFiles.Delete();
            }
            return result;
        }

        public CompilerResults CompileAssemblyFromFile(CompilerParameters parameters, string fileName)
        {
            return this.CompileAssemblyFromFileBatch(parameters, new string[]
            {
                fileName
            });
        }

        public CompilerResults CompileAssemblyFromFileBatch(CompilerParameters parameters, string[] fileNames)
        {
            Func<string, SyntaxTree> func = null;
            CompilerResults result;
            try
            {
                if (func == null)
                {
                    func = ParseFile;
                }
                result = this.Compile(parameters, fileNames.Select(func));
            }
            finally
            {
                parameters.TempFiles.Delete();
            }
            return result;
        }

        public CompilerResults CompileAssemblyFromSource(CompilerParameters parameters, string source)
        {
            return this.CompileAssemblyFromSourceBatch(parameters, new string[]
            {
                source
            });
        }

        public CompilerResults CompileAssemblyFromSourceBatch(CompilerParameters parameters, string[] sources)
        {
            Func<string, SyntaxTree> func = null;
            CompilerResults result;
            try
            {
                if (func == null)
                {
                    func = ParseText;
                }
                result = this.Compile(parameters, sources.Select(func));
            }
            finally
            {
                parameters.TempFiles.Delete();
            }
            return result;
        }

        internal CompilerResults Compile(CompilerParameters parameters, IEnumerable<SyntaxTree> syntaxTrees)
        {
            CompilerResults result;
            using (StringWriter stringWriter = new StringWriter(CultureInfo.InvariantCulture))
            {
                CompilerResults compilerResults = this.Compile(parameters, syntaxTrees, stringWriter);
                using (StringReader stringReader = new StringReader(stringWriter.ToString()))
                {
                    string[] array = CommonCompiler.ReadAllLines(stringReader, Encoding.UTF8);
                    string[] array2 = array;
                    for (int i = 0; i < array2.Length; i++)
                    {
                        string value = array2[i];
                        compilerResults.Output.Add(value);
                    }
                }
                result = compilerResults;
            }
            return result;
        }

        internal CompilerResults Compile(CompilerParameters parameters, IEnumerable<SyntaxTree> syntaxTrees, TextWriter outputWriter)
        {
            CompilerResults compilerResults = new CompilerResults(parameters.TempFiles);
            compilerResults.NativeCompilerReturnValue = 1;
            CommonCompilationArguments commonCompilationArguments = this.ArgumentsFromParametersNoThrow(parameters, outputWriter);
            if (commonCompilationArguments == null)
            {
                return compilerResults;
            }
            if (commonCompilationArguments.CmdArguments.DisplayLogo)
            {
                this.PrintLogo(outputWriter);
            }
            if (commonCompilationArguments.CmdArguments.DisplayHelp)
            {
                this.PrintHelp(outputWriter);
                return null;
            }
            if (this.ErrorInDiagnostics(commonCompilationArguments.CmdArguments.Errors, compilerResults, outputWriter))
            {
                return compilerResults;
            }
            Compilation compilation = this.CreateCompilation(commonCompilationArguments, syntaxTrees, outputWriter);
            if (compilation == null 
                || this.ErrorInDiagnostics(compilation.GetParseDiagnostics(default(CancellationToken)), compilerResults, outputWriter) 
                || this.ErrorInDiagnostics(compilation.GetDeclarationDiagnostics(default(CancellationToken)), compilerResults, outputWriter))
            {
                return compilerResults;
            }
            SecurityPermission securityPermission = new SecurityPermission(SecurityPermissionFlag.ControlEvidence);
            securityPermission.Assert();
            try
            {
                compilerResults.Evidence = parameters.Evidence;
            }
            finally
            {
                CodeAccessPermission.RevertAssert();
            }
            bool flag = false;
            MemoryStream outputStream = new MemoryStream();
            MemoryStream pdbStream = null;
            if (commonCompilationArguments.FinalPdbFilePath != null)
            {
                pdbStream = new MemoryStream();
            }
            CompilerResults result;
            using (outputStream)
            {
                using (pdbStream)
                {
                    try
                    {
                        FileStream documentationStream = null;
                        string documentationPath = commonCompilationArguments.CmdArguments.DocumentationPath;
                        if (documentationPath != null)
                        {
                            documentationStream = OpenFile(documentationPath, outputWriter, FileMode.OpenOrCreate, FileAccess.Write, FileShare.Read | FileShare.Write | FileShare.Delete);
                            if (documentationStream == null)
                            {
                                result = compilerResults;
                                return result;
                            }
                            documentationStream.SetLength(0L);
                        }
                        Stream win32resourceFileStream = null;
                        if (!string.IsNullOrWhiteSpace(commonCompilationArguments.Win32ResourceFile))
                        {
                            win32resourceFileStream = OpenFile(commonCompilationArguments.Win32ResourceFile, outputWriter, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
                        }
                        EmitResult emitResult;
                        using (win32resourceFileStream)
                        {
                            using (documentationStream)
                            {
                                //// Obsolete
                                //emitResult = compilation.Emit(outputStream,
                                //    commonCompilationArguments.OutputFileName,
                                //    commonCompilationArguments.FinalPdbFilePath,
                                //    pdbStream, documentationStream, default(CancellationToken),
                                //    win32resourceFileStream, commonCompilationArguments.CmdArguments.ManifestResources);

                                //var emitOptions = new EmitOptions();

                                emitResult = compilation.Emit(outputStream,
                                    pdbStream,
                                    null,
                                    win32resourceFileStream,
                                    commonCompilationArguments.CmdArguments.ManifestResources,
                                    null,
                                    null);
                            }
                        }
                        if (this.ErrorInDiagnostics(emitResult.Diagnostics, compilerResults, outputWriter))
                        {
                            result = compilerResults;
                        }
                        else
                        {
                            if (!parameters.GenerateInMemory)
                            {
                                if (!CommonCompiler.WriteMemoryStreamToFile(outputStream, commonCompilationArguments.FinalOutputPath, outputWriter))
                                {
                                    flag = true;
                                    result = compilerResults;
                                    return result;
                                }
                                if (commonCompilationArguments.FinalPdbFilePath != null && !CommonCompiler.WriteMemoryStreamToFile(pdbStream, commonCompilationArguments.FinalPdbFilePath, outputWriter))
                                {
                                    flag = true;
                                    result = compilerResults;
                                    return result;
                                }
                                compilerResults.PathToAssembly = parameters.OutputAssembly;
                            }
                            else
                            {
                                byte[] rawAssembly = outputStream.ToArray();
                                byte[] rawSymbolStore = null;
                                if (pdbStream != null)
                                {
                                    try
                                    {
                                        rawSymbolStore = pdbStream.ToArray();
                                    }
                                    catch
                                    {
                                    }
                                }
                                SecurityPermission securityPermission2 = new SecurityPermission(SecurityPermissionFlag.ControlEvidence);
                                securityPermission2.Assert();
                                try
                                {
                                    compilerResults.CompiledAssembly = Assembly.Load(rawAssembly, rawSymbolStore, parameters.Evidence);
                                }
                                finally
                                {
                                    CodeAccessPermission.RevertAssert();
                                }
                                compilerResults.CompiledAssembly = Assembly.Load(rawAssembly, rawSymbolStore);
                            }
                            compilerResults.NativeCompilerReturnValue = 0;
                            result = compilerResults;
                        }
                    }
                    finally
                    {
                        if (flag)
                        {
                            if (commonCompilationArguments.FinalOutputPath != null)
                            {
                                CommonCompiler.TryDeleteFile(commonCompilationArguments.FinalOutputPath);
                            }
                            if (commonCompilationArguments.FinalPdbFilePath != null)
                            {
                                CommonCompiler.TryDeleteFile(commonCompilationArguments.FinalPdbFilePath);
                            }
                        }
                    }
                }
            }
            return result;
        }

        private static bool WriteMemoryStreamToFile(MemoryStream memoryStream, string filename, TextWriter outputWriter)
        {
            bool result;
            using (FileStream fileStream = CommonCompiler.CreateFile(filename, outputWriter))
            {
                if (fileStream == null)
                {
                    result = false;
                }
                else
                {
                    memoryStream.Position = 0L;
                    memoryStream.CopyTo(fileStream);
                    result = true;
                }
            }
            return result;
        }

        internal static string[] ReadAllLines(StringReader stringReader, Encoding encoding)
        {
            List<string> list = new List<string>();
            string item;
            while ((item = stringReader.ReadLine()) != null)
            {
                list.Add(item);
            }
            return list.ToArray();
        }

        internal void PrintHelp(TextWriter outputWriter)
        {
            throw new NotImplementedException();
        }

        internal void PrintLogo(TextWriter outputWriter)
        {
            outputWriter.WriteLine(Res.Product_Name);
            outputWriter.WriteLine(Res.Copyright);
            outputWriter.WriteLine();
        }

        internal bool ErrorInDiagnostics(IEnumerable<Diagnostic> diagnostics, CompilerResults results, TextWriter consoleOutput)
        {
            bool result = false;
            foreach (Diagnostic current in diagnostics)
            {
                if (!this.reportedDiagnostics.Contains(current) 
                    && current.Severity != DiagnosticSeverity.Info
                    && current.Severity != DiagnosticSeverity.Hidden)
                {
                    this.reportedDiagnostics.Add(current);
                    if (current.Severity == DiagnosticSeverity.Error || current.IsWarningAsError)
                    {
                        result = true;
                        results.NativeCompilerReturnValue = 1;
                    }
                    CompilerError compilerError = this.CompilerErrorFromDiagnostic(current, consoleOutput);
                    if (compilerError != null)
                    {
                        results.Errors.Add(compilerError);
                    }
                }
            }
            return result;
        }

        internal abstract CompilerError CompilerErrorFromDiagnostic(Diagnostic diagnostic, TextWriter consoleOutput);

        internal static string GetErrorOutput(string errorNumber, string errorText)
        {
            return CommonCompiler.GetErrorOutput(null, 0, 0, errorNumber, errorText);
        }

        internal static string GetErrorOutput(string filename = null, int line = 0, int column = 0, string errorNumber = null, string errorText = null)
        {
            return string.Format(CommonCompiler.CompilerErrorMessageFormat, new object[]
            {
                filename,
                line,
                column,
                errorNumber,
                errorText
            });
        }

        internal static FileStream OpenFile(string filePath, TextWriter outputWriter, FileMode mode = FileMode.Open, FileAccess access = FileAccess.ReadWrite, FileShare share = FileShare.None)
        {
            FileStream result;
            try
            {
                result = File.Open(filePath, mode, access, share);
            }
            catch (Exception ex)
            {
                outputWriter?.WriteLine(GetErrorOutput(null, string.Format(Res.Compiler_Failed_To_Open_File, filePath, ex.Message)));
                result = null;
            }
            return result;
        }

        internal static FileStream CreateFile(string filePath, TextWriter outputWriter)
        {
            FileStream result;
            try
            {
                result = File.Create(filePath, 1024);
            }
            catch (Exception ex)
            {
                outputWriter?.WriteLine(CommonCompiler.GetErrorOutput(null, string.Format(Res.Compiler_Failed_To_Create_File, filePath, ex.Message)));
                result = null;
            }
            return result;
        }

        internal static bool TryDeleteFile(string filePath)
        {
            bool result;
            try
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                result = true;
            }
            catch
            {
                result = false;
            }
            return result;
        }
    }
}
