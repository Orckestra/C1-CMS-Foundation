using System;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal abstract class PageReferenceSelectorWidgetFunctionBase : CompositeWidgetFunctionBase
    {
        protected const string CompositeNameBase = CommonNamespace + ".DataReference";

        protected PageReferenceSelectorWidgetFunctionBase(string compositeName, Type returnType, EntityTokenFactory entityTokenFactory) : base(compositeName, returnType, entityTokenFactory)
        {
            base.AddParameterProfile(
                new ParameterProfile("HomePageIdFilter", typeof(Guid?), false,
                    new ConstantValueProvider(null), new WidgetFunctionProvider(new HomePageSelectorWidgetFunction(entityTokenFactory)), null,
                    "Filter by Home Page", new HelpDefinition("If the value is set, tree view will display element from homesite only. You can use GetPageId function here // ask Inna for better description")));
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            var selector = BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, helpDefinition, bindingSourceName);

            var searchToken = new PageSearchToken
            {
                HomePageIdFilter = parameters.GetParameter<Guid?>("HomePageIdFilter"),
            };

            selector.Add(
                new XAttribute("Handle", "Composite.Management.PageIdSelectorDialog"),
                new XAttribute("DataType", TypeManager.SerializeType(typeof(IPage))),
                new XAttribute("SearchToken", searchToken.Serialize()),
                new XAttribute("NullValueAllowed", IsNullable())
            );

            return selector;
        }

        protected abstract bool IsNullable();
    };
}