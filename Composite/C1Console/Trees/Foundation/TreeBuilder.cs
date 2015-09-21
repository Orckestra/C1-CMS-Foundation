using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees.Foundation
{
    internal static class TreeBuilder
    {
        public static Tree BuildTree(string treeId, XDocument document)
        {            
            Tree tree = new Tree(treeId);
            tree.BuildProcessContext = new BuildProcessContext();
            tree.BuildResult = new BuildResult();

            if (ValidateMarkup(tree, document) == false) return tree;

            try
            {
                BuildAutoAttachmentPoints(tree, document);
                BuildAllowedAttachmentPoints(tree, document);

                XElement elementRootElement = document.Descendants(TreeMarkupConstants.Namespace + "ElementRoot").Single();
                tree.RootTreeNode = BuildInnerTree(elementRootElement, null, tree);

                if ((tree.AttachmentPoints.OfType<DataItemAttachmentPoint>().Any()) &&
                    (tree.RootTreeNode.ChildNodes.Any()))
                {
                    // Only simple tree nodes allowed if data item attaching is done
                    tree.AddValidationError("", "TreeValidationError.DataAttachments.NoElementsAllowed");
                }

                if (tree.BuildResult.ValidationErrors.Count() == 0)
                {
                    tree.RootTreeNode.Initialize();
                }
            }
            catch (Exception ex)
            {
                tree.AddValidationError("", "TreeValidationError.Common.UnknownException", ex.Message);
            }

            return tree;
        }



        private static bool ValidateMarkup(Tree tree, XDocument document)
        {
            try
            {
                if (document.Root == null)
                {
                    tree.AddValidationError("", "TreeValidationError.Markup.NoRootElement");
                    return false;
                }

                bool schemaValidationResult = true;
                Action<object, ValidationEventArgs> onValidationError = (obj, args) =>
                {
                    tree.AddValidationError("", "TreeValidationError.Markup.SchemaError", args.Message, args.Exception.LineNumber, args.Exception.LinePosition);
                    schemaValidationResult = false;
                };

                XDocument schemaDocument = XDocumentUtils.Load(Path.Combine(PathUtil.Resolve("~/Composite/schemas/Trees"), "Tree.xsd"));
                IEnumerable<XElement> elements = schemaDocument.Descendants((XNamespace)"http://www.w3.org/2001/XMLSchema" + "import").ToList();
                foreach (XElement element in elements)
                {
                    element.Remove();
                }

                XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
                xmlReaderSettings.ValidationType = ValidationType.Schema;
                using (XmlReader schemaReader = schemaDocument.CreateReader())
                {
                    xmlReaderSettings.Schemas.Add(null, schemaReader);
                }
                xmlReaderSettings.Schemas.AddFromPath(null, Path.Combine(PathUtil.Resolve("~/Composite/schemas/Functions"), "Function.xsd"));
                //xmlReaderSettings.Schemas.AddFromPath(null, Path.Combine(PathUtil.Resolve("~/Composite/schemas/Trees"), "Tree.xsd"));                
                xmlReaderSettings.ValidationEventHandler += new ValidationEventHandler(onValidationError);
                xmlReaderSettings.ValidationFlags = XmlSchemaValidationFlags.ProcessSchemaLocation | XmlSchemaValidationFlags.ReportValidationWarnings;
                XmlReader xmlReader = XmlReader.Create(new StringReader(document.ToString()), xmlReaderSettings);

                while (xmlReader.Read()) ;

                if (schemaValidationResult == false)
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                tree.AddValidationError("", "TreeValidationError.Common.UnknownException", ex.Message);
                return false;
            }

            return true;
        }



        private static void BuildAutoAttachmentPoints(Tree tree, XDocument document)
        {            
            XElement element = document.Root.Elements(TreeMarkupConstants.Namespace + "ElementStructure.AutoAttachments").SingleOrDefault();
            if (element == null) return;

            IEnumerable<INamedAttachmentPoint> namedAttachmentPoints = BuildNamedAttachmentPoints(tree, element, () => new NamedAttachmentPoint());
            tree.AttachmentPoints.AddRange(namedAttachmentPoints.Cast<IAttachmentPoint>());

            IEnumerable<IDataItemAttachmentPoint> dataItemAttachmentPoint = BuildDataItemPoints(tree, element, () => new DataItemAttachmentPoint());
            tree.AttachmentPoints.AddRange(dataItemAttachmentPoint.Cast<IAttachmentPoint>());
        }



        private static void BuildAllowedAttachmentPoints(Tree tree, XDocument document)
        {
            XElement element = document.Root.Elements(TreeMarkupConstants.Namespace + "ElementStructure.AllowedAttachments").SingleOrDefault();
            if (element == null) return;

            XAttribute applicationNameAttribute = element.Attribute("ApplicationName");
            if (applicationNameAttribute != null)
            {
                tree.AllowedAttachmentApplicationName = applicationNameAttribute.Value;
            }
            else
            {
                tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ApplicationName");
                return;
            }

            //This is just illustrating the generic way of handling these things. Please leave this commet /MRJ
            //IEnumerable<INamedAttachmentPoint> namedAttachmentPoints = BuildNamedAttachmentPoints(tree, element, () => new NamedPossibleAttachmentPoint());
            //tree.PossibleAttachmentPoints.AddRange(namedAttachmentPoints.Cast<IPossibleAttachmentPoint>());

            IEnumerable<IDataItemAttachmentPoint> namedAttachmentPoints = BuildDataItemPoints(tree, element, () => new DataItemPossibleAttachmentPoint());
            tree.PossibleAttachmentPoints.AddRange(namedAttachmentPoints.Cast<IPossibleAttachmentPoint>());
        }



        private static IEnumerable<INamedAttachmentPoint> BuildNamedAttachmentPoints(Tree tree, XElement containerElement, Func<INamedAttachmentPoint> namedAttachmentPointFactory)
        {
            IEnumerable<XElement> namedElements = containerElement.Elements(TreeMarkupConstants.Namespace + "NamedParent");

            foreach (XElement namedElement in namedElements)
            {
                XAttribute nameAttribute = namedElement.Attribute("Name");

                if (nameAttribute == null)
                {
                    tree.AddValidationError(namedElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Name");
                    yield break;
                }

                AttachingPoint attachingPoint;
                switch (nameAttribute.Value)
                {
                    case "PerspectivesRoot":
                        attachingPoint = AttachingPoint.PerspectivesRoot;
                        break;

                    case "Content":
                        attachingPoint = AttachingPoint.ContentPerspective;
                        break;

                    case "Content.WebsiteItems":
                        attachingPoint = AttachingPoint.ContentPerspectiveWebsiteItems;
                        break;

                    case "Data":
                        attachingPoint = AttachingPoint.DataPerspective;
                        break;

                    case "Layout":
                        attachingPoint = AttachingPoint.DesignPerspective;
                        break;

                    case "Media":
                        attachingPoint = AttachingPoint.MediaPerspective;
                        break;

                    case "Function":
                        attachingPoint = AttachingPoint.FunctionPerspective;
                        break;

                    case "System":
                        attachingPoint = AttachingPoint.SystemPerspective;
                        break;
                    case null:
                    case "":
                        tree.AddValidationError(nameAttribute.GetXPath(), "TreeValidationError.AutoAttachments.UnknownAttachmentPoint", nameAttribute.Value);
                        attachingPoint = null;
                        break;
                    default:
                        attachingPoint = AttachingPoint.VirtualElementAttachingPoint(nameAttribute.Value);
                        break;
                }

                if (attachingPoint == null) yield break;

                INamedAttachmentPoint namedAttachmentPoint = namedAttachmentPointFactory();
                namedAttachmentPoint.AttachingPoint = attachingPoint;
                namedAttachmentPoint.Position = GetPosition(tree, namedElement);

                yield return namedAttachmentPoint;
            }
        }



        private static IEnumerable<IDataItemAttachmentPoint> BuildDataItemPoints(Tree tree, XElement containerElement, Func<IDataItemAttachmentPoint> dataItemAttachmentPointFactory)
        {
            IEnumerable<XElement> dataTypeElements = containerElement.Elements(TreeMarkupConstants.Namespace + "DataType");

            foreach (XElement dataTypeElement in dataTypeElements)
            {
                XAttribute typeAttribute = dataTypeElement.Attribute("Type");
                XAttribute positionAttribute = dataTypeElement.Attribute("Position");

                if (typeAttribute == null)
                {
                    tree.AddValidationError(dataTypeElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Type");
                    continue;
                }

                Type interfaceType = TypeManager.TryGetType(typeAttribute.Value);
                if (interfaceType == null)
                {
                    tree.AddValidationError(dataTypeElement.GetXPath(), "TreeValidationError.Common.UnknownInterfaceType", typeAttribute.Value);
                    continue;
                }

                IDataItemAttachmentPoint dataItemAttachmentPoint = dataItemAttachmentPointFactory();
                dataItemAttachmentPoint.InterfaceType = interfaceType;
                dataItemAttachmentPoint.Position = GetPosition(tree, dataTypeElement);

                yield return dataItemAttachmentPoint;
            }
        }
       


        private static ElementAttachingProviderPosition GetPosition(Tree tree, XElement namedElement)
        {
            XAttribute positionAttribute = namedElement.Attribute("Position");

            string position = positionAttribute.GetValueOrDefault("Top");
            switch (position)
            {
                case "Top":
                    return ElementAttachingProviderPosition.Top;

                case "Bottom":
                    return ElementAttachingProviderPosition.Bottom;

                default:
                    tree.AddValidationError(positionAttribute.GetXPath(), "TreeValidationError.AutoAttachments.UnknownAttachmentPosition", position);
                    return ElementAttachingProviderPosition.Top;;
            }
        }

    

        private static TreeNode BuildInnerTree(XElement element, TreeNode parentNode, Tree tree)
        {
            TreeNode treeNode = TreeNodeCreatorFactory.CreateTreeNode(element, tree);
            if (treeNode == null) return null;


            // Actions
            XElement actionsElement = element.Element(TreeMarkupConstants.Namespace + "Actions");
            if (actionsElement != null)
            {
                foreach (XElement actionElement in actionsElement.Elements())
                {
                    ActionNode actionNode = ActionNodeCreatorFactory.CreateActionNode(actionElement, tree);

                    if (actionNode != null)
                    {
                        treeNode.AddActionNode(actionNode);
                    }
                }
            }


            // OrderBys
            XElement orderBysElement = element.Element(TreeMarkupConstants.Namespace + "OrderBy");
            if (orderBysElement != null)
            {
                foreach (XElement orderByElement in orderBysElement.Elements())
                {
                    OrderByNode orderByNode = OrderByNodeCreatorFactory.CreateOrderByNode(orderByElement, tree);

                    if (orderByNode != null)
                    {
                        treeNode.AddOrderByNode(orderByNode);
                    }
                }
            }


            // Filters
            XElement filtersElement = element.Element(TreeMarkupConstants.Namespace + "Filters");
            if (filtersElement != null)
            {
                foreach (XElement filterElement in filtersElement.Elements())
                {
                    FilterNode filterNode = FilterNodeCreatorFactory.CreateFilterNode(filterElement, tree);

                    if (filterNode != null)
                    {
                        treeNode.AddFilterNode(filterNode);
                    }
                }
            }



            if (parentNode != null)
            {
                parentNode.AddChildTreeNode(treeNode);
            }
            


            // Children
            XElement childrenElement = element.Element(TreeMarkupConstants.Namespace + "Children");
            if (childrenElement != null)
            {
                foreach (XElement childElement in childrenElement.Elements())
                {
                    BuildInnerTree(childElement, treeNode, tree);
                }
            }


            treeNode.InitializeActions();
            treeNode.InitializeOrderByes();
            treeNode.InitializeFilters();           

            return treeNode;
        }
    }
}
