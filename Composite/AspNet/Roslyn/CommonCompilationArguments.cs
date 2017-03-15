using Microsoft.CodeAnalysis;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Runtime.CompilerServices;

namespace Composite.AspNet.Roslyn
{
    internal abstract class CommonCompilationArguments
    {
        private CommandLineArguments cmdArguments;

        private string outputFileName;

        private string outputFileDirectory;

        internal string FinalOutputPath;

        internal string FinalPdbFilePath;

        internal string Win32ResourceFile;

		internal CommandLineArguments CmdArguments => this.cmdArguments;

        internal List<MetadataReference> MetadataReferences
        {
            get;
            set;
        }

        internal string OutputFileName => this.outputFileName;

        internal string OutputFileDirectory => this.outputFileDirectory;

        internal CommonCompilationArguments(CompilerParameters parameters, CommandLineArguments cmdArguments)
        {
            this.cmdArguments = cmdArguments;
            this.MetadataReferences = new List<MetadataReference>();
            ImmutableArray<CommandLineReference>.Enumerator enumerator = this.CmdArguments.MetadataReferences.GetEnumerator();
            while (enumerator.MoveNext())
            {
                CommandLineReference current = enumerator.Current;
                string reference = current.Reference;
                string text = this.ResolveReference(this.CmdArguments, reference);
                if (text == null)
                {
                    throw new ArgumentException(string.Format(Res.Cannot_Resolve_Reference, reference));
                }
                var cache = AssemblyMetadataCache.GetInstance();

                var assemblyMetadata = cache.GetOrAdd(text, AssemblyMetadata.CreateFromFile);
                this.MetadataReferences.Add(assemblyMetadata.GetReference());
            }
            this.ParseOutputFile(parameters.OutputAssembly, this.CmdArguments.BaseDirectory, out this.outputFileName, out this.outputFileDirectory);
            this.FinalOutputPath = Path.Combine(this.OutputFileDirectory, this.OutputFileName);
            if (parameters.IncludeDebugInformation)
            {
                this.FinalPdbFilePath = (this.CmdArguments.PdbPath ?? Path.ChangeExtension(this.FinalOutputPath, ".pdb"));
            }
            string win32ResourceFile = this.CmdArguments.Win32ResourceFile;
            if (!string.IsNullOrWhiteSpace(win32ResourceFile))
            {
                this.Win32ResourceFile = Path.Combine(this.CmdArguments.BaseDirectory, win32ResourceFile);
            }
        }

        //private MetadataReference CreateMetaDataReference(AssemblyMetadata assemblyMetadata)
        //{
        //    // Obsolete: new MetadataImageReference(assemblyMetadata, null, default(ImmutableArray<string>), false, null, null)

        //    var properties = new MetadataReferenceProperties();
        //    DocumentationProvider documentationProvider = null;
        //    string filePath = null;
        //    string display = null;

        //    var type = typeof (MetadataReference).Assembly.GetType("Microsoft.CodeAnalysis.MetadataImageReference");
        //    var constructor = type.GetConstructors(BindingFlags.NonPublic).First();
        //    return (MetadataReference) constructor.Invoke(new object[] {assemblyMetadata, properties, documentationProvider, filePath, display});
        //}

        private string ResolveReference(CommandLineArguments arguments, string reference)
        {
            string path = Path.Combine(arguments.BaseDirectory, reference);
            if (File.Exists(path))
            {
                return Path.GetFullPath(path);
            }
            ImmutableArray<string>.Enumerator enumerator = arguments.ReferencePaths.GetEnumerator();
            while (enumerator.MoveNext())
            {
                string current = enumerator.Current;
                path = Path.Combine(current, reference);
                if (File.Exists(path))
                {
                    return Path.GetFullPath(path);
                }
            }
            return null;
        }

        internal void ParseOutputFile(string value, string baseDirectory, out string outputFileName, out string outputDirectory)
        {
            outputFileName = null;
            outputDirectory = null;
            string arg = null;
            string unquoted = CompilationUtil.RemoveAllQuotes(value);
            CompilationUtil.ParseAndNormalizeFile(unquoted, baseDirectory, out outputFileName, out outputDirectory, out arg);
            if (outputFileName == null)
            {
                outputFileName = null;
                outputDirectory = baseDirectory;
                throw new InvalidDataException(string.Format(Res.Cannot_Resolve_Path, arg));
            }
        }

        internal static void FixTreatWarningsAsErrors(CompilerParameters parameters, Type codeDomProviderType)
        {
            parameters.TreatWarningsAsErrors = false;
        }
    }
}
