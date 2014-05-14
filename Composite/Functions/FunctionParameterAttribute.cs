using System;
using System.Collections.Generic;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Extensions;

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
        private object _defaultValue;

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
        /// Gets or sets the name of the widget function.
        /// </summary>
        /// <value>
        /// The name of the widget function.
        /// </value>
        public string WidgetFunctionName
        {
            get;
            set;
        }


        /// <summary>
        /// Gets or sets the widget factory method.
        /// </summary>
        /// <value>
        /// The widget factory method.
        /// </value>
        public string WidgetFactoryMethod
        {
            get;
            set;
        }


        /// <summary>
        /// Gets or sets the widget factory class.
        /// </summary>
        /// <value>
        /// The widget factory class.
        /// </value>
        public Type WidgetFactoryClass
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
        /// Allows to hide the parameter in the "simple view" mode of function call editing.
        /// Will be ignored is the field is requires and does not have a value or a default value.
        /// </summary>
        public bool HideInSimpleView { get; set; }


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
            get
            {
                return !string.IsNullOrWhiteSpace(this.WidgetMarkup)
                       || !string.IsNullOrWhiteSpace(this.WidgetFunctionName)
                       || !string.IsNullOrWhiteSpace(this.WidgetFactoryMethod);
            }
        }


        /// <summary>
        /// Gets the widget markup
        /// </summary>
        /// <param name="owner">Class that contains</param>
        /// <param name="parameterProperty">The parameter property.</param>
        /// <returns></returns>
        public WidgetFunctionProvider GetWidgetFunctionProvider(Type owner, PropertyInfo parameterProperty)
        {
            if(!HasWidgetMarkup)
            {
                return null;
            }

            if(!WidgetMarkup.IsNullOrEmpty())
            {
                var markup = XElement.Parse(WidgetMarkup);

                return new WidgetFunctionProvider(markup);
            }

            if(!WidgetFunctionName.IsNullOrEmpty())
            {
                return new WidgetFunctionProvider(WidgetFunctionName);
            }

            if(!WidgetFactoryMethod.IsNullOrEmpty())
            {
                Type factoryType = WidgetFactoryClass ?? owner;
                Verify.IsNotNull(factoryType, "WidgetFactoryClass isn't defined");

                var methodInfo = factoryType.GetMethod(WidgetFactoryMethod, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);
                Verify.IsNotNull(methodInfo,  "Failed to get static method '{0}' on type '{1}'", WidgetFactoryMethod, factoryType.FullName);

                object result = null;

                var parameters = methodInfo.GetParameters();

                if(parameters.Length == 0)
                {
                    result = methodInfo.Invoke(null, new object[0]);
                } 
                else if(parameters.Length == 1 && parameters[0].ParameterType == typeof(string))
                {
                    result = methodInfo.Invoke(null, new object[] { Name });
                } 
                else if (parameters.Length == 1 && parameters[0].ParameterType == typeof(PropertyInfo))
                {
                    Verify.IsNotNull(parameterProperty, "parameterProperty isn't defined");

                    result = methodInfo.Invoke(null, new object[] { parameterProperty });
                } else
                {
                    throw new InvalidOperationException("Unknown method signature");
                }

                if (result == null) return null;

                if(result is XElement)
                {
                    return new WidgetFunctionProvider(result as XElement);
                }

                if(result is IWidgetFunction)
                {
                    return new WidgetFunctionProvider(result as IWidgetFunction);
                }

                if(result is WidgetFunctionProvider)
                {
                    return result as WidgetFunctionProvider;
                }
                
                throw new InvalidOperationException("Unexpected widget type '{0}'".FormatWith(result.GetType()));
            }

            throw new InvalidOperationException("This line should not be reachable");
        }
    }
}
