using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.Core.Xml
{
    /// <summary>    
    /// Commonly used XML namespaces
    /// </summary>
	public static class Namespaces
	{
        private static readonly Dictionary<XNamespace, string> _canonicalPrefixes = new Dictionary<XNamespace, string>();

        static Namespaces()
        {
            Namespaces.BindingForms10 = Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilerGlobals.RootNamespaceURI;
            Namespaces.BindingFormsStdUiControls10 = "http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0";
            Namespaces.BindingFormsStdFuncLib10 = "http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0";
            Namespaces.Function10 = "http://www.composite.net/ns/function/1.0";
            Namespaces.Rendering10 = "http://www.composite.net/ns/rendering/1.0";
            Namespaces.Localization10 = "http://www.composite.net/ns/localization/1.0";
            Namespaces.DynamicData10 = "http://www.composite.net/ns/dynamicdata/1.0";

            Namespaces.AspNetControls = "http://www.composite.net/ns/asp.net/controls";

            Namespaces.Data = "http://www.composite.net/ns/data";

            Namespaces.XmlNs = "http://www.w3.org/2000/xmlns/";

            Namespaces.Xhtml = "http://www.w3.org/1999/xhtml";
            Namespaces.Svg = "http://www.w3.org/2000/svg";
            Namespaces.Xsl = "http://www.w3.org/1999/XSL/Transform";

            Namespaces.Xsi = "http://www.w3.org/2001/XMLSchema-instance";
            Namespaces.Xsd = "http://www.w3.org/2001/XMLSchema";

            Namespaces.Components = "http://www.composite.net/ns/components/1.0";

            _canonicalPrefixes.Add(Namespaces.Function10, "f");
            _canonicalPrefixes.Add(Namespaces.Svg, "svg");
            _canonicalPrefixes.Add(Namespaces.Rendering10, "rendering");
            _canonicalPrefixes.Add(Namespaces.Xsl, "xsl");
            _canonicalPrefixes.Add(Namespaces.AspNetControls, "asp");
        }


        /// <summary>
        /// Namespace for handling forms in the C1 Console: http://www.composite.net/ns/management/bindingforms/1.0
        /// </summary>
        public static XNamespace BindingForms10 { get; private set; }

        /// <summary>
        /// Namespace for handling forms in the C1 Console: http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0
        /// </summary>
        public static XNamespace BindingFormsStdUiControls10 { get; private set; }

        /// <summary>
        /// Namespace for handling forms in the C1 Console: http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0
        /// </summary>
        public static XNamespace BindingFormsStdFuncLib10 { get; private set; }

        /// <summary>
        /// Namespace for C1 Functions: http://www.composite.net/ns/function/1.0
        /// </summary>
        public static XNamespace Function10 { get; private set; }

        /// <summary>
        /// Namespace for rendering page title, description and content: http://www.composite.net/ns/rendering/1.0
        /// </summary>
        public static XNamespace Rendering10 { get; private set; }

        /// <summary>
        /// Namespace for getting localized strings or content: http://www.composite.net/ns/localization/1.0
        /// </summary>
        public static XNamespace Localization10 { get; private set; }

        /// <summary>
        /// Namespace for ASP.NET Web Forms in C1 CMS pages: http://www.composite.net/ns/asp.net/controls
        /// </summary>
        public static XNamespace AspNetControls { get; private set; }

        /// <summary>
        /// Namespace for refering to data types: http://www.composite.net/ns/data
        /// </summary>
        public static XNamespace Data { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace DynamicData10 { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace XmlNs { get; private set; }

        /// <summary>
        /// Namespace for XHTML documents in C1 CMS: http://www.w3.org/1999/xhtml
        /// </summary>
        public static XNamespace Xhtml { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace Svg { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace Xsl { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace Xsi { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace Xsd { get; private set; }

        /// <summary>
        /// Namespace
        /// </summary>
        public static XNamespace Components { get; private set; }

        /// <summary>
        /// If known returns a canonical prefix for a given XML namespace
        /// </summary>
        /// <param name="xmlns">Namespace to match</param>
        /// <param name="prefix">prefix for namespace, if any</param>
        /// <returns>True when a prefix was found, otherwise false</returns>
        public static bool TryGetCanonicalPrefix(XNamespace xmlns, out string prefix)
        {
            return _canonicalPrefixes.TryGetValue(xmlns, out prefix);            
        }
	}
}
