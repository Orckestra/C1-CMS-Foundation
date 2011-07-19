using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Functions.Inline
{
    internal class NotLoadedInlineFunction : IFunction, IFunctionInitializationInfo
    {
        private IInlineFunction _function;

        private readonly string _errorMessage;

        public NotLoadedInlineFunction(IInlineFunction functionInfo, string errorMessage)
        {
            _function = functionInfo;
            _errorMessage = errorMessage;
        }

        object IFunction.Execute(ParameterList parameters, FunctionContextContainer context)
        {
            throw new InvalidOperationException(_errorMessage);
        }

        public string Name
        {
            get { return _function.Name; }
        }


        public string Namespace
        {
            get { return _function.Namespace; }
        }

        public string Description
        {
            get
            {
                return _function.Description;
            }
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


        public C1Console.Security.EntityToken EntityToken
        {
            get { return _function.GetDataEntityToken(); }
        }
    }
}
