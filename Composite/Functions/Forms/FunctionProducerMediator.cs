using System;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Plugins.ProducerMediator;
using Composite.Core.Extensions;
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
                    throw new NotSupportedException("Not supported producer tag. Check whether the namespace or the tag name is correct. {{ {0} }} {1}".FormatWith(namespaceName, name));
            }
        }



        public object EvaluateProducer(object producer)
        {
            IFunctionProducer functionProducer = (IFunctionProducer)producer;

            return functionProducer.GetResult();
        }
    }
}
