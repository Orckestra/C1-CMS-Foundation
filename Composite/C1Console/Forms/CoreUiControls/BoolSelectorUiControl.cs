using System;

using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("IsTrue")]
    internal abstract class BoolSelectorUiControl : UiControl
    {
        [BindableProperty]
        [FormsProperty]
        public bool IsTrue { get; set; }


        [FormsProperty]
        public string TrueLabel { get; set; }


        [FormsProperty]
        public string FalseLabel { get; set; }

        [BindableProperty]
        [FormsProperty]
        public EventHandler SelectionChangedEventHandler { get; set; }
    }
}
