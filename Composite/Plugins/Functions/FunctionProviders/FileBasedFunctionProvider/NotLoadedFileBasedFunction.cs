using System;
using System.Collections.Generic;
using Composite.AspNet.Security;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal class NotLoadedFileBasedFunction: IFunction, IFunctionInitializationInfo
    {
        private string _virtualPath;
        private string _providerName;
        private Exception _exception;

        public NotLoadedFileBasedFunction(
            string providerName, 
            string @namespace, 
            string functionName,
            string virtualPath,
            Exception exception)
        {
            _providerName = providerName;
            Namespace = @namespace;
            Name = functionName;
            _virtualPath = virtualPath;
            _exception = exception;
        }

        object IFunction.Execute(ParameterList parameters, FunctionContextContainer context)
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

        public string Namespace { get; private set; }
        public string Name { get; private set; }
        public string Description { get { return string.Empty; } }

        public EntityToken EntityToken
        {
            get { return new FileBasedFunctionEntityToken(_providerName, String.Join(".", Namespace, Name)); }
        }
    }
}
