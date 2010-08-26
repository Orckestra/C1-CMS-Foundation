using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Validation.Plugins.ClientValidationRuleTranslator.Runtime
{
    internal sealed class ClientValidationRuleTranslatorCustomFactory : AssemblerBasedCustomFactory<IClientValidationRuleTranslator, ClientValidationRuleTranslatorData>
	{
        protected override ClientValidationRuleTranslatorData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ClientValidationRuleTranslatorSettings settings = configurationSource.GetSection(ClientValidationRuleTranslatorSettings.SectionName) as ClientValidationRuleTranslatorSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ClientValidationRuleTranslatorSettings.SectionName));
            }

            return settings.ClientValidationRuleTranslatorPlugins.Get(name);
        }
	}
}
