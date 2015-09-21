using System;
using System.Linq;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;


namespace Composite.C1Console.Trees.Foundation
{
    internal static class TreeNodeCreatorFactory
    {
        private static readonly string DefaultFolderResourceName = "folder";
        private static readonly string DefaultOpenedFolderResourceName = "folder-open";
        private static readonly string DefaultDataGroupingFolderResourceName = "folder";

        
        public static TreeNode CreateTreeNode(XElement element, Tree tree)
        {
            if (element.Name == TreeMarkupConstants.Namespace + "ElementRoot")
            {
                return BuildRootTreeNode(element, tree);
            }

            if (element.Name == TreeMarkupConstants.Namespace + "Element")
            {
                return BuildSimpleElementTreeNode(element, tree);
            }

            if (element.Name == TreeMarkupConstants.Namespace + "FunctionElementGenerator")
            {
                return BuildFunctionElementGeneratorTreeNode(element, tree);
            }

            if (element.Name == TreeMarkupConstants.Namespace + "DataElements")
            {
                return BuildDataElementsTreeNode(element, tree);
            }

            if (element.Name == TreeMarkupConstants.Namespace + "DataFolderElements")
            {
                return BuildDataFolderElementsTreeNode(element, tree);
            }
            
            tree.AddValidationError(element, "TreeValidationError.Common.UnknownElement", element.Name);
            return null;
        }


        private static TreeNode BuildDataFolderElementsTreeNode(XElement element, Tree tree)
        {
            XAttribute typeAttribute = element.Attribute("Type");
            XAttribute fieldGroupingNameAttribute = element.Attribute("FieldGroupingName");
            XAttribute dateFormatAttribute = element.Attribute("DateFormat");
            XAttribute iconAttribute = element.Attribute("Icon");
            XAttribute rangeAttribute = element.Attribute("Range");
            XAttribute firstLetterOnlyAttribute = element.Attribute("FirstLetterOnly");
            XAttribute showForeignItemsAttribute = element.Attribute("ShowForeignItems");
            XAttribute leafDisplayAttribute = element.Attribute("Display");
            XAttribute sortDirectionAttribute = element.Attribute("SortDirection");


            if (fieldGroupingNameAttribute == null)
            {
                tree.AddValidationError(element, "TreeValidationError.Common.MissingAttribute", "FieldGroupingName");
                return null;
            }

            Type interfaceType = null;
            if (typeAttribute != null)
            {
                interfaceType = TypeManager.TryGetType(typeAttribute.Value);
                if (interfaceType == null)
                {
                    tree.AddValidationError(element, "TreeValidationError.Common.UnknownInterfaceType", typeAttribute.Value);
                    return null;
                }
            }

            bool firstLetterOnly = false;
            if (firstLetterOnlyAttribute != null)
            {
                if (!firstLetterOnlyAttribute.TryGetBoolValue(out firstLetterOnly))
                {
                    tree.AddValidationError(element, "TreeValidationError.Common.WrongAttributeValue", "FirstLetterOnly");
                }
            }

            LeafDisplayMode leafDisplay = LeafDisplayModeHelper.ParseDisplayMode(leafDisplayAttribute, tree);
            SortDirection sortDirection = ParseSortDirection(sortDirectionAttribute, tree);

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
                    Display = leafDisplay,
                    SortDirection = sortDirection
                };
        }

        public static SortDirection ParseSortDirection(XAttribute attribute, Tree tree)
        {
            if (attribute != null)
            {
                SortDirection parsedValue;

                if (Enum.TryParse(attribute.Value, out parsedValue))
                {
                    return parsedValue;
                }

                tree.AddValidationError(attribute, "TreeValidationError.Common.WrongAttributeValue", attribute.Value);
            }

            return SortDirection.Ascending;
        }

