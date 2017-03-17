using Microsoft.CodeAnalysis.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Composite.AspNet.Roslyn
{
    internal class CSharpCompilationArguments : CommonCompilationArguments
    {
		internal CSharpCompilationArguments(CompilerParameters parameters, TextWriter outputWriter) : this(CSharpCompilationArguments.CorrectedParamaters(parameters), true, outputWriter)
        {
        }

        private CSharpCompilationArguments(CompilerParameters parameters, bool corrected, TextWriter outputWriter) : base(parameters, CSharpCompilationArguments.BuildCommandLineArguments(parameters, outputWriter))
        {
        }

        private static CompilerParameters CorrectedParamaters(CompilerParameters parameters)
        {
            if (parameters.OutputAssembly == null)
            {
                string fileName = Path.GetFileName(parameters.TempFiles.BasePath);
                string str = parameters.GenerateExecutable ? ".exe" : ".dll";
                parameters.OutputAssembly = "OutputAssembly_" + fileName + str;
            }
            Type typeFromHandle = typeof(CSharpCodeProvider);
            CommonCompilationArguments.FixTreatWarningsAsErrors(parameters, typeFromHandle);
            return parameters;
        }

        private static CSharpCommandLineArguments BuildCommandLineArguments(CompilerParameters parameters, TextWriter outputWriter)
        {
            IEnumerable<string> enumerable = CSharpCompilationArguments.BuildCommandLineArgArray(parameters);
            outputWriter.Write(Res.Compilation_Arguments);
            foreach (string current in enumerable)
            {
                outputWriter.Write(current + " ");
            }
            outputWriter.WriteLine();
            enumerable = enumerable.Concat(new string[]
            {
                "SuppressNoSourceFileSpecifiedWarning"
            });
            string currentDirectory = Environment.CurrentDirectory;
            string environmentVariable = Environment.GetEnvironmentVariable("LIB");
            CSharpCommandLineParser @default = CSharpCommandLineParser.Default;
            return @default.Parse(enumerable, currentDirectory, environmentVariable);
        }

        private static IEnumerable<string> BuildCommandLineArgArray(CompilerParameters parameters)
        {
            string text = CSharpCompilationArguments.BuildCommandLineArgString(parameters);
            char[] array = text.ToCharArray();
            bool flag = false;
            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] == '"')
                {
                    flag = !flag;
                }
                if (!flag && array[i] == ' ')
                {
                    array[i] = '\n';
                }
            }
            IEnumerable<string> lines = new string(array).Split('\n');
            return lines.Where(str => !string.IsNullOrWhiteSpace(str));
        }

        private static string BuildCommandLineArgString(CompilerParameters parameters)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (parameters.GenerateExecutable)
            {
                stringBuilder.Append("/t:exe ");
                if (parameters.MainClass != null && parameters.MainClass.Length > 0)
                {
                    stringBuilder.Append("/main:");
                    stringBuilder.Append(parameters.MainClass);
                    stringBuilder.Append(" ");
                }
            }
            else
            {
                stringBuilder.Append("/t:library ");
            }
            stringBuilder.Append("/utf8output ");
            string location = typeof(object).Assembly.Location;
            string text = parameters.CoreAssemblyFileName;
            if (string.IsNullOrWhiteSpace(text))
            {
                text = location;
            }
            if (!string.IsNullOrWhiteSpace(text))
            {
                stringBuilder.Append("/nostdlib+ ");
                stringBuilder.Append("/R:\"").Append(text.Trim()).Append("\" ");
            }
            string text2 = null;
            try
            {
                Assembly assembly = Assembly.Load("System.Runtime, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a");
                text2 = assembly.Location;
            }
            catch
            {
            }
            if (text2 != null)
            {
                stringBuilder.Append($"/R:\"{text2}\" ");
            }
            foreach (string current in parameters.ReferencedAssemblies)
            {
                stringBuilder.Append("/R:");
                stringBuilder.Append("\"");
                stringBuilder.Append(current);
                stringBuilder.Append("\"");
                stringBuilder.Append(" ");
            }
            stringBuilder.Append("/out:");
            stringBuilder.Append("\"");
            stringBuilder.Append(parameters.OutputAssembly);
            stringBuilder.Append("\"");
            stringBuilder.Append(" ");
            if (parameters.IncludeDebugInformation)
            {
                stringBuilder.Append("/D:DEBUG ");
                stringBuilder.Append("/debug+ ");
                stringBuilder.Append("/optimize- ");
            }
            else
            {
                stringBuilder.Append("/debug- ");
                stringBuilder.Append("/optimize+ ");
            }
            if (parameters.Win32Resource != null)
            {
                stringBuilder.Append("/win32res:\"" + parameters.Win32Resource + "\" ");
            }
            foreach (string current2 in parameters.EmbeddedResources)
            {
                stringBuilder.Append("/res:\"");
                stringBuilder.Append(current2);
                stringBuilder.Append("\" ");
            }
            foreach (string current3 in parameters.LinkedResources)
            {
                stringBuilder.Append("/linkres:\"");
                stringBuilder.Append(current3);
                stringBuilder.Append("\" ");
            }
            if (parameters.TreatWarningsAsErrors)
            {
                stringBuilder.Append("/warnaserror+ ");
            }
            else
            {
                stringBuilder.Append("/warnaserror- ");
            }
            if (parameters.WarningLevel >= 0)
            {
                stringBuilder.Append("/w:" + parameters.WarningLevel + " ");
            }
            if (parameters.CompilerOptions != null)
            {
                stringBuilder.Append(parameters.CompilerOptions + " ");
            }
            return stringBuilder.ToString();
        }
    }
}
