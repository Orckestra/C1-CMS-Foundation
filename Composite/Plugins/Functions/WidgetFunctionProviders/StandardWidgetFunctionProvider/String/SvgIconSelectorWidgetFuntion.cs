using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Core.Xml;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
	internal sealed class SvgIconSelectorWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "SvgIconSelector";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

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

            XElement formElement = base.BuildBasicWidgetMarkup("SvgIconSelector", "SelectedSvgId", label, help, bindingSourceName);
            formElement.Add(new XAttribute("SvgSpritePath", spritePath));
            return formElement;
        }

    }
}
