using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Core.Types;
using Composite.Data;
using Composite.Core.Logging;
using Composite.Core.Xml;
using Composite.Data.Types;
using System.Reflection;
using System.Diagnostics;
using System.Collections;


namespace Composite.Plugins.Functions.FunctionProviders.XsltBasedFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class TransformationInputs
    {
        /// <exclude />
        public XContainer InputDocument { get; set; }

        /// <exclude />
        public List<IXsltExtensionDefinition> ExtensionDefinitions { get; set; }
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class RenderHelper
    {
        /// <exclude />
        public static readonly XNamespace XsltInput10 = "http://www.composite.net/ns/transformation/input/1.0";



        /// <exclude />
        public static TransformationInputs BuildInputDocument(IEnumerable<NamedFunctionCall> FunctionCalls, List<ManagedParameterDefinition> parameterDefinitions, bool addDetailedComments)
        {
            Dictionary<string, object> inputParameters = BuildTestParameterInput(parameterDefinitions);
            return BuildInputDocument(FunctionCalls.ToList(), inputParameters, addDetailedComments);
        }



        /// <exclude />
        public static TransformationInputs BuildInputDocument(IEnumerable<NamedFunctionCall> FunctionCalls, ParameterList parameterList, bool addDetailedComments)
        {
            Dictionary<string, object> inputParameters = new Dictionary<string, object>();
            List<string> parameterNames = parameterList.AllParameterNames.ToList();
            object[] paramaterValues = new object[parameterNames.Count];

            for(int i=0; i<parameterNames.Count; i++)
            {
                paramaterValues[i] = parameterList.GetParameter(parameterNames[i]);
            };

            for (int i = 0; i < parameterNames.Count; i++)
            {
                inputParameters.Add(parameterNames[i], paramaterValues[i]);
            }

            return BuildInputDocument(FunctionCalls.ToList(), inputParameters, addDetailedComments);
        }

        private static XElement CreateParameterNode(string parameterName, object value)
        {
            if (value is XDocument) value = ((XDocument)value).Root;
            
            return new XElement(XsltInput10 + "param",
                      new XAttribute("name", parameterName),
                      value);
        }

        private static XElement CreateFunctionCallResultNode(string functionCallName, object result)
        {
            if (result is XDocument) result = ((XDocument)result).Root;

            return
                new XElement(XsltInput10 + "result",
                // GetTypeAttribute(result),
                    new XAttribute("name", functionCallName),
                    result);
        }

        private static TransformationInputs BuildInputDocument(List<NamedFunctionCall> namedFunctions, Dictionary<string, object> inputParameters, bool addDetailedComments)
        {
            var evaluatedParameters = new List<KeyValuePair<string, XElement>>();
            var xslExtensions = new List<KeyValuePair<string, IXsltExtensionDefinition>>();

            foreach(KeyValuePair<string, object> entry in inputParameters)
            {
                object value = entry.Value;
                if(value is IXsltExtensionDefinition)
                {
                    xslExtensions.Add(new KeyValuePair<string, IXsltExtensionDefinition>(entry.Key, value as IXsltExtensionDefinition));
                }
                else
                {
                    evaluatedParameters.Add(new KeyValuePair<string, XElement>(entry.Key, CreateParameterNode(entry.Key, value)));
                }
            }
            return BuildInputDocument2(namedFunctions, inputParameters, evaluatedParameters, xslExtensions, addDetailedComments);
        }

        private static TransformationInputs BuildInputDocument2(List<NamedFunctionCall> namedFunctions, Dictionary<string, object> inputParameters, List<KeyValuePair<string, XElement>> evaluatedParameterList, List<KeyValuePair<string, IXsltExtensionDefinition>> xslExtensions, bool addDetailedComments)
        {
            var transformationInputs = new TransformationInputs();

            // NOTE: Attribute attributes from "xsi" namespaces aren't used
            // XElement inputRoot = XElement.Parse(string.Format(@"<in:inputs xmlns:in=""{0}"" xmlns:xsi=""{1}"" xmlns:xsd=""{2}"" />", XsltInput10, Namespaces.Xsi, Namespaces.Xsd));

            XElement inputRoot = XElement.Parse(@"<in:inputs xmlns:in=""{0}"" />".FormatWith(XsltInput10));

            transformationInputs.InputDocument = inputRoot;

            // Adding XSL extensions
            if(xslExtensions.Count > 0)
            {
                foreach (KeyValuePair<string, IXsltExtensionDefinition> xslExtension in xslExtensions)
                {
                    IXsltExtensionDefinition extensionDefinition = xslExtension.Value;

                    transformationInputs.ExtensionDefinitions = transformationInputs.ExtensionDefinitions ?? new List<IXsltExtensionDefinition>();
                    transformationInputs.ExtensionDefinitions.Add(extensionDefinition);

                    if (addDetailedComments)
                    {
                        inputRoot.Add(new XComment(string.Format(" Input Parameter '{0}' has been registered as an Xslt Entension Object. Methods on '{1}' can be called using the namespace '{2}' and format 'prefix:MethodName( arguments )'. ", xslExtension.Key, extensionDefinition.EntensionObjectAsObject.GetType().FullName, extensionDefinition.ExtensionNamespace)));
                    }
                }
            }

            // Adding input parameters
            if (evaluatedParameterList.Count > 0)
            {
                foreach (KeyValuePair<string, XElement> parameter in evaluatedParameterList)
                {
                    if (addDetailedComments)
                    {
                        inputRoot.Add(new XComment(string.Format(" Input Parameter, XPath /in:inputs/in:param[@name='{0}'] ", parameter.Key)));
                    }
                    inputRoot.Add(parameter.Value);
                }
            }

            if (namedFunctions.Count > 0)
            {
                var functionCallResults = new object[namedFunctions.Count];
                var functionCallExecutionTimes = new long[namedFunctions.Count];

                for(int i=0; i<namedFunctions.Count; i++)
                {
                    FunctionContextContainer functionContextContainer = new FunctionContextContainer(inputParameters);

                    var namedFunctionCall = namedFunctions[i];
                    object result = null;
                    Stopwatch executionStopwatch = Stopwatch.StartNew();
                    try
                    {
                        result = GetFunctionCallResult(functionContextContainer, namedFunctionCall, addDetailedComments);

                        executionStopwatch.Stop();
                    }
                    catch (Exception ex)
                    {
                        throw new InvalidOperationException(string.Format("Failed to execute function with local name '{0}'", namedFunctionCall.Name), ex);
                    }

                    functionCallResults[i] = result;
                    functionCallExecutionTimes[i] = executionStopwatch.ElapsedMilliseconds;
                };

                
                for (int i=0; i<namedFunctions.Count; i++)
                {
                    object result = functionCallResults[i];

                    if (result is IXsltExtensionDefinition)
                    {
                        IXsltExtensionDefinition extensionDefinition = (IXsltExtensionDefinition)result;
                        transformationInputs.ExtensionDefinitions = transformationInputs.ExtensionDefinitions ?? new List<IXsltExtensionDefinition>();
                        transformationInputs.ExtensionDefinitions.Add(extensionDefinition);

                        if (addDetailedComments)
                        {
                            string name = namedFunctions[i].Name;
                            inputRoot.Add(new XComment(string.Format(" Function call result '{0}' has been registered as an Xslt Entension Object. ", name, extensionDefinition.ExtensionNamespace)));
                            inputRoot.Add(new XComment(string.Format(" Extension methods can be called using the namespace '{1}'. ", name, extensionDefinition.ExtensionNamespace)));
                            inputRoot.Add(new XComment(" The following methods exist: "));
                            foreach (MethodInfo mi in extensionDefinition.EntensionObjectAsObject.GetType().GetMethods().Where(m => m.DeclaringType != typeof(object)))
                            {
                                string paramsInfo = string.Join(", ", mi.GetParameters().Select(p => string.Format("{0} {1}", p.ParameterType.Name, p.Name)).ToArray());
                                string returnTypeName = (mi.ReturnType != null ? mi.ReturnType.Name : "void");
                                inputRoot.Add(new XComment(string.Format(" {0} ns:{1}({2}) ", returnTypeName, mi.Name, paramsInfo)));
                            }
                        }
                    }
                    else
                    {
                        Verify.That(result is XElement, "Function call result had to be selialized as XElement");

                        if (addDetailedComments)
                        {
                            string xpathAppend = FindElementXPathAppend(result);

                            inputRoot.Add(new XComment(string.Format(" Function Call Result ({0} ms), XPath /in:inputs/in:result[@name='{1}']{2} ", functionCallExecutionTimes[i], namedFunctions[i].Name, xpathAppend)));
                        }

                        inputRoot.Add(result as XElement);
                    }
                }
            }

            return transformationInputs;
        }


        private static string FindElementXPathAppend(object result)
        {
            string xpathAppend = "";

            XElement firstResultElement = ((XElement)result).Elements().FirstOrDefault();
            if (firstResultElement !=null)
            {
                XElement resultElementCopy = new XElement(firstResultElement);
                resultElementCopy.Elements().Remove();
                string serializedNode = resultElementCopy.ToString();
                char[] nameEndChars = new char[] { ' ', '/', '>' };
                xpathAppend = "/" + serializedNode.Substring(1, serializedNode.IndexOfAny(nameEndChars));
            }
            return xpathAppend;
        }



        private static object GetFunctionCallResult(FunctionContextContainer functionContextContainer, NamedFunctionCall namedFunctionCall, bool addDetailedComments)
        {
            object result = namedFunctionCall.FunctionCall.GetValue(functionContextContainer);

            if (!(result is IXsltExtensionDefinition))
            {
                if (addDetailedComments)
                {
                    if (result is IEnumerable<XElement>) result = ((IEnumerable<XElement>)result).ToList(); // timers dont like lazy stuff, so evaluate now
                    if (result is IEnumerable<XNode>) result = ((IEnumerable<XNode>)result).ToList(); // timers dont like lazy stuff, so evaluate now
                }

                result = CreateFunctionCallResultNode(namedFunctionCall.Name, result);
            }

            return result;
        }




        //private static XAttribute GetTypeAttribute(object data)
        //{
        //    if (data == null) return null;

        //    Type dataType = data.GetType();

        //    if (dataType == typeof(string)) return new XAttribute(Namespaces.Xsi + "type", "xsd:string");
        //    if (dataType == typeof(XElement)) return new XAttribute(Namespaces.Xsi + "type", "xsd:any");
        //    if (dataType == typeof(int)) return new XAttribute(Namespaces.Xsi + "type", "xsd:integer");
        //    if (dataType == typeof(Int32)) return new XAttribute(Namespaces.Xsi + "type", "xsd:int");
        //    if (dataType == typeof(long)) return new XAttribute(Namespaces.Xsi + "type", "xsd:integer");
        //    if (dataType == typeof(bool)) return new XAttribute(Namespaces.Xsi + "type", "xsd:boolean");
        //    if (dataType == typeof(DateTime)) return new XAttribute(Namespaces.Xsi + "type", "xsd:dateTime");
        //    if (dataType == typeof(TimeSpan)) return new XAttribute(Namespaces.Xsi + "type", "xsd:duration");
        //    if (dataType == typeof(Uri)) return new XAttribute(Namespaces.Xsi + "type", "xsd:anyURI");

        //    return null;
        //}

        internal static IEnumerable<NamedFunctionCall> GetValidatedFunctionCalls(Guid xsltFunctionId)
        {
            List<string> errors;
            IEnumerable<NamedFunctionCall> result = GetValidFunctionCalls(xsltFunctionId, out errors);

            if (errors != null && errors.Any())
            {
                throw new InvalidOperationException(errors.First());
            }

            return result;
        }


        /// <exclude />
        public static IEnumerable<NamedFunctionCall> GetValidFunctionCalls(Guid xsltFunctionId, out List<string> errors)
        {
            errors = null;
            List<NamedFunctionCall> result = new List<NamedFunctionCall>();

            foreach (INamedFunctionCall namedFunctionCallData in DataFacade.GetData<INamedFunctionCall>(f => f.XsltFunctionId == xsltFunctionId))
            {
                XElement functionElement = XElement.Parse(namedFunctionCallData.SerializedFunction);

                FunctionRuntimeTreeNode function = null;

                try
                {
                    function = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(functionElement);
                }
                catch (Exception ex)
                {
                    string errDescriptionForLog = string.Format("XSLT Function call markup for failed to parse ('{0}').\nThe markup was \n{1}", ex.Message, functionElement);
                    string errDescriptionForUser = string.Format("XSLT Function call markup for failed to parse ('{0}').\nPlease see server log for more details.", ex.Message);
                    LoggingService.LogError("Function parse error", errDescriptionForLog);

                    if (errors == null)
                        errors = new List<string>();

                    errors.Add(errDescriptionForUser);
                }

                if (function != null)
                {
                    result.Add( new NamedFunctionCall(namedFunctionCallData.Name, function));
                }
            }

            return result;
        }



        private static Dictionary<string, object> BuildTestParameterInput(IEnumerable<ManagedParameterDefinition> parameters)
        {
            Dictionary<string, object> inputValues = new Dictionary<string, object>();

            foreach (ManagedParameterDefinition parameterDefinition in parameters)
            {
                object value = null;
                if (string.IsNullOrEmpty(parameterDefinition.TestValueFunctionMarkup) == false)
                {
                    FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(XElement.Parse(parameterDefinition.TestValueFunctionMarkup));
                    value = functionNode.GetValue();
                }
                else
                {
                    if (string.IsNullOrEmpty(parameterDefinition.DefaultValueFunctionMarkup) == false)
                    {
                        FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(XElement.Parse(parameterDefinition.DefaultValueFunctionMarkup));
                        value = functionNode.GetValue();
                    }
                }

                if (value != null)
                {
                    if (parameterDefinition.Type.IsAssignableFrom(value.GetType()) == false)
                    {
                        value = ValueTypeConverter.Convert(value, parameterDefinition.Type);
                    }

                    inputValues.Add(parameterDefinition.Name, value);
                }
            }

            return inputValues;
        }
    }
}
