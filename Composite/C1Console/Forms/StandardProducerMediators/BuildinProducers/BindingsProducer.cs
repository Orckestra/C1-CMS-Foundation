using System;
using System.Collections.Generic;
using System.Linq;


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
            return _bindings.FirstOrDefault(bp => bp.name == name)?.type;
        }

        public bool? GetOptionalValueByName(string name)
        {
            return _bindings.FirstOrDefault(bp => bp.name == name)?.optional;
        }
    }
}
