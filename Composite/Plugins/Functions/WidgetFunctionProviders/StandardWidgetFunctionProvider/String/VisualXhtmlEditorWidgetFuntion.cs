using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Core.Types;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class VisualXhtmlEditorFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "VisualXhtmlEditor";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." +_functionName;
        /// <exclude />
        public const string ClassConfigurationNameParameterName = "ClassConfigurationName";
        /// <exclude />
        public const string ContainerClassesParameterName = "ContainerClasses";
        /// <exclude />
        public const string PreviewPageIdParameterName = "PreviewPageId";
        /// <exclude />
        public const string PreviewTemplateIdParameterName = "PreviewTemplateId";
        /// <exclude />
        public const string PreviewPlaceholderParameterName = "PreviewPlaceholder";


        /// <exclude />
        private const string DefaultConfiguration = "common";

        /// <exclude />
        public VisualXhtmlEditorFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            BuildParameterProfiles();
        }




        /// <exclude />
        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement element = base.BuildBasicWidgetMarkup("InlineXhtmlEditor", "Xhtml", label, help, bindingSourceName);
            element.Add(new XAttribute("ClassConfigurationName", parameters.GetParameter<string>(ClassConfigurationNameParameterName)));

            var pageId = parameters.GetParameter<Guid>(PreviewPageIdParameterName);
            var templateId = parameters.GetParameter<Guid>(PreviewTemplateIdParameterName);
            string placeholderName = parameters.GetParameter<string>(PreviewPlaceholderParameterName);
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

            return element;
        }


        private void BuildParameterProfiles()
        {
            // TODO: localize
            base.AddParameterProfile(new ParameterProfile(ClassConfigurationNameParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(DefaultConfiguration), StandardWidgetFunctions.TextBoxWidget, null,
                    "Class configuration name", 
                    new HelpDefinition("The visual editor can be configured to offer the editor a special set of class names for formatting xhtml elements. The default value is '" + DefaultConfiguration + "'")
            ));

            base.AddParameterProfile(new ParameterProfile(ContainerClassesParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(""), StandardWidgetFunctions.TextBoxWidget, null,
                    "Container Classes",
                    new HelpDefinition("Class names to attach to the editor (for styling) and to use for filtering components. Seperate multiple names with space or comma.")
            ));

            BuildInlineXhtmlEditorParameters().ForEach(AddParameterProfile);
        }

        internal static IEnumerable<ParameterProfile> BuildInlineXhtmlEditorParameters()
        {
            // TODO: localize
            var templateSelectorWidget = StandardWidgetFunctions.DropDownList(
                    typeof(VisualXhtmlEditorFuntion), StaticReflection.GetMethodInfo(() => PageTemplates()).Name, "Key", "Value", false, false);

            yield return new ParameterProfile(PreviewTemplateIdParameterName,
                    typeof(Guid), false,
                    new ConstantValueProvider(Guid.Empty),
                    templateSelectorWidget,
                    null,
                    "Page template for preview",
                    new HelpDefinition("Page template to be used while generating preview images for the C1 functions calls."));

            yield return new ParameterProfile(PreviewPlaceholderParameterName,
                    typeof(string), false,
                    new ConstantValueProvider(null), StandardWidgetFunctions.TextBoxWidget, null,
                    "Page placeholder for preview",
                    new HelpDefinition("Page placeholder to be used while generating preview images for the C1 functions calls. If not specified, the default placeholder for the selected template will be used.")
            );

            yield return new ParameterProfile(PreviewPageIdParameterName,
                    typeof(Guid), false,
                    new ConstantValueProvider(Guid.Empty),
                    StandardWidgetFunctions.GetDataReferenceWidget<IPage>(),
                    null,
                    "Page for preview",
                    new HelpDefinition("Page template to be used while generating preview images. Certain fuctions may require page information for previewing."));
        }


        private static IEnumerable<KeyValuePair<Guid, string>> PageTemplates()
        {
            return PageTemplateFacade.GetPageTemplates()
                                    .OrderBy(p => p.Title)
                                    .Select(p => new KeyValuePair<Guid, string>(p.Id, p.Title));
        }
    }
}
