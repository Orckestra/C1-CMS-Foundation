using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
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
        protected PageReferenceSelectorWidgetFunctionBase(string compositeName, Type returnType, EntityTokenFactory entityTokenFactory)
            : base(compositeName, returnType, entityTokenFactory)
        {
            var boolProvider = StandardWidgetFunctions.GetBoolSelectorWidget(
                "Enabled: filter pages by active website",
                "Disabled: no filter, show all websites pages (default)");

            base.AddParameterProfile(new ParameterProfile(
                HomePageIdParameterName,
                typeof(bool),
                false,
                new ConstantValueProvider(false),
                boolProvider,
                "Filter by website",
                new HelpDefinition("If enabled, then for selecting will be enabled only pages from a website of a current active element."),
                false));
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
            if (parameter == null || !bool.TryParse(parameter.ToString(), out bool result) || !result)
                return null;

            var f = Namespaces.BindingFormsStdFuncLib10;
            var ft = Namespaces.Function10;

            var element = new XElement(selector.Name.Namespace + "DataReferenceTreeSelector.SearchToken",
                new XElement(f + "StaticMethodCall",
                    new XAttribute("Type", TypeManager.SerializeType(typeof(PageReferenceSelectorWidgetFunctionBase))),
                    new XAttribute("Method", nameof(GetPageSearchToken)),
                    new XElement(f + "StaticMethodCall.Parameters",
                        new XElement(ft + "function",
                            new XAttribute("name", "Composite.Pages.GetPageId"),
                            new XElement(ft + "param",
                                new XAttribute("name", "SitemapScope"),
                                new XAttribute("value", SitemapScope.Level1))))));

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