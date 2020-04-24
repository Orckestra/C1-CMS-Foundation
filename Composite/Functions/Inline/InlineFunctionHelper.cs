using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web.Hosting;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_MethodBasedFunctionProviderElementProvider;

namespace Composite.Functions.Inline
{
    /// <summary />
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class InlineFunctionHelper
    {
        private static readonly string LogTitle = typeof(InlineFunctionHelper).Name;

        /// <exclude />
        public static string MethodClassContainerName => "InlineMethodFunction";

        /// <exclude />
        public static MethodInfo Create(IInlineFunction function, string code = null, InlineFunctionCreateMethodErrorHandler createMethodErrorHandler = null, List<string> selectedAssemblies = null)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                try
                {
                    code = GetFunctionCode(function);
                }
                catch (ThreadAbortException)
                {
                }
                catch (Exception ex)
                {
                    if (createMethodErrorHandler != null)
                    {
                        createMethodErrorHandler.OnLoadSourceError(ex);
                    }
                    else
                    {
                        LogMessageIfNotShuttingDown(function, ex.Message);
                    }
                    return null;
                }
            }

            var compilerParameters = new CompilerParameters
            {
                GenerateExecutable = false,
                GenerateInMemory = true
            };

            if (selectedAssemblies == null)
            {
                IEnumerable<IInlineFunctionAssemblyReference> assemblyReferences = DataFacade.GetData<IInlineFunctionAssemblyReference>(f => f.Function == function.Id).Evaluate();

                foreach (var assemblyReference in assemblyReferences)
                {
                    var assemblyPath = GetAssemblyFullPath(assemblyReference.Name, assemblyReference.Location);

                    compilerParameters.ReferencedAssemblies.Add(assemblyPath);
                }
            }
            else
            {
                foreach (var reference in selectedAssemblies)
                {
                    compilerParameters.ReferencedAssemblies.Add(reference);
                }
            }

            var appCodeAssembly = AssemblyFacade.GetAppCodeAssembly();
            if (appCodeAssembly != null)
            {
                compilerParameters.ReferencedAssemblies.Add(appCodeAssembly.Location);
            }

            var compiler = CSharpCodeProviderFactory.CreateCompiler();

            var results = compiler.CompileAssemblyFromSource(compilerParameters, code);
            if (results.Errors.HasErrors)
            {
                foreach (CompilerError error in results.Errors)
                {
                    if (createMethodErrorHandler != null)
                    {
                        createMethodErrorHandler.OnCompileError(error.Line, error.ErrorNumber, error.ErrorText);
                    }
                    else
                    {
                        LogMessageIfNotShuttingDown(function, error.ErrorText);
                    }
                }

                return null;
            }

            var type = results.CompiledAssembly.GetTypes().SingleOrDefault(f => f.Name == MethodClassContainerName);
            if (type == null)
            {
                var message = Texts.CSharpInlineFunction_OnMissingContainerType(MethodClassContainerName);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnMissingContainerType(message);
                }
                else
                {
                    LogMessageIfNotShuttingDown(function, message);
                }

