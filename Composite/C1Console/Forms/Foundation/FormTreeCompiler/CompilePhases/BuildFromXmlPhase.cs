using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    /// <summary>
    /// Converts form markup xml into tree of <see cref="CompileTreeNode"/>. Translates properties
    /// </summary>
    internal static class BuildFromXmlPhase
    {
        public static CompileTreeNode BuildTree(XDocument document)
        {
            return BuildRec(document.Root);
        }

        public static ElementCompileTreeNode BuildRec(XElement element)
        {
            int depth = element.Ancestors().Count();

            var debugInfo = new XmlSourceNodeInformation(depth, element.Name.LocalName, element.Name.LocalName, element.Name.NamespaceName);

            var result = new ElementCompileTreeNode(debugInfo);
            foreach (var attribute in element.Attributes())
            {
                if (attribute.Name.LocalName == "xmlns") continue;

                bool isNamespaceDeclaration = attribute.Name.NamespaceName == Namespaces.BindingFormsStdUiControls10;

                var property = new PropertyCompileTreeNode(attribute.Name.LocalName, debugInfo, isNamespaceDeclaration);
                property.Value = StringResourceSystemFacade.ParseString(attribute.Value);

                result.AddNamedProperty(property);
            }

            foreach (var node in element.Nodes())
            {
                if (node is XElement)
                {
                    result.Children.Add(BuildRec(node as XElement));
                    continue;
                }

                if (node is XText)
                {
                    string text = (node as XText).Value;

                    if (string.IsNullOrWhiteSpace(text))
                    {
                        continue;
                    }

                    var textProperty = new PropertyCompileTreeNode(CompilerGlobals.DefaultPropertyName, debugInfo);
                    textProperty.Value = StringResourceSystemFacade.ParseString(text);

                    result.DefaultProperties.Add(textProperty);
                    continue;
                }
            }

            return result;
        }
    }
}
