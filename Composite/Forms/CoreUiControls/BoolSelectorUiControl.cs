using System;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("IsTrue")]
    internal abstract class BoolSelectorUiControl : UiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public bool IsTrue { get; set; }


        [FormsProperty()]
        public string TrueLabel { get; set; }


        [FormsProperty()]
        public string FalseLabel { get; set; }
    }
}
