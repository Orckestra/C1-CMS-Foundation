using System;
using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Validation.Plugins.ClientValidationRuleTranslator.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Validation.Plugins.ClientValidationRuleTranslator
{
    [CustomFactory(typeof(ClientValidationRuleTranslatorCustomFactory))]
    [ConfigurationNameMapper(typeof(ClientValidationRuleTranslatorDefaultNameRetriever))]
	internal interface IClientValidationRuleTranslator
	{
        IEnumerable<Type> GetSupportedAttributeTypes();

        ClientValidationRule Translate(Attribute attribute);
	}
}
