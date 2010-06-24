namespace Composite.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty("Condition")]
    public sealed class IfConditionProducer : IBuildinProducer
    {
        private bool _condition;

        internal IfConditionProducer() { }

        public bool Condition
        {
            get { return _condition; }
            set { _condition = value; }
        }
    }
}
