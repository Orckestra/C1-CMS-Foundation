using System;


namespace Composite.Functions
{
    /// <summary>
    /// Add information about parameters to functions callable via the "C# Function" feature. 
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
	public sealed class FunctionParameterDescriptionAttribute : Attribute
	{
        /// <summary>
        /// Describe a function parameter for use in the C1 Function system.
        /// </summary>
        /// <param name="parameterName">The programmatic name of the parameter</param>
        /// <param name="parameterLabel">Human readable label</param>
        /// <param name="parameterHelpText">Human readable help text</param>
        public FunctionParameterDescriptionAttribute(string parameterName, string parameterLabel, string parameterHelpText)
        {
            this.ParameterName = parameterName;
            this.ParameterLabel = parameterLabel;
            this.ParameterHelpText = parameterHelpText;
            this.HasDefaultValue = false;
        }

        /// <summary>
        /// Describe a function parameter for use in the C1 Function system.
        /// </summary>
        /// <param name="parameterName">The programmatic name of the parameter</param>
        /// <param name="parameterLabel">Human readable label</param>
        /// <param name="parameterHelpText">Human readable help text</param>
        /// <param name="defaultValue">Optional. Default value that should be assigned to the parameter if not specified by the caller. You can use 'null' for complex objects that can not be expressed in attribute code and the check for null in the code.</param>
        public FunctionParameterDescriptionAttribute(string parameterName, string parameterLabel, string parameterHelpText, object defaultValue)
            : this(parameterName, parameterLabel, parameterHelpText)
        {
            this.DefaultValue = defaultValue;
            this.HasDefaultValue = true;
        }


        /// <summary>
        /// The name of the function parameter being described. This should match the parameter name in the method.
        /// </summary>
        public string ParameterName
        {
            get;
            private set;
        }

        /// <summary>
        /// Optional. Default value that should be assigned to the parameter if not specified by the caller. You can use 'null' for complex objects that can not be expressed in attribute code and the check for null in the code.
        /// </summary>
        public object DefaultValue
        {
            get;
            private set;
        }


        /// <summary>
        /// Human readable label for this parameter
        /// </summary>
        public string ParameterLabel
        {
            get;
            private set;
        }


        /// <summary>
        /// Human readable help for this parameter
        /// </summary>
        public string ParameterHelpText
        {
            get;
            private set;
        }


        /// <summary>
        /// Indicate if this parameter definition has a default value or not.
        /// </summary>
        public bool HasDefaultValue
        {
            get;
            private set;
        }
    }
}
