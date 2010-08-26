using System;
using Composite.C1Console.Forms.Foundation.PluginFacades;
using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Composite.C1Console.Forms.Plugins.ProducerMediator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.StandardProducerMediators
{
    [ConfigurationElementType(typeof(FunctionProducerMediatorData))]
    internal sealed class FunctionProducerMediator : IProducerMediator
    {
        public object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            return FunctionFactoryPluginFacade.GetFunction(namespaceName, name);
        }


        public object EvaluateProducer(object producer)
        {
            if (false == (producer is IFormFunction))
            {
                throw new ArgumentException(string.Format("The parameter type {0} did not match the expected type {1}", producer.GetType().ToString(), typeof(IFormFunction).ToString()), "producer");
            }

                return (producer as IFormFunction).Execute();
        }
    }



    [Assembler(typeof(NonConfigurableProducerMediatorAssembler))]
    internal sealed class FunctionProducerMediatorData : ProducerMediatorData
    {        
    }
}
