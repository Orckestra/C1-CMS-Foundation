using System;
using Composite.Forms.Foundation.PluginFacades;
using Composite.Forms.Plugins.ProducerMediator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.StandardProducerMediators
{
    [ConfigurationElementType(typeof(UiControlProducerMediatorData))]
    public sealed class UiControlProducerMediator : IProducerMediator
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
    public sealed class UiControlProducerMediatorData : ProducerMediatorData
    {        
    }
}
