using System.Collections.Generic;

using Composite.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;


namespace Composite.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class UpdateXmlInformationPhase
    {
        public void UpdateInformation(CompileTreeNode startNode)
        {
            UpdateInformation(startNode, "", null);
        }


        private void UpdateInformation(CompileTreeNode node, string currentXPath, int? childNumber)
        {
            if (true == childNumber.HasValue)
            {
                currentXPath = string.Format("{0}/{1}[{2}]", currentXPath, node.XmlSourceNodeInformation.TagName, childNumber.Value);
            }
            else
            {
                currentXPath = string.Format("{0}/{1}", currentXPath, node.XmlSourceNodeInformation.TagName);
            }

            node.XmlSourceNodeInformation.XPath = currentXPath;

            Dictionary<string, int> tagOccursCount = new Dictionary<string, int>();
            Dictionary<string, int> xPathCounter = new Dictionary<string, int>();

            foreach (CompileTreeNode child in node.Children)
            {
                if (false == tagOccursCount.ContainsKey(child.XmlSourceNodeInformation.Name)) tagOccursCount.Add(child.XmlSourceNodeInformation.Name, 0);

                tagOccursCount[child.XmlSourceNodeInformation.Name]++;
            }

            foreach (CompileTreeNode child in node.Children)
            {
                if (tagOccursCount[child.XmlSourceNodeInformation.Name] > 1)
                {
                    if (false == xPathCounter.ContainsKey(child.XmlSourceNodeInformation.Name)) xPathCounter.Add(child.XmlSourceNodeInformation.Name, 1);

                    UpdateInformation(child, currentXPath, xPathCounter[child.XmlSourceNodeInformation.Name]++);
                }
                else
                {
                    UpdateInformation(child, currentXPath, null);
                }
            }

            foreach (PropertyCompileTreeNode nameProperty in node.AllNamedProperties)
            {
                nameProperty.XmlSourceNodeInformation.NamespaceURI = node.XmlSourceNodeInformation.NamespaceURI;

                UpdateInformation(nameProperty, currentXPath, null);
            }

            if (node.DefaultProperties.Count == 1)
            {
                node.DefaultProperties[0].XmlSourceNodeInformation.NamespaceURI = node.XmlSourceNodeInformation.NamespaceURI;

                UpdateInformation(node.DefaultProperties[0], currentXPath, null);
            }
            else if (node.DefaultProperties.Count > 1)
            {
                int counter = 1;
                foreach (CompileTreeNode defaultProperty in node.DefaultProperties)
                {
                    defaultProperty.XmlSourceNodeInformation.NamespaceURI = node.XmlSourceNodeInformation.NamespaceURI;

                    UpdateInformation(defaultProperty, currentXPath, counter++);
                }
            }
        }
    }
}
