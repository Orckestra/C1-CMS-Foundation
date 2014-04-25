using System.ComponentModel;
using System.Xml.Linq;


namespace Composite.Functions.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class FunctionTreeConfigurationNames
    {
        private static readonly XName _paramTag = (XNamespace) NamespaceName + ParamTagName;
        private static readonly XName _paramElementTag = (XNamespace) NamespaceName + ParamElementTagName;
        private static readonly XName _valueAttribute = ValueAttributeName;
        private static readonly XName _nameAttribute = NameAttributeName;

        /// <exclude />
        public static XName ParamTag { get { return _paramTag; } }

        /// <exclude />
        public static XName ParamElementTag { get { return _paramElementTag; } }

        /// <exclude />
        public static XName NameAttribute { get { return _nameAttribute; } }

        /// <exclude />
        public static XName ValueAttribute { get { return _valueAttribute; } }

        /// <exclude />
        public static string NamespaceName { get { return "http://www.composite.net/ns/function/1.0"; } }

        /// <exclude />
        public static string ParamTagName { get { return "param"; } }

        /// <exclude />
        public static string ParamElementTagName { get { return "paramelement"; } }

        /// <exclude />
        public static string FunctionTagName { get { return "function"; } }

        /// <exclude />
        public static string WidgetFunctionTagName { get { return "widgetfunction"; } }

        /// <exclude />
        public static string HelpDefinitionTagName { get { return "helpdefinition"; } }

        /// <exclude />
        public static string NameAttributeName { get { return "name"; } }

        /// <exclude />
        public static string ValueAttributeName { get { return "value"; } }

        /// <exclude />
        public static string LabelAttributeName { get { return "label"; } }

        /// <exclude />
        public static string BindingSourceNameAttributeName { get { return "bindingsourcename"; } }

        /// <exclude />
        public static string HelpTextAttributeName { get { return "helptext"; } }
	}
}
