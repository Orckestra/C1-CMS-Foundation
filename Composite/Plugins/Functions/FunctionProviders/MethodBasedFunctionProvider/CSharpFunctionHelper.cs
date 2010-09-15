using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.Logging;
using Composite.Data;
using Composite.Data.Types;
using Microsoft.CSharp;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class CreateMethodErrorHandler
    {
        public virtual bool HasErrors { get { return false; } }
        public virtual void OnCompileError(int line, string errorNumber, string message) { }
        public virtual void OnMissingContainerType(string message) { }
        public virtual void OnNamespaceMismatch(string message) { }
        public virtual void OnMissionMethod(string message) { }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class StringCreateMethodErrorHandler : CreateMethodErrorHandler
    {
        bool _hasErrors;

        public StringCreateMethodErrorHandler()
        {
            _hasErrors = false;
            this.CompileErrors = new List<Tuple<int, string, string>>();
        }


        public List<Tuple<int, string, string>> CompileErrors { get; set; }
        public string MissingContainerType { get; set; }
        public string NamespaceMismatch { get; set; }
        public string MissionMethod { get; set; }


        public override bool HasErrors { get { return _hasErrors; } }


        public override void OnCompileError(int line, string errorNumber, string message)
        {
            _hasErrors = true;
            this.CompileErrors.Add(new Tuple<int, string, string>(line, errorNumber, message));
        }


        public override void OnMissingContainerType(string message)
        {
            _hasErrors = true;
            this.MissingContainerType = message;
        }


        public override void OnNamespaceMismatch(string message)
        {
            _hasErrors = true;
            this.NamespaceMismatch = message;
        }


        public override void OnMissionMethod(string message)
        {
            _hasErrors = true;
            this.MissionMethod = message;
        }
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class CSharpFunctionHelper
    {
        public static string MethodClassContainerName { get { return "InlineMethodFunction"; } }


        public static MethodInfo Create(ICSharpFunction function, string code = null, CreateMethodErrorHandler createMethodErrorHandler = null)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                code = GetFunctionCode(function);
            }

            CompilerParameters compilerParameters = new CompilerParameters();
            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = true;
            compilerParameters.ReferencedAssemblies.Add(typeof(System.String).Assembly.Location); // System.dll;
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Linq.Enumerable).Assembly.Location); // System.Core.dll;
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Xml.XmlElement).Assembly.Location); // System.Xml.dll;
            compilerParameters.ReferencedAssemblies.Add(typeof(System.Xml.Linq.XElement).Assembly.Location); // System.Xml.Linq.dll;

            compilerParameters.ReferencedAssemblies.Add(typeof(GlobalInitializerFacade).Assembly.Location); // Composite.dll

            string compositeGeneretedPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "Composite.Generated.dll");
            if (File.Exists(compositeGeneretedPath))
            {
                compilerParameters.ReferencedAssemblies.Add(compositeGeneretedPath); // Composite.Generated.dll
            }

            string compositeWorkflowsPath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "Composite.Workflows.dll");
            if (File.Exists(compositeWorkflowsPath))
            {
                compilerParameters.ReferencedAssemblies.Add(compositeWorkflowsPath); // Composite.Workflows.dll
            }

            IEnumerable<ICSharpFunctionAssemblyReference> assemblyReferences =
                DataFacade.GetData<ICSharpFunctionAssemblyReference>(f => f.Function == function.Id).Evaluate();

            foreach (ICSharpFunctionAssemblyReference assemblyReference in assemblyReferences)
            {
                string assemblyPath = GetAssemblyFullPath(assemblyReference.Name, assemblyReference.Location);
                compilerParameters.ReferencedAssemblies.Add(assemblyPath);
            }


            CSharpCodeProvider compiler = new CSharpCodeProvider();
            CompilerResults results = compiler.CompileAssemblyFromSource(compilerParameters, code);

            if (results.Errors.HasErrors == true)
            {
                foreach (CompilerError error in results.Errors)
                {
                    if (createMethodErrorHandler != null)
                    {
                        createMethodErrorHandler.OnCompileError(error.Line, error.ErrorNumber, error.ErrorText);
                    }
                    else
                    {
                        LoggingService.LogWarning("MethodBasedFunctionProvider", error.ErrorText);
                    }
                }

                return null;
            }


            Type type = results.CompiledAssembly.GetTypes().Where(f => f.Name == MethodClassContainerName).SingleOrDefault();
            if (type == null)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CSharpInlineFunction.OnMissingContainerType"), MethodClassContainerName);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnMissingContainerType(message);
                }
                else
                {
                    LoggingService.LogWarning("MethodBasedFunctionProvider", message);
                }

                return null;
            }

            if (type.Namespace != function.Namespace)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CSharpInlineFunction.OnNamespaceMismatch"), type.Namespace, function.Namespace);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnNamespaceMismatch(message);
                }
                else
                {
                    LoggingService.LogWarning("MethodBasedFunctionProvider", message);
                }

                return null;
            }

            MethodInfo methodInfo = type.GetMethods(BindingFlags.Public | BindingFlags.Static).Where(f => f.Name == function.Name).SingleOrDefault();
            if (methodInfo == null)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CSharpInlineFunction.OnMissionMethod"), function.Name, MethodClassContainerName);

                if (createMethodErrorHandler != null)
                {
                    createMethodErrorHandler.OnMissionMethod(message);
                }
                else
                {
                    LoggingService.LogWarning("MethodBasedFunctionProvider", message);
                }

                return null;
            }

            return methodInfo;
        }



        public static string GetFunctionCode(this ICSharpFunction function)
        {
            string filepath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory), function.CodePath);

            return File.ReadAllText(filepath);
        }



        public static void SetFunctinoCode(this ICSharpFunction function, string content)
        {
            string directoryPath = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);
            if (Directory.Exists(directoryPath) == false)
            {
                Directory.CreateDirectory(directoryPath);
            }

            string filepath = Path.Combine(directoryPath, function.CodePath);

            File.WriteAllText(filepath, content);
        }



        public static void FunctionRenamed(ICSharpFunction newFunction, ICSharpFunction oldFunction)
        {
            newFunction.UpdateCodePath();

            string directoryPath = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);

            string oldFilepath = Path.Combine(directoryPath, oldFunction.CodePath);
            string newFilepath = Path.Combine(directoryPath, newFunction.CodePath);

            File.Move(oldFilepath, newFilepath);
        }



        public static void UpdateCodePath(this ICSharpFunction function)
        {
            function.CodePath = function.Namespace;
            if (string.IsNullOrEmpty(function.CodePath) == false)
            {
                function.CodePath += ".";
            }

            function.CodePath += function.Name + ".cs";
        }



        public static IEnumerable<string> GetReferencableAssemblies()
        {
            string path = Path.GetDirectoryName(typeof(String).Assembly.Location);
            foreach (string file in Directory.GetFiles(path, "System*.dll"))
            {
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "system") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "system.core") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "system.xml") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "system.xml.linq") continue;

                yield return file;
            }

            foreach (string file in Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.BinDirectory), "*.dll"))
            {
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "composite") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "composite.generated") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "composite.website") continue;
                if (Path.GetFileNameWithoutExtension(file).ToLower() == "composite.workflows") continue;

                yield return file;
            }
        }



        public static string GetAssemblyLocation(string fullPath)
        {
            string systemPath = Path.GetDirectoryName(typeof(String).Assembly.Location).ToLower();
            if (fullPath.ToLower().StartsWith(systemPath))
            {
                return "System";
            }

            string binPath = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLower();
            if (fullPath.ToLower().StartsWith(binPath))
            {
                return "Bin";
            }

            throw new NotImplementedException();
        }



        public static string GetAssemblyFullPath(string filename, string location)
        {
            location = location.ToLower();

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
