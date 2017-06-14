using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Composite.Data;
using Composite.Core.ResourceSystem;


namespace Composite.Core.Localization
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LocalizationParser
    {
        private static readonly Regex _attributRegex = new Regex(@"\$\((?<type>[^:]+):(?<id>[^\)]+)\)");


        /// <exclude />
        public static void Parse(XContainer container)
        {
            IEnumerable<XElement> elements = container.Descendants().ToList();

            foreach (XElement element in elements)
            {
                if (element.Name.Namespace == LocalizationXmlConstants.XmlNamespace)
                {
                    if (element.Name.LocalName == "string")
                    {
                        HandleStringElement(element);
                    }
                    else if (element.Name.LocalName == "switch")
                    {
                        HandleSwitchElement(element);
                    }
                }

                IEnumerable<XAttribute> attributes = element.Attributes().ToList();
                foreach (XAttribute attribute in attributes)
                {
                    Match match = _attributRegex.Match(attribute.Value);
                    if (match.Success && match.Groups["type"].Value == "lang") 
                    {
                        string newValue = StringResourceSystemFacade.ParseString($"${{{match.Groups["id"].Value}}}");
                        attribute.SetValue(newValue);
                    }
                }
            }
        }



        private static void HandleStringElement(XElement element)
        {
            XAttribute attribute = element.Attribute("key");
            if (attribute == null) throw new InvalidOperationException($"Missing attibute named 'key' at {element}");

            string newValue = StringResourceSystemFacade.ParseString($"${{{attribute.Value}}}");

            element.ReplaceWith(newValue);
        }



        private static void HandleSwitchElement(XElement element)
        {
            XElement defaultElement = element.Element((XNamespace)LocalizationXmlConstants.XmlNamespace + "default");
            Verify.IsNotNull(defaultElement, "Missing element named 'default' at {0}", element);


            XElement newValueParent = defaultElement;

            CultureInfo currentCultureInfo = LocalizationScopeManager.CurrentLocalizationScope;
            foreach (XElement whenElement in element.Elements((XNamespace)LocalizationXmlConstants.XmlNamespace + "when"))
            {
                XAttribute cultureAttribute = whenElement.Attribute("culture");
                Verify.IsNotNull(cultureAttribute, "Missing attriubte named 'culture' at {0}", whenElement);

                CultureInfo cultureInfo = new CultureInfo(cultureAttribute.Value);
                if (cultureInfo.Equals(currentCultureInfo))
                {
                    newValueParent = whenElement;
                    break;
                }
            }

            element.ReplaceWith(newValueParent.Nodes());
        }
    }
}
