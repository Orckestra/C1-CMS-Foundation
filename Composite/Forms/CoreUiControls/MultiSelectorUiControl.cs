using System.Collections;

namespace Composite.Forms.CoreUiControls
{
    internal class MultiSelectorUiControl : BaseSelectorUiControl
    {
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
