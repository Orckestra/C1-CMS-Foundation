using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    /// <summary>
    /// Helper class for developing implementations of FileBasedFunctionProvider
    /// </summary>
    public static class FunctionBasedFunctionProviderHelper
    {
        private static readonly string LogTitle = typeof(FunctionBasedFunctionProviderHelper).FullName;

        /// <summary>
        /// Gets the function description from the <see cref="FunctionAttribute" />.
        /// </summary>
        /// <param name="functionName">Name of the function.</param>
        /// <param name="functionObject">The object that represents a function.</param>
        /// <returns></returns>
        public static string GetDescription(string functionName, object functionObject)
        {
            var attr = functionObject.GetType()
                                     .GetCustomAttributes(typeof(FunctionAttribute), false)
                                     .Cast<FunctionAttribute>()
                                     .FirstOrDefault();
            if (attr != null)
            {
                return attr.Description;
            }

            return String.Format("A {0} function", functionName);
        }

        /// <summary>
        /// Extracts the function paramteres from an object that represents a function.
        /// </summary>
        /// <param name="functionObject">The object that represents a function.</param>
        /// <param name="baseFunctionType">Type of the base function.</param>
        /// <param name="filePath">Physical file location of the file behind the function, used for logging.</param>
        /// <returns></returns>
        public static IDictionary<string, FunctionParameter> GetParameters(object functionObject, Type baseFunctionType, string filePath)
        {
            var functionParameters = new Dictionary<string, FunctionParameter>();
            IDictionary<string, WidgetFunctionProvider> parameterWidgets = GetParameterWidgets(functionObject);

            var type = functionObject.GetType();
            while (type != baseFunctionType && type != null)
            {
                var properties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.SetProperty | BindingFlags.DeclaredOnly);
                foreach (var property in properties)
                {
                    // Skipping overriden base properties
                    if (property.GetAccessors()[0].GetBaseDefinition().DeclaringType == baseFunctionType) continue;
                    // Skipping private setters
                    if (property.GetSetMethod(false) == null) continue;
                    // Skipping explicitly ignored attributes
                    if (property.GetCustomAttributes(typeof(FunctionParameterIgnoreAttribute), false).Any()) continue;

                    var propType = property.PropertyType;
                    var name = property.Name;

                    FunctionParameterAttribute attr = null;
                    var attributes = property.GetCustomAttributes(typeof(FunctionParameterAttribute), false).Cast<FunctionParameterAttribute>().ToList();

                    if (attributes.Count > 1)
                    {
                        Log.LogWarning(LogTitle, "More than one '{0}' attribute defined on property '{1}'. Location: '{2}'"
                                                 .FormatWith(typeof(FunctionParameterAttribute).Name, name, filePath));
                    }
                    else
                    {
                        attr = attributes.FirstOrDefault();
                    }

                    WidgetFunctionProvider attibuteBasedWidgetProvider = null;
                    WidgetFunctionProvider methodBasedWidgetProvider = null;

                    if (attr != null && attr.HasWidgetMarkup)
                    {
                        try
                        {
                            attibuteBasedWidgetProvider = attr.GetWidgetFunctionProvider(type, property);
                        }
                        catch (Exception ex)
                        {
                            Log.LogWarning(LogTitle, "Failed to get widget function provider for parameter property {0}. Location: '{1}'"
                                                     .FormatWith(property.Name, filePath));
                            Log.LogWarning(LogTitle, ex);
                        }
                    }

                    parameterWidgets.TryGetValue(name, out methodBasedWidgetProvider);

                    if (methodBasedWidgetProvider!=null && attibuteBasedWidgetProvider!=null)
                    {
                        Log.LogWarning(LogTitle, "Widget for property {0} is defined in both {1} attribute and in {2}() method. Remove one of the definitions. Location: '{3}'"
                                                 .FormatWith(property.Name, nameof(FunctionParameterAttribute), nameof(IParameterWidgetsProvider.GetParameterWidgets), filePath));
                    }

                    if (!functionParameters.ContainsKey(name))
                    {
                        functionParameters.Add(name, new FunctionParameter(name, propType, attr, attibuteBasedWidgetProvider ?? methodBasedWidgetProvider));
                    }
                }

                type = type.BaseType;
            }

            return functionParameters;
        }

        private static IDictionary<string, WidgetFunctionProvider> GetParameterWidgets(object functionObject)
        {
            var widgetsProvider = functionObject as IParameterWidgetsProvider;
            IDictionary<string, WidgetFunctionProvider> parameterWidgets = widgetsProvider != null ? widgetsProvider.GetParameterWidgets() : null;

            return parameterWidgets ?? new Dictionary<string, WidgetFunctionProvider>();
        }
    }
}
