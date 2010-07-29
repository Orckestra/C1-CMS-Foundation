using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Xml;

namespace Composite.WebClient.FunctionCallEditor
{
    /// <summary>
    /// Contains helper methods to work with serialized function calls tree
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]  
    public static class TreeHelper
    {
        public static readonly string PathSeparator = "/";
        private static readonly XName ParameterNodeName = Namespaces.Function10 + "param";
        private static readonly XName FunctionNodeName = Namespaces.Function10 + "function";
        private static readonly XName WidgetFunctionNodeName = Namespaces.Function10 + "widgetfunction";

        public static string GetRootFunctionPath(int functionIndex)
        {
            return string.Format("/function[{0}]", functionIndex);
        }

        public static string GetParameterPath(string parentFunctionPath, string parameterName)
        {
            return string.Format("{0}/@{1}", parentFunctionPath, parameterName);
        }

        public static string GetFunctionCallPath(string parameterNodePath)
        {
            return string.Format("{0}/function", parameterNodePath);
        }

        public static Dictionary<XElement, string> GetElementToPathMap(XDocument functionMarkup)
        {
            return GetElementToPathMap(functionMarkup.Root);
        }

        public static Dictionary<XElement, string> GetElementToPathMap(XElement root)
        {
            var functionToPathMap = new Dictionary<XElement, string>();

            // Creating node->path dictionary
            int functionCounter = 0;
            foreach (XElement rootFunctionElement in root.Elements().GetFunctionsAndWidgetFunctions())
            {
                functionCounter++;

                functionToPathMap.Add(rootFunctionElement, GetRootFunctionPath(functionCounter));

                foreach (XElement element in rootFunctionElement.Descendants())
                {
                    string parentPathId = functionToPathMap[element.Parent];

                    if (element.Name == ParameterNodeName)
                    {
                        functionToPathMap.Add(element, GetParameterPath(parentPathId, element.Attribute("name").Value));
                    }
                    else if (element.Name == FunctionNodeName)
                    {
                        functionToPathMap.Add(element, GetFunctionCallPath(parentPathId));
                    }
                }
            }

            return functionToPathMap;
        }

        public static Dictionary<XElement, string> GetElementToIdMap(XDocument functionMarkup, Dictionary<string, string> pathToIDmap)
        {
            Dictionary<XElement, string> functionToPathMap = GetElementToPathMap(functionMarkup);

            var result = new Dictionary<XElement, string>();

            foreach (XElement element in functionToPathMap.Keys)
            {
                string elementPath = functionToPathMap[element];
                if (pathToIDmap.ContainsKey(elementPath))
                {
                    result.Add(element, pathToIDmap[elementPath]);
                }
                else
                {
                    throw new InvalidOperationException("Function tree xml has already been changed");
                    // TODO: should this ever happen?
                    //result.Add(element, GetNewId());
                }
            }

            return result;
        }

        public static Dictionary<string, string> BuildTreePathToIdDictionary(XDocument functionMarkup)
        {
            // Populating path->id dictionary
            var treePathToIdMapping = new Dictionary<string, string>();

            var elementToPathMap = GetElementToPathMap(functionMarkup);

            elementToPathMap.Values.ToList().ForEach(
                value => treePathToIdMapping.Add(value, GetNewId())
            );

            List<XElement> functionNodes = functionMarkup
                .Descendants()
                .Where(node => node.Name == FunctionNodeName || node.Name == WidgetFunctionNodeName)
                .ToList();
            foreach (XElement functionNode in functionNodes)
            {
                foreach (string parameterName in GetUndefinedParameterNames(functionNode))
                {
                    string functionPath = elementToPathMap[functionNode];

                    treePathToIdMapping.Add(GetParameterPath(functionPath, parameterName), GetNewId());
                }
            }

            return treePathToIdMapping;
        }

        public static XElement GetParameterNode(XElement functionNode, string parameterName)
        {
            return (from parameter in functionNode.Elements()
                    let nameAttribute = parameter.Attribute("name")
                    where nameAttribute != null && nameAttribute.Value == parameterName
                    select parameter).FirstOrDefault();
        }

        public static string GetNewId()
        {
            return Guid.NewGuid().ToString();
        }

        public static XElement FindByPath(XElement root, string path)
        {
            string parentId;

            int functionCounter = 0;
            foreach (XElement rootFunctionElement in root.Elements().GetFunctionsAndWidgetFunctions())
            {
                functionCounter++;
                string rootFunctionId = GetRootFunctionPath(functionCounter);

                if (path == rootFunctionId)
                {
                    return rootFunctionElement;
                }

                if (!path.StartsWith(rootFunctionId + PathSeparator))
                {
                    continue;
                }

                parentId = rootFunctionId;

                foreach (XElement element in rootFunctionElement.Descendants())
                {
                    if (element.Name == ParameterNodeName)
                    {
                        string parameterNodePath = GetParameterPath(parentId, element.Attribute("name").Value);

                        if (path == parameterNodePath)
                        {
                            return element;
                        }

                        if (path.StartsWith(parameterNodePath + PathSeparator))
                        {
                            parentId = parameterNodePath;
                        }
                    }
                    else if (element.Name == FunctionNodeName)
                    {
                        string functionNodePath = GetFunctionCallPath(parentId);
                        if (path == functionNodePath)
                        {
                            return element;
                        }

                        if (path.StartsWith(functionNodePath + PathSeparator))
                        {
                            parentId = functionNodePath;
                        }
                    }
                }

                break;
            }

            return null;
        }

        public static string[] GetUndefinedParameterNames(XElement functionXElement)
        {
            var result = new List<string>();
            // Can be optimized
            foreach (string paramName in GetParameterNames(functionXElement))
            {
                if (!FunctionHasParameterDefined(functionXElement, paramName))
                {
                    result.Add(paramName);
                }
            }
            return result.ToArray();
        }

        public static string[] GetParameterNames(XElement functionXElement)
        {
            if (functionXElement.Name != FunctionNodeName && functionXElement.Name != WidgetFunctionNodeName)
            {
                return new string[0];
            }

            string functionName = functionXElement.Attribute("name").Value;
            IMetaFunction function = (functionXElement.Name == FunctionNodeName) 
                ? (IMetaFunction)FunctionFacade.GetFunction(functionName)    
                : FunctionFacade.GetWidgetFunction(functionName);

            return function.ParameterProfiles.Select(parameter => parameter.Name).ToArray();
        }

        private static bool FunctionHasParameterDefined(XElement functionXElement, string parameterName)
        {
            return functionXElement.Elements(ParameterNodeName).Any(node => node.Attribute("name").Value == parameterName);
        }

        public static IMetaFunction GetFunction(XElement functionNode)
        {
            string functionName = functionNode.Attribute("name").Value;

            if(functionNode.Name == WidgetFunctionNodeName)
            {
                return FunctionFacade.GetWidgetFunction(functionName);
            }

            return FunctionFacade.GetFunction(functionName);
        }

        public static IEnumerable<XElement> GetFunctionsAndWidgetFunctions(this IEnumerable<XElement> elements)
        {
            return elements.Where(element => element.Name ==  FunctionNodeName || element.Name == WidgetFunctionNodeName);
        }
    }
}
