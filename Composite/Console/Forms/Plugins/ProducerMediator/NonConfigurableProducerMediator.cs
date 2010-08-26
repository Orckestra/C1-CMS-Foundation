using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.ProducerMediator
{
    [Assembler(typeof(NonConfigurableProducerMediatorAssembler))]
    internal sealed class NonConfigurableProducerMediator : ProducerMediatorData
    {
    }

    internal sealed class NonConfigurableProducerMediatorAssembler : IAssembler<IProducerMediator, ProducerMediatorData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IProducerMediator Assemble(IBuilderContext context, ProducerMediatorData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IProducerMediator)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
