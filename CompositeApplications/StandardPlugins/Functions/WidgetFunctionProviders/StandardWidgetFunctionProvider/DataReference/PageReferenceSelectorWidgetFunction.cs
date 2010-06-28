using System;
using System.Xml.Linq;
using Composite.Data;
using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Types;
using Composite.Data.Types;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal sealed class PageReferenceSelectorWidgetFunction: CompositeWidgetFunctionBase
    {
        public static string CompositeName
        {
            get
            {
                return _compositeNameBase + "PageSelector";
            }
        }


        private const string _compositeNameBase = CompositeWidgetFunctionBase.CommonNamespace + ".DataReference.";

        public PageReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DataReference<IPage>), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            XElement selector = base.BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, helpDefinition, bindingSourceName);

            selector.Add(
                    new XAttribute("Handle", "Composite.Management.PageIdSelectorDialog"),
                    new XAttribute("DataType", TypeManager.SerializeType(typeof(IPage))),
                    new XAttribute("NullValueAllowed", false)
                );

            return selector;
        }
    }
}
