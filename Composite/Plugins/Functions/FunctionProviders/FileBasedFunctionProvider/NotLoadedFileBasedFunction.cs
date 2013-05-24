using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Hosting;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal class NotLoadedFileBasedFunction<T> : FileBasedFunction<T>, IFunctionInitializationInfo where T : FileBasedFunction<T>
    {
        private readonly string _virtualPath;
        private readonly Exception _exception;

        private string[] _sourceCode;

        public NotLoadedFileBasedFunction(
            FileBasedFunctionProvider<T> provider,
            string @namespace, 
            string functionName,
            string virtualPath,
            Exception exception): 
            base(@namespace, functionName, string.Empty, null, typeof(void), virtualPath, provider)
        {
            _virtualPath = virtualPath;
            _exception = exception;
        }

        public override string Description {
            get {
                return  (_exception != null) ? RemoveApplicationPath(_exception.Message) : base.Description;
            }
        }

        private static string RemoveApplicationPath(string compilationErrorMessage)
        {
            if (compilationErrorMessage.StartsWith(HostingEnvironment.ApplicationPhysicalPath, StringComparison.OrdinalIgnoreCase))
            {
                return compilationErrorMessage.Substring(HostingEnvironment.ApplicationPhysicalPath.Length - 1);
            }

            return compilationErrorMessage;
        }

        override public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (!(_exception is HttpCompileException))
            {
                throw _exception;
            }
            
            var compilationErrors = (_exception as HttpCompileException).Results.Errors;
            if (compilationErrors.HasErrors)
            {
                var firstError = compilationErrors[0];

                if (_sourceCode == null && string.Equals(firstError.FileName, PathUtil.Resolve(_virtualPath), StringComparison.OrdinalIgnoreCase))
                {
                    _sourceCode = C1File.ReadAllLines(firstError.FileName);
                }
                else
                {
                    _sourceCode = new string[0];
                }

                if (_sourceCode.Length > 0)
                {
                    XhtmlErrorFormatter.EmbedSouceCodeInformation(_exception, _sourceCode, firstError.Line);
                }
            }

            throw _exception;
        }

        Type IMetaFunction.ReturnType
        {
            get { return typeof(void); }
        }

        protected override void InitializeParameters()
        {
            Parameters = new Dictionary<string, FunctionParameter>();
        }

        IEnumerable<ParameterProfile> IMetaFunction.ParameterProfiles
        {
            get
            {
                return new ParameterProfile[0];
            }
        }

        bool IFunctionInitializationInfo.FunctionInitializedCorrectly
        {
            get { return false; }
        }
    }
}
