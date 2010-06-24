using System;
using System.Collections.Generic;
using Composite.Validation.ClientValidationRules;


namespace Composite.Validation.Foundation.PluginFacades
{
	internal interface IClientValidationRuleTranslatorPluginFacade
	{
        IEnumerable<Type> GetSupportedAttributeTypes(string translatorName);
        ClientValidationRule Translate(string translatorName, Attribute attribute);
        void OnFlush();
	}
}
