using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Forms.CoreUiControls;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Guid
{
	internal sealed class GuidTextBoxWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextBox";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Guid." + _functionName;


        public GuidTextBoxWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(System.Guid), entityTokenFactory)
        {
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement textBoxMarkup = base.BuildBasicWidgetMarkup("TextBox", "Text", label, help, bindingSourceName);

            textBoxMarkup.Add(new XAttribute("Type", TextBoxType.Guid));
            
            return textBoxMarkup;
        }
    }
}
