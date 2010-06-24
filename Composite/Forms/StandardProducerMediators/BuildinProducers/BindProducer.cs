namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    public sealed class BindProducer : IBuildinProducer
    {
        private string _source;

        internal BindProducer() { }

        public string source
        {
            get { return _source; }
            set { _source = value; }
        }
    }
}