                return null;
            }

            if (type.Namespace != function.Namespace)
            {
                var message = Texts.CSharpInlineFunction_OnNamespaceMismatch(type.Namespace, function.Namespace);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnNamespaceMismatch(message);
                }
                else
                {
                    LogMessageIfNotShuttingDown(function, message);
                }

                return null;
            }

            var methodInfo = type.GetMethods(BindingFlags.Public | BindingFlags.Static).SingleOrDefault(f => f.Name == function.Name);
            if (methodInfo == null)
            {
                var message = Texts.CSharpInlineFunction_OnMissionMethod(function.Name, MethodClassContainerName);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnMissionMethod(message);
                }
                else
                {
                    LogMessageIfNotShuttingDown(function, message);
                }

                return null;
            }

            return methodInfo;
        }

        private static void LogMessageIfNotShuttingDown(IInlineFunction function, string message)
        {
            if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
            {
                Log.LogWarning(LogTitle, $"{function.Namespace}.{function.Name} : {message}");
            }
        }

        /// <exclude />
        public static IEnumerable<string> DefaultAssemblies
        {
            get
            {
                var systemPath = Path.GetDirectoryName(typeof(String).Assembly.Location);

                yield return Path.Combine(systemPath, "System.dll");
                yield return Path.Combine(systemPath, "System.Core.dll");
                yield return Path.Combine(systemPath, "System.Xml.dll");
                yield return Path.Combine(systemPath, "System.Xml.Linq.dll");
                yield return Path.Combine(systemPath, "System.Web.dll");

                yield return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "Composite.dll");

                var compositeGeneretedPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "Composite.Generated.dll");
                if (C1File.Exists(compositeGeneretedPath))
                {
                    yield return compositeGeneretedPath;
                }

                var compositeWorkflowsPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "Composite.Workflows.dll");
                if (C1File.Exists(compositeWorkflowsPath))
                {
                    yield return compositeWorkflowsPath;
                }
            }
        }

        internal static string GetSourceFilePath(this IInlineFunction function)
        {
            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory), function.CodePath);
        }

        /// <exclude />
        public static string GetFunctionCode(this IInlineFunction function)
        {
            var filepath = GetSourceFilePath(function);

            // Making 5 attempts to read the file
            for (var i = 5; i > 0; i--)
            {
                try
                {
                    return C1File.ReadAllText(filepath);
                }
                catch (FileNotFoundException)
                {
                    throw;
                }
                catch (IOException)
                {
                    if (i == 1) throw;

                    Thread.Sleep(100);
                }
            }
            throw new InvalidOperationException("This line should not be reachable");
        }

        /// <exclude />
        public static void DeleteFunctionCode(this IInlineFunction function)
        {
            var filepath = GetSourceFilePath(function);

            FileUtils.Delete(filepath);
        }

        /// <exclude />
        public static void SetFunctionCode(this IInlineFunction function, string content)
        {
            var directoryPath = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);
            if (C1Directory.Exists(directoryPath) == false)
            {
                C1Directory.CreateDirectory(directoryPath);
            }

            var filepath = Path.Combine(directoryPath, function.CodePath);

            C1File.WriteAllText(filepath, content);
        }

        /// <exclude />
        public static void FunctionRenamed(IInlineFunction newFunction, IInlineFunction oldFunction)
        {
            newFunction.UpdateCodePath();

            var directoryPath = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);

            var oldFilepath = Path.Combine(directoryPath, oldFunction.CodePath);
            var newFilepath = Path.Combine(directoryPath, newFunction.CodePath);

            C1File.Move(oldFilepath, newFilepath);
        }

        /// <exclude />
        public static void UpdateCodePath(this IInlineFunction function)
        {
            function.CodePath = function.Namespace;
            if (string.IsNullOrEmpty(function.CodePath) == false)
            {
                function.CodePath += ".";
            }

            function.CodePath += function.Name + ".cs";
        }

        /// <exclude />
        public static IEnumerable<string> GetReferencableAssemblies()
        {
            var path = Path.GetDirectoryName(typeof(String).Assembly.Location);
            foreach (var file in Directory.GetFiles(path, "System*.dll"))
            {
                yield return file;
            }

            foreach (var file in AssemblyFacade.GetAssembliesFromBin(true))
            {
                yield return file;
            }
        }

        /// <exclude />
        public static string GetAssemblyLocation(string fullPath)
        {
            var systemPath = Path.GetDirectoryName(typeof(String).Assembly.Location).ToLowerInvariant();
            if (fullPath.ToLowerInvariant().StartsWith(systemPath))
            {
                return "System";
            }


            var binPath = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLowerInvariant();
            if (fullPath.ToLowerInvariant().StartsWith(binPath))
            {
                return "Bin";
            }

            throw new NotImplementedException();
        }

        /// <exclude />
        public static string GetAssemblyFullPath(string filename, string location)
        {
            location = location.ToLowerInvariant();

            switch (location)
            {
                case "system":
                    return Path.Combine(Path.GetDirectoryName(typeof(String).Assembly.Location), filename);

                case "bin":
                    return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), filename);

                default:
                    throw new NotImplementedException();
            }
        }
    }
}

