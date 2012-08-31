using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    internal sealed class UrlComboBoxWidgetFunction : CompositeWidgetFunctionBase
    {
		private const string _functionName = "UrlComboBox";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

		public UrlComboBoxWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
			XElement formElement = base.BuildBasicWidgetMarkup("UrlComboBox", "Text", label, help, bindingSourceName);
            return formElement;
        }
    }
}
