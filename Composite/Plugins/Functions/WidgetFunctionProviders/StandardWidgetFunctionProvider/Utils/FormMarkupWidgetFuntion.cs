using System;
using System.Linq;
using System.Xml.Linq;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Utils
{
	internal sealed class FormMarkupWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "FormMarkup";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Utils." + _functionName;

        /// <exclude />
        /// /// <exclude />
        public const string MarkupParameterName = "Markup";

        public FormMarkupWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            var markupParameterProfile =
                new ParameterProfile(MarkupParameterName,
                    typeof(string), true,
                    new ConstantValueProvider(
@"<TextBox Label=""$label"" Help=""$help"" SpellCheck=""true"">
	<TextBox.Text>
	  <cms:bind source=""$binding"" />
	</TextBox.Text>
</TextBox>"), StandardWidgetFunctions.TextAreaWidget, null,
                    "Markup", new HelpDefinition("Markup will be inserted into result form markup. Macroses are: '$binding', '$label' and '$help'"));

            base.AddParameterProfile(markupParameterProfile);
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            string markup = parameters.GetParameter<string>(MarkupParameterName) ?? "";

            if (string.IsNullOrWhiteSpace(markup))
            {
                return null;
            }

            markup = @"<cms:formdefinition xmlns:cms=""http://www.composite.net/ns/management/bindingforms/1.0"" xmlns=""http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0"">"
                      + markup
                      + "</cms:formdefinition>";

            XElement xml = XElement.Parse(markup);

            foreach (var attribute in xml.Descendants().SelectMany(node => node.Attributes()))
            {
                attribute.Value = attribute.Value
                                    .Replace("$label",  label)
                                    .Replace("$binding", bindingSourceName)
                                    .Replace("$help", help != null ? help.HelpText : "");
            }

            return xml.Elements().FirstOrDefault();
        }
    }
}
