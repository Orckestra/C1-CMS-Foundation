using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees.Foundation
{
    internal static class TreeNodeCreatorFactory
    {
        private static readonly string DefaultFolderResourceName = "folder";
        private static readonly string DefaultOpenedFolderResourceName = "folder-open";
        private static readonly string DefaultDataGroupingFolderResourceName = "folder-disabled";



        public static TreeNode CreateTreeNode(XElement element, Tree tree)
        {
            if (element.Name == TreeMarkupConstants.Namespace + "ElementRoot")
            {
                return new RootTreeNode
                {
                    Tree = tree,
                    Id = tree.BuildProcessContext.CreateNewNodeId()
                };
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "Element")
            {
                XAttribute idAttribute = element.Attribute("Id");
                XAttribute labelAttribute = element.Attribute("Label");
                XAttribute toolTipAttribute = element.Attribute("ToolTip");
                XAttribute iconAttribute = element.Attribute("Icon");
                XAttribute openedIconAttribute = element.Attribute("OpenedIcon");                

                if (idAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Id");
                    return null;
                }
                else if ((idAttribute.Value == "") || (idAttribute.Value == "RootTreeNode") || (idAttribute.Value.StartsWith("NodeAutoId_") == true))
                {
                    tree.AddValidationError(idAttribute.GetXPath(), "TreeValidationError.SimpleElement.WrongIdValue");
                }
                else if (tree.BuildProcessContext.AlreadyUsed(idAttribute.Value) == true)
                {
                    tree.AddValidationError(idAttribute.GetXPath(), "TreeValidationError.SimpleElement.AlreadyUsedId", idAttribute.Value);
                }
                else
                {
                    tree.BuildProcessContext.AddUsedId(idAttribute.Value);
                }


                if (labelAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Label");
                    return null;
                }

                ResourceHandle icon = FactoryHelper.GetIcon(iconAttribute.GetValueOrDefault(DefaultFolderResourceName));
                ResourceHandle openedIcon = FactoryHelper.GetIcon(openedIconAttribute.GetValueOrDefault(DefaultOpenedFolderResourceName));
                if ((iconAttribute != null) && (openedIconAttribute == null))
                {
                    openedIcon = icon;
                }

                return new SimpleElementTreeNode
                {
                    Tree = tree,
                    Id = idAttribute.Value,
                    Label = labelAttribute.Value,
                    ToolTip = toolTipAttribute.GetValueOrDefault(labelAttribute.Value),
                    Icon = icon,
                    OpenIcon = openedIcon
                };
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "FunctionElementGenerator")
            {
                XAttribute labelAttribute = element.Attribute("Label");
                XAttribute toolTipAttribute = element.Attribute("ToolTip");
                XAttribute iconAttribute = element.Attribute("Icon");

                XElement functionMarkupContainerElement = element.Element(TreeMarkupConstants.Namespace + "FunctionMarkup");
                if (functionMarkupContainerElement == null)
                {
                    //MRJ: DSLTree: FunctionElementGeneratorTreeNode: Validation error
                }

                XElement functionMarkupElement = functionMarkupContainerElement.Element((XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.FunctionTagName);
                if (functionMarkupElement == null)
                {
                    //MRJ: DSLTree: FunctionElementGeneratorTreeNode: Validation error
                }
                

                if (labelAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Label");
                    return null;
                }

                return new FunctionElementGeneratorTreeNode
                {
                    Tree = tree,
                    Id = tree.BuildProcessContext.CreateNewNodeId(),
                    FunctionMarkup = functionMarkupElement,
                    Label = labelAttribute.Value,
                    ToolTip = toolTipAttribute.GetValueOrDefault(labelAttribute.Value),
                    Icon = FactoryHelper.GetIcon(iconAttribute.GetValueOrDefault(DefaultFolderResourceName))
                };
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "DataElements")
            {
                XAttribute typeAttribute = element.Attribute("Type");
                XAttribute labelAttribute = element.Attribute("Label");
                XAttribute toolTipAttribute = element.Attribute("ToolTip");
                XAttribute iconAttribute = element.Attribute("Icon");
                XAttribute openedIconAttribute = element.Attribute("OpenedIcon");
                XAttribute showForeignItemsAttribute = element.Attribute("ShowForeignItems");
                XAttribute leafDisplayAttribute = element.Attribute("Display");

                if (typeAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Type");
                    return null;
                }

                Type interfaceType = TypeManager.TryGetType(typeAttribute.Value);
                if (interfaceType == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnkownInterfaceType", typeAttribute.Value);
                    return null;
                }


                LeafDisplayMode leafDisplay = LeafDisplayModeHelper.ParseDisplayMode(leafDisplayAttribute, tree);


                ResourceHandle icon = null;
                if (iconAttribute != null) icon = FactoryHelper.GetIcon(iconAttribute.Value);

                ResourceHandle openedIcon = null;
                if ((icon != null) && (openedIconAttribute == null)) openedIcon = icon;
                else if (openedIconAttribute != null) openedIcon = FactoryHelper.GetIcon(openedIconAttribute.Value);

                DataElementsTreeNode dataElementsTreeNode = new DataElementsTreeNode
                {
                    Tree = tree,
                    Id = tree.BuildProcessContext.CreateNewNodeId(),
                    InterfaceType = interfaceType,
                    Label = labelAttribute.GetValueOrDefault(null),
                    ToolTip = toolTipAttribute.GetValueOrDefault(null),
                    Icon = icon,
                    OpenedIcon = openedIcon,
                    ShowForeignItems = showForeignItemsAttribute.GetValueOrDefault("true").ToLowerInvariant() == "true",
                    Display = leafDisplay
                };

                List<TreeNode> treeNodes;
                if (tree.BuildProcessContext.DataInteraceToTreeNodes.TryGetValue(interfaceType, out treeNodes) == false)
                {
                    treeNodes = new List<TreeNode>();
                    tree.BuildProcessContext.DataInteraceToTreeNodes.Add(interfaceType, treeNodes);
                }

                treeNodes.Add(dataElementsTreeNode);

                return dataElementsTreeNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "DataFolderElements")
            {
                XAttribute typeAttribute = element.Attribute("Type");
                XAttribute fieldGroupingNameAttribute = element.Attribute("FieldGroupingName");
                XAttribute dateFormatAttribute = element.Attribute("DateFormat");
                XAttribute iconAttribute = element.Attribute("Icon");
                XAttribute rangeAttribute = element.Attribute("Range");
                XAttribute firstLetterOnlyAttribute = element.Attribute("FirstLetterOnly");
                XAttribute showForeignItemsAttribute = element.Attribute("ShowForeignItems");
                XAttribute leafDisplayAttribute = element.Attribute("Display");


                if (fieldGroupingNameAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "FieldGroupingName");
                    return null;
                }

                Type interfaceType = null;
                if (typeAttribute != null)
                {
                    interfaceType = TypeManager.TryGetType(typeAttribute.Value);
                    if (interfaceType == null)
                    {
                        tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnkownInterfaceType", typeAttribute.Value);
                        return null;
                    }
                }

                bool firstLetterOnly = false;
                if (firstLetterOnlyAttribute != null)
                {
                    if (firstLetterOnlyAttribute.TryGetBoolValue(out firstLetterOnly) == false)
                    {
                        tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.WrongAttributeValue", "FirstLetterOnly");
                    }
                }

                LeafDisplayMode leafDisplay = LeafDisplayModeHelper.ParseDisplayMode(leafDisplayAttribute, tree);

                return new DataFolderElementsTreeNode
                {
                    Tree = tree,
                    Id = tree.BuildProcessContext.CreateNewNodeId(),
                    InterfaceType = interfaceType,
                    Icon = FactoryHelper.GetIcon(iconAttribute.GetValueOrDefault(DefaultDataGroupingFolderResourceName)),
                    FieldName = fieldGroupingNameAttribute.Value,
                    DateFormat = dateFormatAttribute.GetValueOrDefault(null),
                    Range = rangeAttribute.GetValueOrDefault(null),
                    FirstLetterOnly = firstLetterOnly,
                    ShowForeignItems = showForeignItemsAttribute.GetValueOrDefault("true").ToLowerInvariant() == "true",
                    Display = leafDisplay
                };
            }
            else
            {
                tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnknownElement", element.Name);

                return null;
            }
        }
    }
}
