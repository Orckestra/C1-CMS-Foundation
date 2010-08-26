using System;
using System.Globalization;
using System.ComponentModel;


using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    internal abstract class TextEditorUiControl : UiControl
    {
        public TextEditorUiControl()
        {
            this.Text = "";
            this.MimeType = "text/plain";
        }

        [BindableProperty()]
        [FormsProperty()]
        public string Text { get; set; }

        [FormsProperty()]
        public string MimeType { get; set; }
    }

}
