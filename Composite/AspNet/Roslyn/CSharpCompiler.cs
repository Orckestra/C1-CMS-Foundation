using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;

namespace Composite.AspNet.Roslyn
{
    internal class CSharpCompiler : CommonCompiler
    {
        [CompilerGenerated]
        private static Func<SyntaxTree, bool> _treePredicate;

		public CSharpCompiler(CSharpCodeProvider oldProvider) : base(oldProvider)
        {
        }

        internal override SyntaxTree ParseText(string text)
        {
            return CSharpSyntaxTree.ParseText(text);
        }

        internal override SyntaxTree ParseFile(string filename)
        {
            var text = File.ReadAllText(filename);
            return ParseText(text);
        }

        internal override CommonCompilationArguments ArgumentsFromParameters(CompilerParameters parameters, TextWriter outputWriter)
        {
            return new CSharpCompilationArguments(parameters, outputWriter);
        }

        internal override Microsoft.CodeAnalysis.Compilation CreateCompilation(CommonCompilationArguments arguments, IEnumerable<SyntaxTree> syntaxTrees)
        {
            var provider = new DesktopStrongNameProvider(arguments.CmdArguments.KeyFileSearchPaths);
            var cSharpCompilationOptions = ((CSharpCommandLineArguments)arguments.CmdArguments)
                .CompilationOptions
                .WithAssemblyIdentityComparer(DesktopAssemblyIdentityComparer.Default)
                .WithStrongNameProvider(provider);

            return CSharpCompilation.Create(arguments.OutputFileName, 
                syntaxTrees
                .Where(tree => tree != null),
                arguments.MetadataReferences, cSharpCompilationOptions);
        }

        internal override CompilerError CompilerErrorFromDiagnostic(Diagnostic diagnostic, TextWriter consoleOutput)
        {
            string value = CSharpDiagnosticFormatter.Instance.Format(diagnostic, null);
            consoleOutput.WriteLine(value);
            var compilerError = new CompilerError
            {
                IsWarning = diagnostic.Severity == DiagnosticSeverity.Warning && !diagnostic.IsWarningAsError,
                ErrorNumber = diagnostic.Id,
                ErrorText = this.GetErrorNumber(diagnostic)
            };
            switch (diagnostic.Location.Kind)
            {
                case LocationKind.SourceFile:
                case LocationKind.XmlFile:
                    {
                        FileLinePositionSpan lineSpan = diagnostic.Location.GetLineSpan();
                        FileLinePositionSpan mappedLineSpan = diagnostic.Location.GetMappedLineSpan();
                        if (lineSpan.IsValid && mappedLineSpan.IsValid)
                        {
                            if (!mappedLineSpan.HasMappedPath)
                            {
                                compilerError.FileName = lineSpan.Path;
                                compilerError.Line = lineSpan.Span.Start.Line + 1;
                                compilerError.Column = lineSpan.Span.Start.Character + 1;
                            }
                            else
                            {
                                compilerError.FileName = mappedLineSpan.Path;
                                compilerError.Line = mappedLineSpan.Span.Start.Line + 1;
                                compilerError.Column = mappedLineSpan.Span.Start.Character + 1;
                            }
                        }
                        break;
                    }
                case LocationKind.MetadataFile:
                    compilerError.FileName = diagnostic.Location.MetadataModule.Name;
                    break;
            }
            return compilerError;
        }

        internal string GetErrorNumber(Diagnostic diagnostic)
        {
            return $"{(diagnostic.IsWarningAsError ? "Warning as Error: " : "")}{diagnostic.GetMessage(null)}";
        }
    }
}