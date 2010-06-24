using System;


namespace Composite.Forms.CoreUiControls
{
    public class SelectorUiControl : BaseSelectorUiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public object Selected { get; set; }        
    }
}
