using System;
using System.Configuration;
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
                ThrowConfigurationError("Missing required attribute '{0}'".FormatWith(attributeName), configurationElement);
            }

            return result;
        }

        public static XElement GetRequiredElement(this XElement configurationElement, XName elementName)
        {
            var element = configurationElement.Element(elementName);

            if (element == null)
            {
                ThrowConfigurationError("Missing required element <{0}>".FormatWith(elementName), configurationElement);
            }

            return element;
        }

        public static string GetRequiredAttributeValue(this XElement configurationElement, XName attributeName)
        {
            string result = (string)configurationElement.Attribute(attributeName);

            if (string.IsNullOrEmpty(result))
            {
                ThrowConfigurationError("Required attribute '{0}' is missing or empty".FormatWith(attributeName), configurationElement);
            }

            return result;
        }

        public static void ThrowConfigurationError(string message, XObject configurationXObject)
        {
            var document = configurationXObject.Document;
            if (document != null && !string.IsNullOrEmpty(document.BaseUri) && (configurationXObject as IXmlLineInfo).HasLineInfo())
            {
                string fileName = GetFileName(document);
                int lineNumber = (configurationXObject as IXmlLineInfo).LineNumber;

                throw new ConfigurationErrorsException(message, fileName, lineNumber);
            }

            throw new InvalidOperationException(message);
        }

        public static Exception GetConfigurationException(string message, Exception innerException, XObject configurationXObject)
        {
            var document = configurationXObject.Document;
            if (document != null && !string.IsNullOrEmpty(document.BaseUri) && (configurationXObject as IXmlLineInfo).HasLineInfo())
            {
                string fileName = GetFileName(document);
                int lineNumber = (configurationXObject as IXmlLineInfo).LineNumber;

                throw new ConfigurationErrorsException(message, innerException, fileName, lineNumber);
            }

            throw new InvalidOperationException(message, innerException);
        }

        private static string GetFileName(XDocument document)
        {
            const string fileUriPrefix = "file:///";
            string baseUri = document.BaseUri;

            return baseUri.StartsWith(fileUriPrefix, StringComparison.Ordinal)
                ? baseUri.Substring(fileUriPrefix.Length)
                : baseUri;
        }
    }
}
