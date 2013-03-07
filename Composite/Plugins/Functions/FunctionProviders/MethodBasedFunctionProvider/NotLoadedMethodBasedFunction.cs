using System;
using System.Collections.Generic;
using Composite.Data.Types;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    internal class NotLoadedMethodBasedFunction : MethodBasedFunction, IFunction, IFunctionInitializationInfo
    {
        private readonly string _errorMessage;

        public NotLoadedMethodBasedFunction(IMethodBasedFunctionInfo functionInfo, string errorMessage)
            : base(functionInfo, null, null)
        {
            _errorMessage = errorMessage;
        }

        public override string Description {
            get {
                return _errorMessage;
            }
        }

        object IFunction.Execute(ParameterList parameters, FunctionContextContainer context)
        {
            throw new InvalidOperationException(_errorMessage);
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
