using System;

using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Checked")]
    internal abstract class CheckBoxUiControl : UiControl
    {
        private bool _checked = false;

        [BindableProperty()]
        [FormsProperty()]
        public bool Checked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        [FormsProperty()]
        public string ItemLabel { get; set; }
    }
}
