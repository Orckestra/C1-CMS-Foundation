using System.Collections.Generic;

namespace Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("Result")]
    internal sealed class IfWhenFalseProducer : IBuildinProducer
    {
        private List<object> _result = new List<object>();

        internal IfWhenFalseProducer() { }

        public List<object> Result
        {
            get { return _result; }
            set { _result = value; }
        }
    }
}
