using System;
using System.Xml.Linq;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees.Foundation
{
    internal static class OrderByNodeCreatorFactory
    {
        public static OrderByNode CreateOrderByNode(XElement element, Tree tree)
        {
            if (element.Name == TreeMarkupConstants.Namespace + "Field")
            {
                XAttribute nameAttribute = element.Attribute("FieldName");
                XAttribute directionAttribute = element.Attribute("Direction");

                if (nameAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "FieldName");
                    return null;
                }

                return new FieldOrderByNode
                {
                    XPath = element.GetXPath(),
                    FieldName = nameAttribute.Value,                    
                    Direction = directionAttribute.GetValueOrDefault("ascending")
                };
            }
            else
            {
                throw new InvalidOperationException(string.Format("OrderBy node {0} not supported", element.Name));
            }
        }
    }
}
