using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Forms.Plugins.ProducerMediator;
using Composite.Forms;


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
