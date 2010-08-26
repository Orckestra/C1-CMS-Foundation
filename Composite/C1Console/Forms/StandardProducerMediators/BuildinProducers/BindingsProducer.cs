using System;
using System.Collections.Generic;


namespace Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("bindings")]
    internal sealed class BindingsProducer : IBuildinProducer
    {
        private List<BindingProducer> _bindings = new List<BindingProducer>();

        internal BindingsProducer() { }

        public List<BindingProducer> bindings
        {
            get { return _bindings; }
            set { _bindings = value; }
        }

        public string GetTypeNameByName(string name)
        {
            foreach (BindingProducer bp in _bindings)
            {
                if (bp.name == name) return bp.type;
            }

            return null;
        }

        public bool? GetOptionalValueByName(string name)
        {
            foreach (BindingProducer bp in _bindings)
            {
                if (bp.name == name) return bp.optional;
            }

            return null;
        }
    }
}
