using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using System.Reflection;
using Composite.Xml;
using Composite.Types;

namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation
{
    internal static class FormFunctionMarkupBuilder
    {
        public static XElement StaticMethodCall(MethodInfo methodInfo, object parameter)
        {
            XNamespace f = Namespaces.BindingFormsStdFuncLib10;

            try
            {
                string parameterSerialized = ValueTypeConverter.Convert<string>(parameter);

                return new XElement(f + "StaticMethodCall",
                           new XAttribute("Type", TypeManager.SerializeType(methodInfo.DeclaringType)),
                           new XAttribute("Method", methodInfo.Name),
                           new XAttribute("Parameters", parameterSerialized ?? ""));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to generate markup for static method call to '{0}' ('{1}') with parameter of type {2}", methodInfo.Name, methodInfo.DeclaringType.AssemblyQualifiedName, parameter.GetType()), ex);
            }
        }

        internal static object StaticMethodCall(MethodInfo methodInfo)
        {
            XNamespace f = Namespaces.BindingFormsStdFuncLib10;

            return new XElement(f + "StaticMethodCall",
                       new XAttribute("Type", TypeManager.SerializeType(methodInfo.DeclaringType)),
                       new XAttribute("Method", methodInfo.Name));
        }
    }
}
