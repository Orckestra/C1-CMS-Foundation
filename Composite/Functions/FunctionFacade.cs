using System;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Functions.Foundation;
using Composite.Core.Extensions;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FunctionFacade
    {
        /// <exclude />
        public static List<string> FunctionNames
        {
            get
            {
                return MetaFunctionProviderRegistry.FunctionNames;
            }
        }



        /// <exclude />
        public static List<string> WidgetFunctionNames
        {
            get
            {
                return MetaFunctionProviderRegistry.WidgetFunctionNames;
            }
        }



        /// <exclude />
        public static IFunction GetFunction(string name)
        {
            return MetaFunctionProviderRegistry.GetFunction(name);
        }



        /// <exclude />
        public static bool TryGetFunction(out IMetaFunction foundFunction, string name, Type functionType)
        {
            if (functionType == typeof(IFunction))
            {
                if (MetaFunctionProviderRegistry.FunctionNames.Contains(name))
                {
                    foundFunction = GetFunction(name);
                    return true;
                }

                foundFunction = null;
                return false;
            }


            if (functionType == typeof(IWidgetFunction))
            {
                if (MetaFunctionProviderRegistry.WidgetFunctionNames.Contains(name))
                {
                    foundFunction = GetWidgetFunction(name);
                    return true;
                }

                foundFunction = null;
                return false;
            }

            throw new ArgumentException("Type of function must be IFunction or IWidgetFunction");
        }



        /// <exclude />
        public static bool TryGetFunction(out IFunction foundFunction, string name)
        {
            if (MetaFunctionProviderRegistry.FunctionNames.Contains(name))
            {
                foundFunction = GetFunction(name);
                return true;
            }
            
            foundFunction = null;
            return false;
        }



        /// <exclude />
        public static bool TryGetWidgetFunction(out IWidgetFunction foundFunction, string name)
        {
            if (MetaFunctionProviderRegistry.WidgetFunctionNames.Contains(name))
            {
                foundFunction = GetWidgetFunction(name);
                return true;
            }
            
            foundFunction = null;
            return false;
        }



        /// <exclude />
        public static IWidgetFunction GetWidgetFunction(string name)
        {
            return MetaFunctionProviderRegistry.GetWidgetFunction(name);
        }



        /// <exclude />
        public static IEnumerable<IFunction> GetFunctionsByProvider(string providerName)
        {
            foreach (string functionName in MetaFunctionProviderRegistry.FunctionNamesByProviderName(providerName))
            {
                yield return MetaFunctionProviderRegistry.GetFunction(functionName);
            }
        }



        /// <exclude />
        public static IEnumerable<string> GetFunctionNamesByProvider(string providerName)
        {
            return MetaFunctionProviderRegistry.FunctionNamesByProviderName(providerName);
        }



        /// <exclude />
        public static IEnumerable<string> GetFunctionNamesByType(Type supportedType)
        {
            return MetaFunctionProviderRegistry.GetFunctionNamesByType(supportedType);
        }



        /// <exclude />
        public static IEnumerable<string> GetWidgetFunctionNamesByType(Type supportedType)
        {
            return MetaFunctionProviderRegistry.GetWidgetFunctionNamesByType(supportedType);
        }



        /// <exclude />
        public static IEnumerable<Type> FunctionSupportedTypes
        {
            get
            {
                return MetaFunctionProviderRegistry.FunctionSupportedTypes;
            }
        }



        /// <exclude />
        public static IEnumerable<Type> WidgetFunctionSupportedTypes
        {
            get
            {
                return MetaFunctionProviderRegistry.WidgetFunctionSupportedTypes;
            }
        }



        /// <exclude />
        public static bool FunctionExists(string namespaceName, string name)
        {
            IFunction fun;
            
            bool exists = FunctionFacade.TryGetFunction(out fun, StringExtensionMethods.CreateNamespace(namespaceName, name));

            return exists;
        }



        /// <exclude />
        public static BaseRuntimeTreeNode BuildTree(IFunction function, IDictionary<string, object> parameters)
        {
            List<BaseParameterRuntimeTreeNode> parameterNodes = new List<BaseParameterRuntimeTreeNode>();

            if (parameters != null)
            {
                foreach (KeyValuePair<string, object> kvp in parameters)
                {
                    parameterNodes.Add(new ConstantObjectParameterRuntimeTreeNode(kvp.Key, kvp.Value));
                }
            }

            return new FunctionRuntimeTreeNode(function, parameterNodes);
        }



        /// <exclude />
        public static BaseRuntimeTreeNode BuildTree(XElement element)
        {
            return FunctionTreeBuilder.Build(element);
        }


        /// <exclude />
        public static T Execute<T>(IFunction function, IDictionary<string, object> parameters)
        {
            var functionContextContainer = new FunctionContextContainer();

            return Execute<T>(function, parameters, functionContextContainer);
        }


        /// <exclude />
        public static T Execute<T>(IFunction function, IDictionary<string, object> parameters, FunctionContextContainer functionContextContainer)
        {
            BaseRuntimeTreeNode node = BuildTree(function, parameters);

            return (T)node.GetValue(functionContextContainer);
        }



        /// <exclude />
        public static T Execute<T>(IFunction function)
        {
            Dictionary<string, object> parameters = new Dictionary<string, object>();
            FunctionContextContainer container = new FunctionContextContainer();
            return Execute<T>(function, parameters, container);
        }


        /// <exclude />
        public static T Execute<T>(IFunction function, System.Collections.Specialized.NameValueCollection parameterValues)
        {
            Dictionary<string, object> parameters = new Dictionary<string, object>();

            foreach (var parameterName in parameterValues.AllKeys)
            {
                if (parameterName != null && parameterValues[parameterName] != null)
                {
                    parameters.Add(parameterName, parameterValues[parameterName]);
                }
            }

            FunctionContextContainer container = new FunctionContextContainer();
            return Execute<T>(function, parameters, container);
        }



        //public static XElement GetWidgetMarkup(IWidgetFunction widgetFunction, Type targetType, IDictionary<string, object> parameters, string label, HelpDefinition helpDefinition, string bindingSourceName, FunctionContextContainer functionContextContainer)
        //{
        //    List<BaseParameterRuntimeTreeNode> parameterNodes = new List<BaseParameterRuntimeTreeNode>();

        //    if (parameters != null)
        //    {
        //        foreach (KeyValuePair<string, object> kvp in parameters)
        //        {
        //            parameterNodes.Add(new ConstantObjectParameterRuntimeTreeNode(kvp.Key, kvp.Value));
        //        }
        //    }

        //    BaseRuntimeTreeNode node = new WidgetFunctionRuntimeTreeNode(widgetFunction, label, helpDefinition, bindingSourceName, parameterNodes);

        //    return (XElement)node.GetValue(functionContextContainer);
        //}



        /// <exclude />
        public static XElement GetWidgetMarkup(IWidgetFunction widgetFunction, Type targetType, IEnumerable<BaseParameterRuntimeTreeNode> parameters, string label, HelpDefinition helpDefinition, string bindingSourceName, FunctionContextContainer functionContextContainer)
        {
            List<BaseParameterRuntimeTreeNode> parameterNodes = new List<BaseParameterRuntimeTreeNode>();

            if (parameters != null)
            {
                foreach (BaseParameterRuntimeTreeNode parameterNode in parameters)
                {
                    parameterNodes.Add(parameterNode);
                }
            }

            BaseRuntimeTreeNode node = new WidgetFunctionRuntimeTreeNode(widgetFunction, label, helpDefinition, bindingSourceName, parameterNodes);

            return (XElement)node.GetValue(functionContextContainer);
        }



        /// <exclude />
        public static string BuildUniqueFunctionName(string functionNamespace, string nameStem)
        {
            string nameCandidate = nameStem;
            int i = 1;
            while (FunctionFacade.FunctionNames.Contains(string.Format("{0}.{1}", functionNamespace, nameCandidate)))
            {
                i++;
                nameCandidate = string.Format("{0}{1}", nameStem, i);
            }

            return nameCandidate;
        }



        /// <exclude />
        public static string GetFunctionCompositionName(string functionNamespace, string name)
        {
            return StringExtensionMethods.CreateNamespace(functionNamespace, name);
        }
    }
}
