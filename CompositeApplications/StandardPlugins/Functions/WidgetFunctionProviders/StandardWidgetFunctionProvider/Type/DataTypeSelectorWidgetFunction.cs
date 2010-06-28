using System;
using System.Collections;
using System.Xml.Linq;
using Composite.Data;
using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Xml;
using Composite.Types;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataType
{
    internal sealed class DataTypeSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        public static IEnumerable GetOptions()
        {
            return
                DataFacade.GetAllKnownInterfaces(UserType.Developer); //.Where(f=>f.Namespace.StartsWith(typeof(Composite.Data.Types.IPage).Namespace)==false).ToList();
        }

        private const string _functionName = "DataTypeSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Type." + _functionName;

        public DataTypeSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(Type), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            string tagName = "TypeSelector";

            XElement selector = StandardWidgetFunctions.BuildBasicFormsMarkup(Namespaces.BindingFormsStdUiControls10, tagName, "SelectedType", label, helpDefinition, bindingSourceName);
            XNamespace f = Namespaces.BindingFormsStdFuncLib10;

            selector.Add(
                new XElement(selector.Name.Namespace + (tagName + ".TypeOptions"),
                    new XElement(f + "StaticMethodCall",
                       new XAttribute("Type", TypeManager.SerializeType(this.GetType())),
                       new XAttribute("Method", "GetOptions"))));

            return selector;
        }
    }
}
