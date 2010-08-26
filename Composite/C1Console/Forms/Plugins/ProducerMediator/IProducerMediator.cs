using Composite.C1Console.Forms.Plugins.ProducerMediator.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.ProducerMediator
{
    [CustomFactory(typeof(ProducerMediatorCustomFactory))]
    [ConfigurationNameMapper(typeof(ProducerMediatorDefaultNameRetriever))]
    internal interface IProducerMediator
    {
        object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name);
        object EvaluateProducer(object producer);
    }
}
