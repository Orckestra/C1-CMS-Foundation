using System;

namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
	public sealed class MethodBasedDefaultValueAttribute : Attribute
    {
        /// <exclude />
        public MethodBasedDefaultValueAttribute(string parameterName, object defaultValue)
        {
            this.ParameterName = parameterName;
            this.DefaultValue = defaultValue;
        }

        /// <exclude />
        public string ParameterName
        {
            get;
            private set;
        }

        /// <exclude />
        public object DefaultValue
        {
            get;
            private set;
        }
    }
}
