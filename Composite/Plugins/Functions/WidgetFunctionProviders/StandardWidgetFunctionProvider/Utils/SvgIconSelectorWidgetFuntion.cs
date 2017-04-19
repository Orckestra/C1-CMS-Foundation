using System.Xml.Linq;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Utils
{
    internal sealed class SvgIconSelectorWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "SvgIconSelector";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Utils." + _functionName;

        /// <exclude />
        public const string SvgSpritePathParameterName = "SvgSpritePath";

        public SvgIconSelectorWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
              base.AddParameterProfile(
                new ParameterProfile(SvgIconSelectorWidgetFuntion.SvgSpritePathParameterName,
                    typeof(string), true,
                    new ConstantValueProvider(null), StandardWidgetFunctions.TextBoxWidget, null,
                    "Svg Sprite Path", new HelpDefinition("Path to the SVG sprite. Example: ~/Composite/images/sprite.svg")));

        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            string spritePath = parameters.GetParameter<string>(SvgIconSelectorWidgetFuntion.SvgSpritePathParameterName);

            XElement formElement = base.BuildBasicWidgetMarkup("SvgIconSelector", "Selected", label, help, bindingSourceName);
            formElement.Add(new XAttribute("SvgSpritePath", spritePath));
            return formElement;
        }

    }
}
