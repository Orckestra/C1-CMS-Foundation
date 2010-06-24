using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Validation.Plugins.ClientValidationRuleTranslator.Runtime
{
    internal sealed class ClientValidationRuleTranslatorFactory : NameTypeFactoryBase<IClientValidationRuleTranslator>
	{
        public ClientValidationRuleTranslatorFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
