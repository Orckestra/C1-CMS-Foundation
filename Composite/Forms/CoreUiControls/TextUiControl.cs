using System;
using System.Globalization;
using System.ComponentModel;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    public abstract class TextUiControl : UiControl
    {
        private string _text = "";

        [FormsProperty()]
        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }
    }
}
