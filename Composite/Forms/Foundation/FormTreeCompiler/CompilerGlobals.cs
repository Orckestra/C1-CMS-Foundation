using Composite.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;


namespace Composite.Forms.Foundation.FormTreeCompiler
{
    internal sealed class CompilerGlobals
    {
        public static readonly string DefaultPropertyName = ":default:";
        public static readonly string FormDefinition_TagName = "formdefinition";
        public static readonly string Layout_TagName = "layout";
        public static readonly string Bindings_TagName = "bindings";
        public static readonly string Binding_TagName = "binding";
        public static readonly string Bind_TagName = "bind";
        public static readonly string Read_TagName = "read";
        public static readonly string IfCondition_TagName = "ifCondition";
        public static readonly string IfWhenTrue_TagName = "ifWhenTrue";
        public static readonly string IfWhenFalse_TagName = "ifWhenFalse";
        public static readonly string RootNamespaceURI = "http://www.composite.net/ns/management/bindingforms/1.0";


        public static bool IsProducerTag(CompileTreeNode node)
        {
            ElementCompileTreeNode element = node as ElementCompileTreeNode;

            if (null == element) return false;

            if (true == IsElementEmbeddedProperty(element)) return false;
            if (true == IsReadTag(element)) return false;
            if (true == IsBindTag(element)) return false;
            if (true == IsBindingTag(element)) return false;            
            if (true == IsBindingsTag(element)) return false;
            if (true == IsLayoutTag(element)) return false;
            if (true == IsFormDefinitionTag(element)) return false;

            return true;
        }

        public static bool IsElementEmbeddedProperty(ElementCompileTreeNode element)
        {
            return element.XmlSourceNodeInformation.Name.Contains(".");
        }

        public static bool IsReadTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == Read_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsBindTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == Bind_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsBindingTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == Binding_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsBindingsTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == Bindings_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsLayoutTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == Layout_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsFormDefinitionTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == FormDefinition_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsElementIfConditionTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == IfCondition_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsElementIfWhenTrueTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == IfWhenTrue_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static bool IsElementIfWhenFalseTag(ElementCompileTreeNode element)
        {
            return (element.XmlSourceNodeInformation.Name == IfWhenFalse_TagName) && (element.XmlSourceNodeInformation.NamespaceURI == RootNamespaceURI);
        }

        public static void GetSplittedPropertyNameFromCompositeName(CompileTreeNode node, out string producerName, out string propertyName)
        {
            string[] split = node.XmlSourceNodeInformation.Name.Split('.');
            if (2 != split.Length) throw new FormCompileException("Wrong tag format", node.XmlSourceNodeInformation);

            producerName = split[0];
            propertyName = split[1];
        }
    }

}
