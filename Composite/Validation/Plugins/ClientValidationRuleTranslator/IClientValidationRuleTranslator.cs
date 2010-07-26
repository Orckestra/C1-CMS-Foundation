using System;
using System.Collections.Generic;
using Composite.Validation.ClientValidationRules;
using Composite.Validation.Plugins.ClientValidationRuleTranslator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Validation.Plugins.ClientValidationRuleTranslator
{
    [CustomFactory(typeof(ClientValidationRuleTranslatorCustomFactory))]
    [ConfigurationNameMapper(typeof(ClientValidationRuleTranslatorDefaultNameRetriever))]
	internal interface IClientValidationRuleTranslator
	{
        IEnumerable<Type> GetSupportedAttributeTypes();

        ClientValidationRule Translate(Attribute attribute);
	}
}
