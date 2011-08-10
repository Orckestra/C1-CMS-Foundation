using System;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Plugins.ProducerMediator;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Forms
{
    [ConfigurationElementType(typeof(NonConfigurableProducerMediator))]
    internal sealed class FunctionProducerMediator : IProducerMediator
    {
        public object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            switch (name)
            {
                case "function":
                    return new FunctionProducer();

                case "param":
                    return new FunctionParameterProducer();

                case "paramelement":
                    return new FunctionParameterElementProducer();

                default:
                    throw new NotImplementedException();
            }
        }



        public object EvaluateProducer(object producer)
        {
            IFunctionProducer functionProducer = (IFunctionProducer)producer;

            return functionProducer.GetResult();
        }
    }
}
