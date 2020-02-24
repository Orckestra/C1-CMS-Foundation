using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using System;
using System.Xml.Linq;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal abstract class PageReferenceSelectorWidgetFunctionBase : CompositeWidgetFunctionBase
    {
        protected const string CompositeNameBase = CommonNamespace + ".DataReference";


        private const string HomePageIdParameterName = "HomePageId";
        protected PageReferenceSelectorWidgetFunctionBase(string compositeName, Type returnType, EntityTokenFactory entityTokenFactory) : base(compositeName, returnType, entityTokenFactory)
        {
            base.AddParameterProfile(
                new ParameterProfile(HomePageIdParameterName, typeof(Guid?), false,
                    new ConstantValueProvider(null), new WidgetFunctionProvider(new HomePageSelectorWidgetFunction(entityTokenFactory)), null,
                    "Filter by Home Page", new HelpDefinition("Use this field to filter by root website. If not set all websites are shown. You can use GetPageId function to get current page")));
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            var selector = BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, helpDefinition, bindingSourceName);

            selector.Add(
                new XAttribute("Handle", "Composite.Management.PageIdSelectorDialog"),
                new XAttribute("DataType", TypeManager.SerializeType(typeof(IPage))),
                new XAttribute("NullValueAllowed", IsNullable())
            );
            var searchToken = GetSearchToken(parameters, selector);
            if (searchToken != null)
                selector.Add(searchToken);

            return selector;
        }

        private XElement GetSearchToken(ParameterList parameters, XElement selector)
        {
            var parameter = GetParameterElement(parameters);
            if (parameter == null)
                return null;

            var f = Namespaces.BindingFormsStdFuncLib10;
            var element = new XElement(selector.Name.Namespace + "DataReferenceTreeSelector.SearchToken",
                new XElement(f + "StaticMethodCall",
                    new XAttribute("Type", TypeManager.SerializeType(typeof(PageReferenceSelectorWidgetFunctionBase))),
                    new XAttribute("Method", nameof(GetPageSearchToken)),
                    new XElement(f + "StaticMethodCall.Parameters", parameter)));

            return element;
        }

        private object GetParameterElement(ParameterList parameters)
        {
            if (!parameters.TryGetParameterRuntimeTreeNode(HomePageIdParameterName, out var runtimeTreeNode))
            {
                return null;
            }

            if (runtimeTreeNode is FunctionParameterRuntimeTreeNode functionParamNode)
            {
                return functionParamNode.GetHostedFunction().Serialize();
            }

            if (runtimeTreeNode is ConstantParameterRuntimeTreeNode constParamNode)
            {
                return constParamNode.GetValue();
            }

            return null;
        }

        public static string GetPageSearchToken(Guid? homePageId)
        {
            var token = new PageSearchToken
            {
                HomePageId = homePageId,
            };
            return token.Serialize();
        }

        protected abstract bool IsNullable();
    };
}