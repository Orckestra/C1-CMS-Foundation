using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Plugins.ProducerMediator
{
    [Assembler(typeof(NonConfigurableProducerMediatorAssembler))]
    public sealed class NonConfigurableProducerMediator : ProducerMediatorData
    {
    }

    public sealed class NonConfigurableProducerMediatorAssembler : IAssembler<IProducerMediator, ProducerMediatorData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IProducerMediator Assemble(IBuilderContext context, ProducerMediatorData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IProducerMediator)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
