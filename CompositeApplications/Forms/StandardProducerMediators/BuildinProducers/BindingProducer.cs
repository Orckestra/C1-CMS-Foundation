namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    internal sealed class BindingProducer : IBuildinProducer
    {
        private string _type;
        private string _name;
        private bool _optional = false;

        internal BindingProducer() { }

        public string type
        {
            get { return _type; }
            set { _type = value; }
        }

        public string name
        {
            get { return _name; }
            set { _name = value; }
        }

        public bool optional
        {
            get { return _optional; }
            set { _optional = value; }
        }
    }
}
