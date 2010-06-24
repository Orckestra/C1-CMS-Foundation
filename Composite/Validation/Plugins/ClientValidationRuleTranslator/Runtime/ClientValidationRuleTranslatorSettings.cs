using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Validation.Plugins.ClientValidationRuleTranslator.Runtime
{
    public sealed class ClientValidationRuleTranslatorSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Validation.Plugins.ClientValidationRuleTranslatorConfiguration";


        private const string _clientValidationRuleTranslatorProperty = "ClientValidationRuleTranslatorPlugins";
        [ConfigurationProperty(_clientValidationRuleTranslatorProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ClientValidationRuleTranslatorData> ClientValidationRuleTranslatorPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ClientValidationRuleTranslatorData>)base[_clientValidationRuleTranslatorProperty];
            }
        }
	}
}
