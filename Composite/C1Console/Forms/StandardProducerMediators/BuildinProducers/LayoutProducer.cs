namespace Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers
{
    [ControlValueProperty(nameof(UiControl))]
    internal sealed class LayoutProducer : IBuildinProducer
    {
        public IUiControl UiControl { get; set; }

        public string label { get; set; }

        public string tooltip { get; set; }

        public string iconhandle { get; set; }
    }
}
