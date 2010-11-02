using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Composite.Functions;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
	internal static class FlowUiQueryMarkupHelper
	{
        private static readonly XNamespace ui = "http://www.w3.org/1999/xhtml";


        public static void ParseXml(string theXml, out IEnumerable<KeyValuePair<string, string>> queries, out ILookup<string, KeyValuePair<string, string>> parameterLookup)
        {
            XDocument document = XDocument.Parse(theXml);

            queries =
                 from nodes in document.Descendants(ui + "treenode")
                 where (string)nodes.Attribute("binding") == "QueryTreeNodeBinding"
                 select new KeyValuePair<string, string>((string)nodes.Attribute("localname"), (string)nodes.Attribute("ElementId"));

            var paramList =
                from nodes in document.Descendants(ui + "treenode")
                where (string)nodes.Attribute("binding") == "QueryParamTreeNodeBinding"
                select new { QueryLocalName = (string)nodes.Parent.Attribute("localname"), Name = (string)nodes.Attribute("paramname"), Value = (string)nodes.Attribute("paramvalue") };

            parameterLookup = paramList.ToLookup(f => f.QueryLocalName, f => new KeyValuePair<string, string>(f.Name, f.Value));
        }



        public static string BuildXml(IEnumerable<KeyValuePair<string, string>> queries, ILookup<string, KeyValuePair<string, string>> parameters)
        {
            
            var usedQueryInfos =
                from query in queries
                select new { LocalName = query.Key, QueryInfo = FunctionFacade.GetFunction(query.Value) };

            var paramsDictionary = parameters.ToDictionary(f => f.Key);

            XElement rootElement = new XElement(ui + "treebody");

            foreach (var namedQueryInfo in usedQueryInfos.OrderBy(f => f.QueryInfo.Namespace + f.QueryInfo.Name + f.LocalName))
            {
                IFunction queryInfo = namedQueryInfo.QueryInfo;

                XElement currentNamespaceFolder = rootElement;

                if (string.IsNullOrEmpty(queryInfo.Namespace) == false)
                {
                    string piecemealNamespace = "";

                    foreach (string namespaceSegment in queryInfo.Namespace.Split('.'))
                    {
                        if (string.IsNullOrEmpty(piecemealNamespace) == false) piecemealNamespace = piecemealNamespace + ".";
                        piecemealNamespace = piecemealNamespace + namespaceSegment;

                        XElement existingFolder =
                            (from folderElement in rootElement.Descendants(ui + "treenode")
                             where (string)folderElement.Attribute("binding") == "QueryFolderTreeNodeBinding" && (string)folderElement.Attribute("ElementId") == piecemealNamespace
                             select folderElement).FirstOrDefault();

                        if (existingFolder == null)
                        {
                            XElement subFolder = new XElement(ui + "treenode",
                                                     new XAttribute("binding", "QueryFolderTreeNodeBinding"),
                                                     new XAttribute("ElementId", piecemealNamespace),
                                                     new XAttribute("label", namespaceSegment));
                            currentNamespaceFolder.Add(subFolder);

                            currentNamespaceFolder = subFolder;
                        }
                        else
                        {
                            currentNamespaceFolder = existingFolder;
                        }
                    }
                }


                IGrouping<string, KeyValuePair<string, string>> currentQueryParams;
                bool hasParams = paramsDictionary.TryGetValue(namedQueryInfo.LocalName, out currentQueryParams);

                currentNamespaceFolder.Add(
                    new XElement(ui + "treenode",
                        new XAttribute("binding", "QueryTreeNodeBinding"),
                        new XAttribute("queryname", queryInfo.Name),
                        new XAttribute("localname", namedQueryInfo.LocalName),
                        new XAttribute("ElementId", queryInfo.CompositeName()),
                        from parameter in queryInfo.ParameterProfiles
                        orderby parameter.Name
                        select new XElement(ui + "treenode",
                            new XAttribute("binding", "QueryParamTreeNodeBinding"),
                            new XAttribute("paramname", parameter.Name),
                            new XAttribute("hasvalue", hasParams && currentQueryParams.Count(f => f.Key == parameter.Name) == 1),
                            (hasParams && currentQueryParams.Count(f => f.Key == parameter.Name && f.Value != null) == 1 ? new XAttribute("paramvalue", currentQueryParams.First(f => f.Key == parameter.Name).Value) : null))));
            }

            XmlDocument output = new XmlDocument();
            output.LoadXml(rootElement.ToString());
            XmlNamespaceManager namespaceManager = new XmlNamespaceManager(output.NameTable);
            namespaceManager.AddNamespace("ui", ui.ToString());
            XmlNodeList allNodes = output.SelectNodes("//*");
            foreach (XmlNode node in allNodes)
            {
                node.Prefix = "ui";
            }
            output.DocumentElement.RemoveAttribute("xmlns");
            return IndentedOuterXml(output);

        }


        public static string IndentedOuterXml(XmlNode node)
        {
            System.IO.StringWriter stringWriter = new System.IO.StringWriter();
            XmlTextWriter xmlTextWriter = new XmlTextWriter(stringWriter);
            xmlTextWriter.Formatting = Formatting.Indented;
            node.WriteTo(xmlTextWriter);
            return stringWriter.ToString();
        }
	}
}
