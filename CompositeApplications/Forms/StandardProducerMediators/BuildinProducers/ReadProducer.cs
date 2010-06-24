namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    public sealed class ReadProducer : IBuildinProducer
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
