using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String
{
    internal sealed class TextAreaWidgetFuntion : CompositeWidgetFunctionBase
    {
        private const string _functionName = "TextArea";

        /// <exclude />
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + ".String." + _functionName;

        /// <exclude />
        public const string SpellCheckParameterName = "SpellCheck";


        public TextAreaWidgetFuntion(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(string), entityTokenFactory)
        {
            ParameterProfile spellCheckPP =
                new ParameterProfile(TextAreaWidgetFuntion.SpellCheckParameterName,
                    typeof(bool), false,
                    new ConstantValueProvider(true), StandardWidgetFunctions.GetBoolSelectorWidget("Allow spell checking","Do not allow spell checking"), null,
                    "Spell check", new HelpDefinition("By default text will be spell checked (when available). You should explicitly disable spell checking on fields that contain e-mails, code values etc. not suitable for spell checking. "));

            base.AddParameterProfile(spellCheckPP);
        }



        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            bool spellCheck = parameters.GetParameter<bool>(TextAreaWidgetFuntion.SpellCheckParameterName);

            XElement formElement = base.BuildBasicWidgetMarkup("TextArea", "Text", label, help, bindingSourceName);
            formElement.Add(new XAttribute("SpellCheck", spellCheck));
            return formElement;
        }
    }
}
