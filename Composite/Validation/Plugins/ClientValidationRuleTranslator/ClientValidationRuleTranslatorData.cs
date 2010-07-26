using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Validation.Plugins.ClientValidationRuleTranslator
{
    [ConfigurationElementType(typeof(NonConfigurableClientValidationRuleTranslator))]
    internal class ClientValidationRuleTranslatorData : NameTypeManagerTypeConfigurationElement
	{
	}
}
