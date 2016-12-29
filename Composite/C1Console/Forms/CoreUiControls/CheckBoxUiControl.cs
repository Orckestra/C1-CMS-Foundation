using System;
using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty(nameof(Checked))]
    internal abstract class CheckBoxUiControl : UiControl
    {
        [BindableProperty]
        [FormsProperty]
        public bool Checked { get; set; }

        [FormsProperty]
        public string ItemLabel { get; set; }

        [BindableProperty]
        [FormsProperty]
        public EventHandler CheckedChangedEventHandler { get; set; }
    }
}
