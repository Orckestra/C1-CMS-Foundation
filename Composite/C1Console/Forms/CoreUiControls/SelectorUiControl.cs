using System;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class DoubleSelectorUiControl : BaseSelectorUiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public object FirstKey { get; set; }

        [BindableProperty()]
        [FormsProperty()]
        public object SecondKey { get; set; }        
    }
}
