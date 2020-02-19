using System.Collections;
using System.Xml.Linq;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class HomePageSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        /// <exclude />
        public HomePageSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DataReference<IPage>), entityTokenFactory)
        {
        }

        private const string CompositeName = CommonNamespace + ".DataReference" + ".HomePageSelector";

        /// <exclude />
        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            return StandardWidgetFunctions.BuildStaticCallPopulatedSelectorFormsMarkup(
                parameters: parameters,
                label: label,
                helpDefinition: helpDefinition,
                bindingSourceName: bindingSourceName,
                optionsGeneratingStaticType: typeof(HomePageSelectorWidgetFunction),
                optionsGeneratingStaticMethodName: nameof(GetHomePages),
                optionsGeneratingStaticMethodParameterValue: null,
                optionsObjectKeyPropertyName: "Key",
                optionsObjectLabelPropertyName: "Label",
                multiSelect: false,
                compactMode: true,
                required: true,
                bindToString: false);
        }

        /// <summary>
        /// To be called through reflection
        /// </summary>
        /// <exclude />
        public static IEnumerable GetHomePages()
        {
            foreach (var element in PageStructureInfo.GetSiteMap())
            {
                yield return new
                {
                    Key = PageStructureInfo.GetIdForPageElement(element),
                    Label = PageStructureInfo.GetLabelForPageElement("", element)
                };
            }
        }
    }
}