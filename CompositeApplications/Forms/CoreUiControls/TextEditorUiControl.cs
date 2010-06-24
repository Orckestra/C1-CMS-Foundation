using System;
using System.Globalization;
using System.ComponentModel;


using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    public abstract class TextEditorUiControl : UiControl
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
