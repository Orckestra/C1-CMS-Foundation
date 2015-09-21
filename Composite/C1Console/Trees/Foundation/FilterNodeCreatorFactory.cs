using System;
using System.Xml.Linq;
using Composite.Functions.Foundation;
using Composite.Core.Types;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees.Foundation
{
	internal static class FilterNodeCreatorFactory
	{
        public static FilterNode CreateFilterNode(XElement filterElement, Tree tree)
        {
            if (filterElement.Name == TreeMarkupConstants.Namespace + "ParentIdFilter")
            {
                XAttribute parentTypeAttribute = filterElement.Attribute("ParentType");
                XAttribute referenceFieldNameAttribute = filterElement.Attribute("ReferenceFieldName");

                if (parentTypeAttribute == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ParentType");
                    return null;
                }

                if (referenceFieldNameAttribute == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ReferenceFieldName");
                    return null;
                }                
                

                Type parentInterfaceType = TypeManager.TryGetType(parentTypeAttribute.Value);
                if (parentInterfaceType == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.Common.UnknownInterfaceType", parentTypeAttribute.Value);
                    return null;
                }

                return new ParentIdFilterNode
                {
                    XPath = filterElement.GetXPath(),
                    Id = tree.BuildProcessContext.FilterIdCounter++,
                    ParentFilterType = parentInterfaceType,
                    ReferenceFieldName = referenceFieldNameAttribute.Value
                };
            }

            if (filterElement.Name == TreeMarkupConstants.Namespace + "FieldFilter")
            {
                XAttribute fieldNameAttribute = filterElement.Attribute("FieldName");
                XAttribute fieldValueAttribute = filterElement.Attribute("FieldValue");
                XAttribute operatorValueAttribute = filterElement.Attribute("Operator");

                if (fieldNameAttribute == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "FieldName");
                    return null;
                }

                if (fieldValueAttribute == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.Common.MissingAttribute", "FieldValue");
                    return null;
                }

                FieldFilterNodeOperator filterOperator;
                string operatorValue = operatorValueAttribute.GetValueOrDefault("equal");
                switch (operatorValue)
                {
                    case "equal":
                        filterOperator = FieldFilterNodeOperator.Equal;
                        break;

                    case "inequal":
                        filterOperator = FieldFilterNodeOperator.Inequal;
                        break;

                    case "lesser":
                        filterOperator = FieldFilterNodeOperator.Lesser;
                        break;

                    case "greater":
                        filterOperator = FieldFilterNodeOperator.Greater;
                        break;

                    case "lesserequal":
                        filterOperator = FieldFilterNodeOperator.LesserEqual;
                        break;

                    case "greaterequal":
                        filterOperator = FieldFilterNodeOperator.GreaterEqual;
                        break;

                    default:                        
                        tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.FieldFilter.UnknownOperatorName", operatorValue);
                        return null;
                }

                return new FieldFilterNode
                {
                    XPath = filterElement.GetXPath(),
                    Id = tree.BuildProcessContext.FilterIdCounter++,
                    FieldName = fieldNameAttribute.Value,
                    FieldValue = fieldValueAttribute.Value,
                    Operator = filterOperator
                };
            }

            if (filterElement.Name == TreeMarkupConstants.Namespace + "FunctionFilter")
            {
                XElement functionMarkupElement = filterElement.Element((XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.FunctionTagName);

                if (functionMarkupElement == null)
                {
                    tree.AddValidationError(filterElement.GetXPath(), "TreeValidationError.FunctionFilter.MissingFunctionMarkup");
                    return null;
                }

                return new FunctionFilterNode()
                {
                    XPath = filterElement.GetXPath(),
                    Id = tree.BuildProcessContext.FilterIdCounter++,
                    FunctionMarkup = functionMarkupElement
                };
            }

            throw new NotImplementedException("ValidationError");
        }
	}
}
