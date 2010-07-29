using System;


namespace Composite.StandardPlugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
	public sealed class FunctionParameterDescriptionAttribute : Attribute
	{
        public FunctionParameterDescriptionAttribute(string parameterName, string parameterLabel, string parameterHelpText)
        {
            this.ParameterName = parameterName;
            this.ParameterLabel = parameterLabel;
            this.ParameterHelpText = parameterHelpText;
            this.HasDefaultValue = false;
        }

        public FunctionParameterDescriptionAttribute(string parameterName, string parameterLabel, string parameterHelpText, object defaultValue)
            : this(parameterName, parameterLabel, parameterHelpText)
        {
            this.DefaultValue = defaultValue;
            this.HasDefaultValue = true;
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


        public string ParameterLabel
        {
            get;
            private set;
        }


        public string ParameterHelpText
        {
            get;
            private set;
        }


        public bool HasDefaultValue
        {
            get;
            private set;
        }
    }
}
