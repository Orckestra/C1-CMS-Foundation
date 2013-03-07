using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Core.Xml;

namespace Composite.Core.WebClient.FunctionCallEditor
{
    /// <summary>
    /// Contains helper methods to work with serialized function calls tree
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]  
    public static class TreeHelper
    {
        /// <exclude />
        public static readonly string PathSeparator = "/";


        private static readonly XName ParameterNodeName = Namespaces.Function10 + "param";
        private static readonly XName FunctionNodeName = Namespaces.Function10 + "function";
        private static readonly XName WidgetFunctionNodeName = Namespaces.Function10 + "widgetfunction";


        /// <exclude />
        public static string GetRootFunctionPath(int functionIndex)
        {
            return string.Format("/function[{0}]", functionIndex);
        }



        /// <exclude />
        public static string GetParameterPath(string parentFunctionPath, string parameterName)
        {
            return string.Format("{0}/@{1}", parentFunctionPath, parameterName);
        }



        /// <exclude />
        public static string GetFunctionCallPath(string parameterNodePath)
        {
            return string.Format("{0}/function", parameterNodePath);
        }



        /// <exclude />
        public static Dictionary<XElement, string> GetElementToPathMap(XDocument functionMarkup)
        {
            return GetElementToPathMap(functionMarkup.Root);
        }



        /// <exclude />
        public static Dictionary<XElement, string> GetElementToPathMap(XElement root)
        {
            var functionToPathMap = new Dictionary<XElement, string>();

            // Creating node->path dictionary
            int functionCounter = 0;
            foreach (XElement rootFunctionElement in root.Elements().GetFunctionsAndWidgetFunctions())
            {
                functionCounter++;

                functionToPathMap.Add(rootFunctionElement, GetRootFunctionPath(functionCounter));

                foreach (XElement element in rootFunctionElement.Descendants().Where(f=>f.Name == ParameterNodeName || f.Name == FunctionNodeName))
                {
                    string parentPathId;
                    if (functionToPathMap.TryGetValue(element.Parent, out parentPathId))
                    {
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
            }

            return functionToPathMap;
        }



        /// <exclude />
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



        /// <exclude />
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
                .Where(node => (node.Name == FunctionNodeName || node.Name == WidgetFunctionNodeName) && !node.Ancestors().Any(g=>g.Name.Namespace != Namespaces.Function10))
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



        /// <exclude />
        public static XElement GetParameterNode(XElement functionNode, string parameterName)
        {
            return (from parameter in functionNode.Elements()
                    let nameAttribute = parameter.Attribute("name")
                    where nameAttribute != null && nameAttribute.Value == parameterName
                    select parameter).FirstOrDefault();
        }



        /// <exclude />
        public static string GetNewId()
        {
            return Guid.NewGuid().ToString();
        }



        /// <exclude />
        public static XElement FindByPath(XElement root, string path)
        {
            int functionCounter = 0;
            foreach (XElement rootFunctionElement in root.Elements().GetFunctionsAndWidgetFunctions())
            {
                functionCounter++;
                string rootFunctionPath = GetRootFunctionPath(functionCounter);

                if (path == rootFunctionPath)
                {
                    return rootFunctionElement;
                }

                if (!path.StartsWith(rootFunctionPath + PathSeparator))
                {
                    continue;
                }

                foreach (XElement element in rootFunctionElement.Elements())
                {
                    XElement result = FindByPathRec(element, rootFunctionPath, path);
                    if (result != null) return result;
                }

                break;
            }

            return null;
        }

        internal static XElement FindByPathRec(XElement element, string parentPath, string pathToFind)
        {
            string path;

            if (element.Name == ParameterNodeName)
            {
                path = GetParameterPath(parentPath, element.Attribute("name").Value);
            }
            else if (element.Name == FunctionNodeName)
            {
                path = GetFunctionCallPath(parentPath);
            }
            else return null;

            if (pathToFind == path)
            {
                return element;
            }

            if (pathToFind.StartsWith(path + PathSeparator))
            {
                foreach (XElement child in element.Elements())
                {
                    XElement result = FindByPathRec(child, path, pathToFind);
                    if (result != null) return result;
                }
            }

            return null;
        }


        /// <exclude />
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



        /// <exclude />
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



        /// <exclude />
        public static IMetaFunction GetFunction(XElement functionNode)
        {
            string functionName = functionNode.Attribute("name").Value;

            if(functionNode.Name == WidgetFunctionNodeName)
            {
                return FunctionFacade.GetWidgetFunction(functionName);
            }

            return FunctionFacade.GetFunction(functionName);
        }


        /// <exclude />
        public static IEnumerable<XElement> GetFunctionsAndWidgetFunctions(this IEnumerable<XElement> elements)
        {
            return elements.Where(element => element.Name ==  FunctionNodeName || element.Name == WidgetFunctionNodeName);
        }
    }
}
