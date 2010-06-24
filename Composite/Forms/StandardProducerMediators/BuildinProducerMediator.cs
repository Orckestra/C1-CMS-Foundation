using System;
using Composite.Forms.Plugins.ProducerMediator;
using Composite.Forms.StandardProducerMediators.BuildinProducers;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.StandardProducerMediators
{
    [ConfigurationElementType(typeof(BuildinProducerMediatorData))]
    public sealed class BuildinProducerMediator : IProducerMediator
    {
        public object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            switch (name)
            {
                case "if":
                    return new IfProducer();

                case "ifCondition":
                    return new IfConditionProducer();

                case "ifWhenTrue":
                    return new IfWhenTrueProducer();

                case "ifWhenFalse":
                    return new IfWhenFalseProducer();

                case "read":
                    return new ReadProducer();

                case "bind":
                    return new BindProducer();

                case "binding":
                    return new BindingProducer();

                case "bindings":
                    return new BindingsProducer();

                case "layout":
                    return new LayoutProducer();

                case "evalfunc":
                    return new EvalFuncProducer();
            }

            throw new NotImplementedException(string.Format("Unknown buildin producer type {0}", name));
        }

        public object EvaluateProducer(object producer)
        {
            if ( false == (producer is IBuildinProducer))
            {
                throw new ArgumentException(string.Format("The parameter type {0} did not match the expected type {1}", producer.GetType().ToString(), typeof(IBuildinProducer).ToString()), "producer");
            }

            return producer;
        }
    }



    [Assembler(typeof(NonConfigurableProducerMediatorAssembler))]
    public sealed class BuildinProducerMediatorData : ProducerMediatorData
    {        
    }
}
