using System;
using System.Xml.Linq;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.C1Console.Forms.CoreUiControls;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.GuidWidgetFunctions
{
	internal sealed class GuidTextBoxWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextBox";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".Guid." + _functionName;


        public GuidTextBoxWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(Guid), entityTokenFactory)
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
