using System;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    /// <summary>
    /// Represents a function parameter
    /// </summary>
	public class FunctionParameter
	{
        /// <summary>
        /// Gets the parameter name.
        /// </summary>
		public string Name { get; private set; }

        /// <summary>
        /// Gets the parameter type.
        /// </summary>
		public Type Type { get; private set; }

        /// <summary>
        /// Gets the widget provider.
        /// </summary>
		public WidgetFunctionProvider WidgetProvider { get; private set; }

        /// <summary>
        /// Gets the function parameter attribute.
        /// </summary>
        /// <value>
        /// The attribute.
        /// </value>
		public FunctionParameterAttribute Attribute { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="FunctionParameter"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="type">The type.</param>
        /// <param name="functionParameterAttribute">The function parameter attribute.</param>
        /// <param name="widgetProvider">The widget provider.</param>
		public FunctionParameter(string name, Type type, FunctionParameterAttribute functionParameterAttribute, WidgetFunctionProvider widgetProvider)
		{
			Name = name;
			Type = type;
            Attribute = functionParameterAttribute;

			WidgetProvider = widgetProvider;
		}

        /// <summary>
        /// Sets the parameter value.
        /// </summary>
        /// <param name="functionObject">The function object.</param>
        /// <param name="parameterValue">The parameter value.</param>
		public void SetValue(object functionObject, object parameterValue)
        {
            GetParameterProperty(functionObject.GetType(), Name).SetValue(functionObject, parameterValue, null);
		}

        private static PropertyInfo GetParameterProperty(Type type, string propertyName)
        {
            var bindingFlags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.SetProperty | BindingFlags.DeclaredOnly;

            Type currentType = type;

            while (currentType != typeof(Type))
            {
                var property = currentType.GetProperty(propertyName, bindingFlags);

                if (property != null) return property;

                currentType = currentType.BaseType;
            }

            throw new InvalidOperationException("Failed to find parameter property '{0}' on type '{1}'".FormatWith(propertyName, type.FullName));
        }
	}
}
