using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using Composite.WebClient.WCF;

namespace Composite.Logging.WCF
{
    internal class LoggerServiceHostingFactory : ServiceHostFactory 
    {
        protected override ServiceHost CreateServiceHost(Type serviceType, Uri[] baseAddresses)
        {
            return new ServiceHost(serviceType, ServiceHostFactoryHelper.GetFixedBaseAddresses(baseAddresses));
        }
    }
}
