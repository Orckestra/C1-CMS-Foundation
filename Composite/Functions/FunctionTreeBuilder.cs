using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FunctionTreeBuilder
    {
        /// <exclude />
        public static BaseRuntimeTreeNode Build(XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");

            if (element.Name.Namespace != FunctionTreeConfigurationNames.NamespaceName) throw new InvalidOperationException(string.Format("The namespace '{0}' is not supported", element.Name.Namespace));


            if (element.Name.LocalName == FunctionTreeConfigurationNames.FunctionTagName)
            {
                return BuildFunctionRuntimeNode(element);
            }
            else if (element.Name.LocalName == FunctionTreeConfigurationNames.WidgetFunctionTagName)
            {
                return BuildWidgetFunctionRuntimeNode(element);
            }
            else if (element.Name.LocalName == FunctionTreeConfigurationNames.ParamTagName)
            {
                return BuildParameterFunctionRuntimeNode(element);
            }
            else
            {
                throw new InvalidOperationException(string.Format("The tag named '{0}' is not supported", element.Name.LocalName));
            }
        }



        /// <exclude />
        public static FunctionRuntimeTreeNode BuildFunction(string functionName, Dictionary<string, string> parameters)
        {
            var functionParams = new List<BaseParameterRuntimeTreeNode>();
            foreach (var parameter in parameters)
            {
                functionParams.Add(new ConstantParameterRuntimeTreeNode(parameter.Key, parameter.Value));
            }

            IFunction function = FunctionFacade.GetFunction(functionName);

            return new FunctionRuntimeTreeNode(function, functionParams);
        }



        /// <exclude />
        public static WidgetFunctionRuntimeTreeNode BuildWidgetFunction(string widgetFunctionName, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            IWidgetFunction widgetFunction = FunctionFacade.GetWidgetFunction(widgetFunctionName);

            return new WidgetFunctionRuntimeTreeNode(widgetFunction, label, helpDefinition, bindingSourceName);
        }



        private static FunctionRuntimeTreeNode BuildFunctionRuntimeNode(XElement element)
        {
            XAttribute nameAttribute = element.Attribute(FunctionTreeConfigurationNames.NameAttributeName);
            if (nameAttribute == null) throw new InvalidOperationException(string.Format("Missing attribute named '{0}'", FunctionTreeConfigurationNames.NameAttributeName));

            List<BaseParameterRuntimeTreeNode> parameters = new List<BaseParameterRuntimeTreeNode>();

            foreach (XElement childElement in element.Elements())
            {
                if (childElement.Name.LocalName == FunctionTreeConfigurationNames.ParamTagName)
                {
                    BaseParameterRuntimeTreeNode parameterTreeNode = BuildParameterFunctionRuntimeNode(childElement);

                    parameters.Add(parameterTreeNode);
                }
                else
                {
                    throw new InvalidOperationException(string.Format("Only '{0}' tags allowed inside '{1}' tags", FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.FunctionTagName));
                }
            }


            IFunction function = FunctionFacade.GetFunction(nameAttribute.Value);


            foreach (BaseParameterRuntimeTreeNode parameter in parameters)
            {
                int count = function.ParameterProfiles.Where(pp => pp.Name == parameter.Name).Count();

                if (count == 0)
                {
                    throw new InvalidOperationException(string.Format("The parameter '{0}' is not defined in the function named '{1}' parameter profiles", parameter.Name, function.CompositeName()));
                }
            }

            return new FunctionRuntimeTreeNode(function, parameters);
        }



        private static WidgetFunctionRuntimeTreeNode BuildWidgetFunctionRuntimeNode(XElement element)
        {
            XAttribute nameAttribute = element.Attribute(FunctionTreeConfigurationNames.NameAttributeName);
            if (nameAttribute == null) throw new InvalidOperationException(string.Format("Missing attribute named '{0}'", FunctionTreeConfigurationNames.NameAttributeName));

            XAttribute labelAttribute = element.Attribute(FunctionTreeConfigurationNames.LabelAttributeName);
            if (labelAttribute == null) throw new InvalidOperationException(string.Format("Missing attribute named '{0}'", FunctionTreeConfigurationNames.LabelAttributeName));

            XAttribute bindingSourceNameAttribute = element.Attribute(FunctionTreeConfigurationNames.BindingSourceNameAttributeName);
            if (bindingSourceNameAttribute == null) throw new InvalidOperationException(string.Format("Missing attribute named '{0}'", FunctionTreeConfigurationNames.BindingSourceNameAttributeName));

            HelpDefinition helpDefinition = null;
            List<BaseParameterRuntimeTreeNode> parameters = new List<BaseParameterRuntimeTreeNode>();

            foreach (XElement childElement in element.Elements())
            {
                if (childElement.Name.LocalName == FunctionTreeConfigurationNames.HelpDefinitionTagName)
                {
                    helpDefinition = HelpDefinition.Deserialize(childElement);
                }
                else if (childElement.Name.LocalName == FunctionTreeConfigurationNames.ParamTagName)
                {
                    BaseParameterRuntimeTreeNode parameterTreeNode = BuildParameterFunctionRuntimeNode(childElement);

                    parameters.Add(parameterTreeNode);
                }
                else
                {
                    throw new InvalidOperationException(string.Format("Only '{0}' tags allowed inside '{1}' tags", FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.FunctionTagName));
                }
            }

            if (helpDefinition == null) throw new InvalidOperationException(string.Format("Missing sub element named '{0}'", FunctionTreeConfigurationNames.HelpDefinitionTagName));

            IWidgetFunction widgetFunction = FunctionFacade.GetWidgetFunction(nameAttribute.Value);


            foreach (BaseParameterRuntimeTreeNode parameter in parameters)
            {
                int count = widgetFunction.ParameterProfiles.Where(pp => pp.Name == parameter.Name).Count();

                if (count == 0)
                {
                    throw new InvalidOperationException(string.Format("The parameter '{0}' is not defined in the function named '{1}' parameter profiles", parameter.Name, widgetFunction.CompositeName()));
                }
            }

            return new WidgetFunctionRuntimeTreeNode(widgetFunction, labelAttribute.Value, helpDefinition, bindingSourceNameAttribute.Value, parameters);
        }



        private static BaseParameterRuntimeTreeNode BuildParameterFunctionRuntimeNode(XElement element)
        {
            XAttribute nameAttribute = element.Attribute(FunctionTreeConfigurationNames.NameAttributeName);
            Verify.IsNotNull(nameAttribute, "Missing attribute named '{0}'", FunctionTreeConfigurationNames.NameAttributeName);

            string parameterName = nameAttribute.Value;


            XAttribute valueAttribute = element.Attribute(FunctionTreeConfigurationNames.ValueAttributeName);
            if (valueAttribute != null)
            {
                return new ConstantParameterRuntimeTreeNode(parameterName, valueAttribute.Value);
            }

            if (element.Elements().Count() == 0)
            {
                if (string.IsNullOrEmpty(element.Value) || string.IsNullOrEmpty(element.Value.Trim()))
                {
                    return new ConstantParameterRuntimeTreeNode(parameterName, (string)null);
                }

                return new ConstantParameterRuntimeTreeNode(parameterName, element.Value);
            }

            if ((element.Elements().Count() == 1) &&
                     (element.Elements().First().Name.LocalName == FunctionTreeConfigurationNames.FunctionTagName))
            {
                XElement childElement = element.Elements().First();

                if (childElement.Name.LocalName != FunctionTreeConfigurationNames.FunctionTagName) throw new InvalidOperationException(string.Format("Missing '{0}' child element (found '{1}')", FunctionTreeConfigurationNames.FunctionTagName, childElement.Name.LocalName));

                FunctionRuntimeTreeNode functionNode = BuildFunctionRuntimeNode(childElement);

                return new FunctionParameterRuntimeTreeNode(parameterName, functionNode);
            }

            if ((element.Elements().Count() == 1) &&
                     (element.Elements().First().Name.LocalName != FunctionTreeConfigurationNames.ParamElementTagName))
            {
                return new XElementParameterRuntimeTreeNode(parameterName, element.Elements().First());
            }

            if (element.Elements().All(f => f.Name.LocalName == FunctionTreeConfigurationNames.ParamElementTagName))
            {
                var strings = new List<string>();

                foreach(XElement elm in element.Elements())
                {
                    XAttribute attr = elm.Attribute(FunctionTreeConfigurationNames.ValueAttributeName);
                    Verify.IsNotNull(attr, "One or more {0} are missing the attribute {1}", FunctionTreeConfigurationNames.ParamElementTagName, FunctionTreeConfigurationNames.ValueAttributeName);

                    strings.Add(attr.Value);
                }

                return new ConstantParameterRuntimeTreeNode(parameterName, strings);
            }

            if (element.Nodes().Any())
            {
                object value = element.Nodes().All(f => f is XElement) ? element.Elements() : element.Nodes();

                return new ConstantObjectParameterRuntimeTreeNode(parameterName, value);
            }

            throw new InvalidProgramException("Wrong xml format in parameter '{0}'".FormatWith(parameterName));
        }
    }
}
