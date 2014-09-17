using System.Collections;

namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class MultiSelectorUiControl : BaseSelectorUiControl
    {
        public MultiSelectorUiControl() : base()
        {
            this.Required = false;
        }

        [BindableProperty()]
        [FormsProperty()]
        public IEnumerable Selected { get; set; }

        [BindableProperty()]
        [FormsProperty()]
        public string SelectedAsString { get; set; }

        [FormsProperty()]
        public bool CompactMode { get; set; }
    }
}
