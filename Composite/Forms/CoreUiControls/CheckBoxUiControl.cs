using System;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Checked")]
    public abstract class CheckBoxUiControl : UiControl
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
