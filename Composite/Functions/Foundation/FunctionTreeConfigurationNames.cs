using System.ComponentModel;


namespace Composite.Functions.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class FunctionTreeConfigurationNames
	{
        /// <summary /> 
        /// <exclude />
        public static string NamespaceName { get { return "http://www.composite.net/ns/function/1.0"; } }

        /// <summary /> 
        /// <exclude />
        public static string ParamTagName { get { return "param"; } }

        /// <summary /> 
        /// <exclude />
        public static string ParamElementTagName { get { return "paramelement"; } }

        /// <summary /> 
        /// <exclude />
        public static string FunctionTagName { get { return "function"; } }

        /// <summary /> 
        /// <exclude />
        public static string WidgetFunctionTagName { get { return "widgetfunction"; } }

        /// <summary /> 
        /// <exclude />
        public static string HelpDefinitionTagName { get { return "helpdefinition"; } }

        /// <summary /> 
        /// <exclude />
        public static string NameAttributeName { get { return "name"; } }

        /// <summary /> 
        /// <exclude />
        public static string ValueAttributeName { get { return "value"; } }

        /// <summary /> 
        /// <exclude />
        public static string LabelAttributeName { get { return "label"; } }

        /// <summary /> 
        /// <exclude />
        public static string BindingSourceNameAttributeName { get { return "bindingsourcename"; } }

        /// <summary /> 
        /// <exclude />
        public static string HelpTextAttributeName { get { return "helptext"; } }
	}
}
