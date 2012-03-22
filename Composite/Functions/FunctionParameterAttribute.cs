using System;


namespace Composite.Functions
{
    /// <summary>
    /// Adds information about C1 Function parameters like label, help text, default value and custom widget markup.
    /// 
    /// Different C1 Function providers let developers create new C1 Functions by creating artifacts like static funtions in C#,
    /// Razor Web Pages, User Controls etc. These C1 Functions can have parameters, typically defined as actual parameters (for
    /// static functions) or as public get/set propeties. This attribute signal that a C1 Function parameter is being defined and
    /// add label, help etc.
    /// 
    /// The use of this attribute is relative to the C1 Function provider being used.
    /// </summary>
    /// <example>
    /// Here is an example of how to use <see cref="FunctionParameterAttribute" /> to annotate multiple parameters of a function:
    /// <code>
    /// [FunctionParameter(Name="searchTerm", Label="Search term", Help="One or more keywords to search for")]
    /// [FunctionParameter(Name="filter", Label="Filter", Help="Filter to apply to data before searching for search term", DefaultValue=null)]    
    /// public static int GetItemCount( string searchTerm, Expression&lt;Func&lt;IMyDataType,bool&gt;&gt; filter ) 
    /// { 
    ///     if (filter == null ) filter = _defaultFilter;
    ///     // more code here
    /// }
    /// </code>
    /// Note that <see cref="P:Composite.Functions.FunctionParameterAttribute.Name" /> is required when <see cref="FunctionParameterAttribute" /> is used this way.
    /// </example>
    /// <example>
    /// Here is an example of how to use <see cref="FunctionParameterAttribute" /> to annotate a property:
    /// <code>
    /// [FunctionParameter(Label="Item count", DefaultValue=10)]
    /// public int ItemCount { get; set; } 
    /// </code>
    /// Note that <see cref="P:Composite.Functions.FunctionParameterAttribute.Name" /> is not expected when <see cref="FunctionParameterAttribute" /> is used this way.
    /// </example>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = true)]
	public sealed class FunctionParameterAttribute : Attribute
	{
        private object _defaultValue = null;

        /// <summary>
        /// Describe a function parameter for use in the C1 Function system. 
        /// </summary>
        public FunctionParameterAttribute()
        {
            this.Name = null;
            this.HasDefaultValue = false;
        }


        /// <summary>
        /// The name of the function parameter being described. This should match the parameter name in the method.
        /// </summary>
        public string Name
        {
            get;
            set;
        }


        /// <summary>
        /// Human readable label for this parameter
        /// </summary>
        public string Label
        {
            get;
            set;
        }


        /// <summary>
        /// Human readable help for this parameter
        /// </summary>
        public string Help
        {
            get;
            set;
        }


        /// <summary>
        /// Set this property to control the form input field used to set the parameters value. 
        /// </summary>
        public string WidgetMarkup
        {
            get;
            set;
        }


        /// <summary>
        /// Optional. Default value that should be assigned to the parameter if not specified by the caller. You can use 'null' for complex objects that can not be expressed in attribute code and the check for null in the code.
        /// </summary>
        public object DefaultValue
        {
            get
            {
                return _defaultValue;
            }
            set
            {
                _defaultValue = value;
                HasDefaultValue = true;
            }
        }


        /// <summary>
        /// Indicate if this parameter definition has a default value or not.
        /// </summary>
        public bool HasDefaultValue
        {
            get;
            private set;
        }


        /// <summary>
        /// Indicate if Name is defined for this attribute.
        /// </summary>
        public bool HasName
        {
            get { return !string.IsNullOrWhiteSpace(this.Name); }
        }


        /// <summary>
        /// Indicate if Label is defined for this attribute.
        /// </summary>
        public bool HasLabel
        {
            get { return !string.IsNullOrWhiteSpace(this.Label); }
        }


        /// <summary>
        /// Indicate if Help is defined for this attribute.
        /// </summary>
        public bool HasHelp
        {
            get { return !string.IsNullOrWhiteSpace(this.Help); }
        }


        /// <summary>
        /// Indicate if WidgetMarkup is defined for this attribute.
        /// </summary>
        public bool HasWidgetMarkup
        {
            get { return !string.IsNullOrWhiteSpace(this.WidgetMarkup); }
        }
    }
}