        private static TreeNode BuildDataElementsTreeNode(XElement element, Tree tree)
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
                tree.AddValidationError(element, "TreeValidationError.Common.MissingAttribute", "Type");
                return null;
            }

            Type interfaceType = TypeManager.TryGetType(typeAttribute.Value);
            if (interfaceType == null)
            {
                tree.AddValidationError(element, "TreeValidationError.Common.UnknownInterfaceType",
                                        typeAttribute.Value);
                return null;
            }


            LeafDisplayMode leafDisplay = LeafDisplayModeHelper.ParseDisplayMode(leafDisplayAttribute, tree);


            ResourceHandle icon = null;
            if (iconAttribute != null) icon = FactoryHelper.GetIcon(iconAttribute.Value);

            ResourceHandle openedIcon = null;
            if (icon != null && openedIconAttribute == null) openedIcon = icon;
            else if (openedIconAttribute != null) openedIcon = FactoryHelper.GetIcon(openedIconAttribute.Value);

            var dataElementsTreeNode = new DataElementsTreeNode
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

        private static TreeNode BuildFunctionElementGeneratorTreeNode(XElement element, Tree tree)
        {
            XAttribute labelAttribute = element.Attribute("Label");
            XAttribute toolTipAttribute = element.Attribute("ToolTip");
            XAttribute iconAttribute = element.Attribute("Icon");

            XElement functionMarkupContainerElement = element.Element(TreeMarkupConstants.Namespace + "FunctionMarkup");
            if (functionMarkupContainerElement == null)
            {
                //MRJ: DSLTree: FunctionElementGeneratorTreeNode: Validation error
            }

            XElement functionMarkupElement = functionMarkupContainerElement.Element((XNamespace) FunctionTreeConfigurationNames.NamespaceName +
                                                       FunctionTreeConfigurationNames.FunctionTagName);
            if (functionMarkupElement == null)
            {
                //MRJ: DSLTree: FunctionElementGeneratorTreeNode: Validation error
            }


            if (labelAttribute == null)
            {
                tree.AddValidationError(element, "TreeValidationError.Common.MissingAttribute", "Label");
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

        private static TreeNode BuildSimpleElementTreeNode(XElement element, Tree tree)
        {
            XAttribute idAttribute = element.Attribute("Id");
            XAttribute labelAttribute = element.Attribute("Label");
            XAttribute toolTipAttribute = element.Attribute("ToolTip");
            XAttribute iconAttribute = element.Attribute("Icon");
            XAttribute openedIconAttribute = element.Attribute("OpenedIcon");

            if (idAttribute == null)
            {
                tree.AddValidationError(element, "TreeValidationError.Common.MissingAttribute", "Id");
                return null;
            }

            if (idAttribute.Value == "" || idAttribute.Value == "RootTreeNode" || idAttribute.Value.StartsWith("NodeAutoId_"))
            {
                tree.AddValidationError(idAttribute, "TreeValidationError.SimpleElement.WrongIdValue");
            }
            else if (tree.BuildProcessContext.AlreadyUsed(idAttribute.Value))
            {
                tree.AddValidationError(idAttribute, "TreeValidationError.SimpleElement.AlreadyUsedId", idAttribute.Value);
            }
            else
            {
                tree.BuildProcessContext.AddUsedId(idAttribute.Value);
            }


            if (labelAttribute == null)
            {
                tree.AddValidationError(element, "TreeValidationError.Common.MissingAttribute", "Label");
                return null;
            }

            ResourceHandle icon = FactoryHelper.GetIcon(iconAttribute.GetValueOrDefault(DefaultFolderResourceName));
            ResourceHandle openedIcon =
                FactoryHelper.GetIcon(openedIconAttribute.GetValueOrDefault(DefaultOpenedFolderResourceName));
            if (iconAttribute != null && openedIconAttribute == null)
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

        private static TreeNode BuildRootTreeNode(XElement element, Tree tree)
        {
            XAttribute shareRootElementByIdAttribute = element.Attribute("ShareRootElementById");
            if (shareRootElementByIdAttribute != null)
            {
                tree.ShareRootElementById = (bool) shareRootElementByIdAttribute;

                if (tree.ShareRootElementById)
                {
                    int count = tree.AttachmentPoints.OfType<NamedAttachmentPoint>().Count();
                    if (count != 1 || tree.AttachmentPoints.Count > count)
                    {
                        tree.AddValidationError(shareRootElementByIdAttribute, "TreeValidationError.ElementRoot.ShareRootElementByIdNotAllowed");
                    }
                }
            }

            return new RootTreeNode
                {
                    Tree = tree,
                    Id = tree.BuildProcessContext.CreateNewNodeId()
                };
        }
    }
}
