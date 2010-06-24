using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Forms.Plugins.ProducerMediator.Runtime
{
    internal sealed class ProducerMediatorFactory : NameTypeFactoryBase<IProducerMediator>
    {
        public ProducerMediatorFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
