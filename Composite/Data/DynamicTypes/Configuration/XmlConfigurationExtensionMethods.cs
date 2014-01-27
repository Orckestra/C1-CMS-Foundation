using System;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Extensions;

namespace Composite.Data.DynamicTypes.Configuration
{
    internal static class XmlConfigurationExtensionMethods
    {
        public static XAttribute GetRequiredAttribute(this XElement configurationElement, XName attributeName)
        {
            XAttribute result = configurationElement.Attribute(attributeName);

            if (result == null)
            {
                ThrowConfiguraitonError("Missing required attribute '{0}'".FormatWith(attributeName), configurationElement);
            }

            return result;
        }

        public static XElement GetRequiredElement(this XElement configurationElement, XName elementName)
        {
            var element = configurationElement.Element(elementName);

            if (element == null)
            {
                ThrowConfiguraitonError("Missing required element <{0}>".FormatWith(elementName), configurationElement);
            }

            return element;
        }

        public static string GetRequiredAttributeValue(this XElement configurationElement, XName attributeName)
        {
            string result = (string)configurationElement.Attribute(attributeName);

            if (string.IsNullOrEmpty(result))
            {
                ThrowConfiguraitonError("Missing or empty required attribute '{0}'".FormatWith(attributeName), configurationElement);
            }

            return result;
        }

        public static void ThrowConfiguraitonError(string message, XObject configurationXObject)
        {
            var document = configurationXObject.Document;
            if (document != null && !string.IsNullOrEmpty(document.BaseUri) && (configurationXObject as IXmlLineInfo).HasLineInfo())
            {
                throw new XmlConfigurationException(message, configurationXObject);
            }

            throw new InvalidOperationException(message);
        }
    }
}
