using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Validation.Plugins.ClientValidationRuleTranslator
{
    [Assembler(typeof(NonConfigurableClientValidationRuleTranslatorAssembler))]
    internal class NonConfigurableClientValidationRuleTranslator : ClientValidationRuleTranslatorData
    {
    }

    internal sealed class NonConfigurableClientValidationRuleTranslatorAssembler : IAssembler<IClientValidationRuleTranslator, ClientValidationRuleTranslatorData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IClientValidationRuleTranslator Assemble(IBuilderContext context, ClientValidationRuleTranslatorData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IClientValidationRuleTranslator)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
