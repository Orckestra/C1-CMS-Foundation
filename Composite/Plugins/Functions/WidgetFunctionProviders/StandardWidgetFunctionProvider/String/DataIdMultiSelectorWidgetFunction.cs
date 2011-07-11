using System;
using System.Collections;
using System.Linq;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Core.Types;
using Composite.Core.Xml;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataIdMultiSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private const string _functionName = "DataIdMultiSelector";
        internal const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

        /// <summary> 
        /// Is called through reflection   
        /// </summary>
        /// <exclude />
        public static IEnumerable GetOptions(string typeManagerName)
        {
            return GetOptionsCommon.GetOptions(typeManagerName);
        }

        /// <exclude />
        public DataIdMultiSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            SetParameterProfiles();
        }


        private void SetParameterProfiles()
        {
            ParameterProfile dataTypePP =
                new ParameterProfile("OptionsType",
                    typeof(Type), 
                    true,
                    new NoValueValueProvider(), 
                    StandardWidgetFunctions.DataTypeSelectorWidget, 
                    null,
                    "Data type to select from", new HelpDefinition("The list of options the user can choose from will be selected from this type."));

            base.AddParameterProfile(dataTypePP);

            ParameterProfile compactModePP =
                new ParameterProfile("CompactMode",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Compact", "Verbose"),
                    null,
                    "Compact UI", new HelpDefinition("When true, a more compact representation of long option lists is used. Default is false (verbose)."));

            base.AddParameterProfile(compactModePP);
        }

        /// <exclude />
        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            Type optionsType = parameters.GetParameter<Type>("OptionsType");
            bool compactMode = parameters.GetParameter<bool>("CompactMode");
            return BuildStaticCallPopulatedSelectorFormsMarkup(
                    parameters,
                    label,
                    helpDefinition,
                    bindingSourceName,
                    this.GetType(),
                    "GetOptions",
                    TypeManager.SerializeType(optionsType),
                    "Key",
                    "Label",
                    false,
                    compactMode);
        }


        private static XElement BuildStaticCallPopulatedSelectorFormsMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName, Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool required, bool compactMode)
        {
            string tagName = "MultiKeySelector";

            XElement selector = StandardWidgetFunctions.BuildBasicFormsMarkup(Namespaces.BindingFormsStdUiControls10, tagName, "SelectedAsString", label, helpDefinition, bindingSourceName);
            XNamespace f = Namespaces.BindingFormsStdFuncLib10;

            selector.Add(
                new XAttribute("OptionsKeyField", optionsObjectKeyPropertyName),
                new XAttribute("OptionsLabelField", optionsObjectLabelPropertyName),
                new XAttribute("Required", required),
                new XAttribute("CompactMode", compactMode),
                new XElement(selector.Name.Namespace + (tagName + ".Options"),
                    new XElement(f + "StaticMethodCall",
                       new XAttribute("Type", TypeManager.SerializeType(optionsGeneratingStaticType)),
                       new XAttribute("Method", optionsGeneratingStaticMethodName))));

            if (optionsGeneratingStaticMethodParameterValue != null) selector.Descendants(f + "StaticMethodCall").First().Add(
                  new XAttribute("Parameters", optionsGeneratingStaticMethodParameterValue));

            return selector;
        }
    }
}
