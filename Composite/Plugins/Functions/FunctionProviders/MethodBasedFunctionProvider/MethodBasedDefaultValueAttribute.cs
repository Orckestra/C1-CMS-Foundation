using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
	internal sealed class MethodBasedDefaultValueAttribute : Attribute
	{
        public MethodBasedDefaultValueAttribute(string parameterName, object defaultValue)
        {
            this.ParameterName = parameterName;
            this.DefaultValue = defaultValue;
        }



        public string ParameterName
        {
            get;
            private set;
        }


        public object DefaultValue
        {
            get;
            private set;
        }
    }
}
