using System;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Core.Types;
using Composite.Core.Xml;

using StringSelector = Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String.VisualXhtmlEditorFuntion;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.XhtmlDocument
{
	internal sealed class VisualXhtmlEditorFuntion : CompositeWidgetFunctionBase
    {
        public static IEnumerable<Type> GetOptions(object typeManagerTypeName)
        {
            yield return TypeManager.GetType((string)typeManagerTypeName);
        }

        private const string _functionName = "VisualXhtmlEditor";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".XhtmlDocument." + _functionName;

        public const string ClassConfigurationNameParameterName = "ClassConfigurationName";
        public const string ContainerClassesParameterName = "ContainerClasses";
        public const string EmbedableFieldTypeParameterName = "EmbedableFieldsType";


        public VisualXhtmlEditorFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(Composite.Core.Xml.XhtmlDocument), entityTokenFactory)
        {
            SetParameterProfiles("common");
        }




        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement element = base.BuildBasicWidgetMarkup("InlineXhtmlEditor", "Xhtml", label, help, bindingSourceName);
            element.Add(new XAttribute("ClassConfigurationName", parameters.GetParameter<string>(VisualXhtmlEditorFuntion.ClassConfigurationNameParameterName)));

            var pageId = parameters.GetParameter<Guid>(StringSelector.PreviewPageIdParameterName);
            var templateId = parameters.GetParameter<Guid>(StringSelector.PreviewTemplateIdParameterName);
            string placeholderName = parameters.GetParameter<string>(StringSelector.PreviewPlaceholderParameterName);
            string containerClasses = parameters.GetParameter<string>(ContainerClassesParameterName);

            if (pageId != Guid.Empty)
            {
                element.Add(new XAttribute("PreviewPageId", pageId));
            }

            if (templateId != Guid.Empty)
            {
                element.Add(new XAttribute("PreviewTemplateId", templateId));
            }

            if (!string.IsNullOrEmpty(placeholderName))
            {
                element.Add(new XAttribute("PreviewPlaceholder", placeholderName));
            }

            if (!string.IsNullOrWhiteSpace(containerClasses))
            {
                element.Add(new XAttribute("ContainerClasses", containerClasses));
            }

            Type embedableFieldType = parameters.GetParameter<Type>(VisualXhtmlEditorFuntion.EmbedableFieldTypeParameterName);
            if (embedableFieldType!=null)
            {
                XNamespace f = Namespaces.BindingFormsStdFuncLib10;

                element.Add(
                    new XElement(element.Name.Namespace + "InlineXhtmlEditor.EmbedableFieldsTypes",
                        new XElement(f + "StaticMethodCall",
                           new XAttribute("Type", TypeManager.SerializeType(this.GetType())),
                           new XAttribute("Parameters", TypeManager.SerializeType(embedableFieldType)),
                           new XAttribute("Method", "GetOptions"))));

            }

            return element;
        }


        private void SetParameterProfiles(string classConfigurationName)
        {
            base.AddParameterProfile(new ParameterProfile(VisualXhtmlEditorFuntion.ContainerClassesParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(""), StandardWidgetFunctions.TextBoxWidget, null,
                    "Container Classes",
                    new HelpDefinition("Class names to attach to the editor (for styling) and to use for filtering components. Seperate multiple names with space or comma.")
            ));

            ParameterProfile classConfigNamePP =
                new ParameterProfile(VisualXhtmlEditorFuntion.ClassConfigurationNameParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(classConfigurationName), StandardWidgetFunctions.TextBoxWidget, null,
                    "Class configuration name", new HelpDefinition("The visual editor can be configured to offer the editor a special set of class names for formatting xhtml elements. The default value is '" + classConfigurationName + "'"));

            base.AddParameterProfile(classConfigNamePP);

            ParameterProfile typeNamePP =
                new ParameterProfile(VisualXhtmlEditorFuntion.EmbedableFieldTypeParameterName,
                    typeof(Type), false,
                    new ConstantValueProvider(null), StandardWidgetFunctions.DataTypeSelectorWidget, null,
                    "Embedable fields, Data type", new HelpDefinition("If a data type is selected, fields from this type can be inserted into the xhtml."));

            base.AddParameterProfile(typeNamePP);

            StringSelector.BuildInlineXhtmlEditorParameters().ForEach(AddParameterProfile);
        }
    }
}
