using System;
using Composite.C1Console.Forms.Foundation.PluginFacades;
using Composite.C1Console.Forms.Plugins.ProducerMediator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.StandardProducerMediators
{
    [ConfigurationElementType(typeof(UiControlProducerMediatorData))]
    internal sealed class UiControlProducerMediator : IProducerMediator
    {
        public object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            return UiControlFactoryPluginFacade.CreateControl(channel, namespaceName, name);
        }

        public object EvaluateProducer(object producer)
        {
            if (false == (producer is IUiControl))
            {
                throw new ArgumentException(string.Format("The parameter type {0} did not match the expected type {1}", producer.GetType().ToString(), typeof(IUiControl).ToString()), "producer");
            }

            return producer;
        }
    }




    [Assembler(typeof(NonConfigurableProducerMediatorAssembler))]
    internal sealed class UiControlProducerMediatorData : ProducerMediatorData
    {        
    }
}
