using System.Xml.Linq;

namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class Namespaces
	{
        static Namespaces()
        {
            Namespaces.BindingForms10 = Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilerGlobals.RootNamespaceURI;
            Namespaces.BindingFormsStdUiControls10 = "http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0";
            Namespaces.BindingFormsStdFuncLib10 = "http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0";
            Namespaces.Function10 = "http://www.composite.net/ns/function/1.0";
            Namespaces.Rendering10 = "http://www.composite.net/ns/rendering/1.0";
            Namespaces.DynamicData10 = "http://www.composite.net/ns/dynamicdata/1.0";

            Namespaces.AspNetControls = "http://www.composite.net/ns/asp.net/controls";

            Namespaces.Data = "http://www.composite.net/ns/data";

            Namespaces.XmlNs = "http://www.w3.org/2000/xmlns/";

            Namespaces.Xhtml = "http://www.w3.org/1999/xhtml";
            Namespaces.Xsl = "http://www.w3.org/1999/XSL/Transform";

            Namespaces.Xsi = "http://www.w3.org/2001/XMLSchema-instance";
            Namespaces.Xsd = "http://www.w3.org/2001/XMLSchema";
        }


        public static XNamespace BindingForms10 { get; private set; }
        public static XNamespace BindingFormsStdUiControls10 { get; private set; }
        public static XNamespace BindingFormsStdFuncLib10 { get; private set; }
        public static XNamespace Function10 { get; private set; }
        public static XNamespace Rendering10 { get; private set; }
        public static XNamespace AspNetControls { get; private set; }
        public static XNamespace Data { get; private set; }
        public static XNamespace DynamicData10 { get; private set; }


        public static XNamespace XmlNs { get; private set; }

        public static XNamespace Xhtml { get; private set; }
        public static XNamespace Xsl { get; private set; }
        public static XNamespace Xsi { get; private set; }
        public static XNamespace Xsd { get; private set; }

	}
}
