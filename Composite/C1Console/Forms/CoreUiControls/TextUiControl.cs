using System;
using System.Globalization;
using System.ComponentModel;

using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    internal abstract class TextUiControl : UiControl
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
