namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    internal sealed class ReadProducer : IBuildinProducer
    {
        private string _source;

        internal ReadProducer() { }

        public string source
        {
            get { return _source; }
            set { _source = value; }
        }
    }
}
