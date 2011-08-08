using System.ComponentModel;


namespace Composite.Functions.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class FunctionTreeConfigurationNames
	{
        public static string NamespaceName { get { return "http://www.composite.net/ns/function/1.0"; } }
        public static string ParamTagName { get { return "param"; } }
        public static string ParamElementTagName { get { return "paramelement"; } }
        public static string FunctionTagName { get { return "function"; } }
        public static string WidgetFunctionTagName { get { return "widgetfunction"; } }
        public static string HelpDefinitionTagName { get { return "helpdefinition"; } }
        public static string NameAttributeName { get { return "name"; } }        
        public static string ValueAttributeName { get { return "value"; } }
        public static string LabelAttributeName { get { return "label"; } }
        public static string BindingSourceNameAttributeName { get { return "bindingsourcename"; } }
        public static string HelpTextAttributeName { get { return "helptext"; } }
	}
}
