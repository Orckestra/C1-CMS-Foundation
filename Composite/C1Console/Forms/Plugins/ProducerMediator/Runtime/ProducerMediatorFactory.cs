using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.ProducerMediator.Runtime
{
    internal sealed class ProducerMediatorFactory : NameTypeFactoryBase<IProducerMediator>
    {
        public ProducerMediatorFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
