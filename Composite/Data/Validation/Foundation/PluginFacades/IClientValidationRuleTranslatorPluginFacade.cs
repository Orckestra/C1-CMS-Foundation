using System;
using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Data.Validation.Foundation.PluginFacades
{
	internal interface IClientValidationRuleTranslatorPluginFacade
	{
        IEnumerable<Type> GetSupportedAttributeTypes(string translatorName);
        ClientValidationRule Translate(string translatorName, Attribute attribute);
        void OnFlush();
	}
}
