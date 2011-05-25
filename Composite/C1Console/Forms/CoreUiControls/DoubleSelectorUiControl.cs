using System;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class SelectorUiControl : BaseSelectorUiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public object Selected { get; set; }        
    }
}
