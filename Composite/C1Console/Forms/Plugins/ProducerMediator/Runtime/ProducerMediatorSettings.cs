using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Forms.Plugins.ProducerMediator.Runtime
{
    internal sealed class ProducerMediatorSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Forms.Plugins.ProducerMediatorConfiguration";

        private const string _mediatorsPropertyName = "Mediators";
        [ConfigurationProperty(_mediatorsPropertyName)]
        public NameTypeConfigurationElementCollection<ProducerMediatorData, ProducerMediatorData> Mediators
        {
            get { return (NameTypeConfigurationElementCollection<ProducerMediatorData, ProducerMediatorData>)base[_mediatorsPropertyName]; }
        }
    }
}
