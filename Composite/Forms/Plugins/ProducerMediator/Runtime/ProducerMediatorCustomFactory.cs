using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Plugins.ProducerMediator.Runtime
{
    internal sealed class ProducerMediatorCustomFactory : AssemblerBasedCustomFactory<IProducerMediator, ProducerMediatorData>
    {
        protected override ProducerMediatorData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ProducerMediatorSettings settings = configurationSource.GetSection(ProducerMediatorSettings.SectionName) as ProducerMediatorSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ProducerMediatorSettings.SectionName));
            }

            return settings.Mediators.Get(name);
        }
    }
}
