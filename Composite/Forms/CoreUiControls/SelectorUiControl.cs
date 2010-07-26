using System;


namespace Composite.Forms.CoreUiControls
{
    internal class SelectorUiControl : BaseSelectorUiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public object Selected { get; set; }        
    }
}
