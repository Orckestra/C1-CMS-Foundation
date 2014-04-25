using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.Core.WebClient.FunctionCallEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FunctionMarkupHelper
    {
        private static readonly string LogTitle = typeof (FunctionMarkupHelper).Name;
        private static readonly XName ParameterNodeXName = Namespaces.Function10 + "param";
        private static readonly XName ParameterValueElementXName = Namespaces.Function10 + "paramelement";
        

        /// <summary>
        /// Gets simple parameter value from it's markup.
        /// </summary>
        /// <returns></returns>
        public static object GetParameterValue(XElement parameterNode, ParameterProfile parameterProfile)
        {
            List<XElement> parameterElements = parameterNode.Elements(ParameterValueElementXName).ToList();
            if (parameterElements.Any())
            {
                return parameterElements.Select(element => element.Attribute("value").Value).ToList();
            }

            var valueAttr = parameterNode.Attribute("value");
            if (valueAttr != null)
            {
                try
                {
                    return XmlSerializationHelper.Deserialize(valueAttr, parameterProfile.Type);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);

                    return parameterProfile.GetDefaultValue();
                }
            }

            if (parameterNode.Elements().Any())
            {
                Type paramType = parameterProfile.Type;

                if (paramType.IsSubclassOf(typeof(XContainer))
                    || (paramType.IsLazyGenericType()
                        && paramType.GetGenericArguments()[0].IsSubclassOf(typeof(XContainer))))
                {
                    return ValueTypeConverter.Convert(parameterNode.Elements().First(), parameterProfile.Type);
                }

                throw new NotImplementedException("Not supported type of function parameter element node: '{0}'".FormatWith(paramType.FullName));
            }

            return parameterProfile.GetDefaultValue();
        }

        /// <exclude />
        public static void SetParameterValue(XElement functionMarkup, ParameterProfile parameter, object parameterValue)
        {
            bool newValueNotEmpty = parameterValue != null
	                                && (!(parameterValue is IList) || ((IList) parameterValue).Count > 0)
	                                && !(parameter.IsRequired && parameterValue as string == string.Empty);

            var parameterNode = functionMarkup.Elements(ParameterNodeXName).FirstOrDefault(p => (string)p.Attribute("name") == parameter.Name);

	        if (parameterNode != null)
	        {
                parameterNode.Remove();
	        }

	        if (newValueNotEmpty && parameterValue != parameter.GetDefaultValue())
	        {
	            var newConstantParam = new ConstantObjectParameterRuntimeTreeNode(parameter.Name, parameterValue);

	            functionMarkup.Add(newConstantParam.Serialize());
	        }
        }

        
        /// <exclude />
        public static IDictionary<string, XElement> GetParameterNodes(XElement functionMarkup)
        {
            return functionMarkup.Elements(ParameterNodeXName).ToDictionary(e => (string)e.Attribute("name"));
        }
    }
}
