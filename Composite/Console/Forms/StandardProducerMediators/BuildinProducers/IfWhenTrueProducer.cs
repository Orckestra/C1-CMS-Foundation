using System.Collections.Generic;

namespace Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("Result")]
    internal sealed class IfWhenTrueProducer : IBuildinProducer
    {
        private List<object> _result = new List<object>();

        internal IfWhenTrueProducer() { }

        public List<object> Result
        {
            get { return _result; }
            set { _result = value; }
        }
    }
}
