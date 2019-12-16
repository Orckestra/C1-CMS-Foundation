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
                new ParameterProfile("ShowHomePagesOnly", typeof(bool), false,
                    new ConstantValueProvider(false), StandardWidgetFunctions.GetBoolSelectorWidget("Only Home Pages", "All Pages"), null,
                    "Show Home Pages Only", new HelpDefinition("TODO")));

            base.AddParameterProfile(
                new ParameterProfile("HomePageIdFilter", typeof(Guid?), false,
                    new ConstantValueProvider(null), new WidgetFunctionProvider(NullablePageReferenceSelectorWidgetFunction.CompositeName, new[] { new ConstantParameterRuntimeTreeNode("ShowHomePagesOnly", true.ToString()), }), null,
                    "Filter by Home Page", new HelpDefinition("TODO")));
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            var selector = BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, helpDefinition, bindingSourceName);

            var searchToken = new PageSearchToken
            {
                HomePageIdFilter = parameters.GetParameter<Guid?>("HomePageIdFilter"),
                ShowHomePagesOnly = parameters.GetParameter<bool>("ShowHomePagesOnly"),
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