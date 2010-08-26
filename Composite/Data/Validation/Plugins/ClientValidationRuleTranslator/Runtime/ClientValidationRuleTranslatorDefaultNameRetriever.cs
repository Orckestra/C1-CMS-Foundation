using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Validation.Plugins.ClientValidationRuleTranslator.Runtime
{
    internal sealed class ClientValidationRuleTranslatorDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
	}
}
