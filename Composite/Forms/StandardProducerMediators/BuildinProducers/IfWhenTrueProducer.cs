using System.Collections.Generic;

namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("Result")]
    public sealed class IfWhenTrueProducer : IBuildinProducer
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
