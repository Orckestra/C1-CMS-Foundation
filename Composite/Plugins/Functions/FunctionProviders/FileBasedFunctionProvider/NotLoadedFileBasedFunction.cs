using System;
using System.Collections.Generic;
using System.Web.Hosting;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal class NotLoadedFileBasedFunction<T> : FileBasedFunction<T>, IFunctionInitializationInfo where T : FileBasedFunction<T>
    {
        private readonly string _virtualPath;
        private readonly Exception _exception;

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
                if (_exception != null)
                {
                    string errorMessage = _exception.Message;

                    if (errorMessage.StartsWith(HostingEnvironment.ApplicationPhysicalPath, StringComparison.OrdinalIgnoreCase))
                    {
                        errorMessage = errorMessage.Substring(HostingEnvironment.ApplicationPhysicalPath.Length - 1);
                    }

                    return errorMessage;
                }

                return base.Description;
            }
        }

        override public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            throw new InvalidOperationException("Function not loaded. Source '{0}'".FormatWith(_virtualPath), _exception);
        }

        Type IMetaFunction.ReturnType
        {
            get { return typeof(void); }
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
