using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Data.Validation.Plugins.ClientValidationRuleTranslator.Runtime
{
    internal sealed class ClientValidationRuleTranslatorSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Data.Validation.Plugins.ClientValidationRuleTranslatorConfiguration";


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
