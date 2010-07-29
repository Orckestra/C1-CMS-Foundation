using System;
using System.Globalization;
using System.ComponentModel;
using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum TextBoxType
    {
        String,
        Integer,
        Decimal,
        Password,
        ProgrammingIdentifier,
        ProgrammingNamespace,
        ReadOnly,
        Guid
    }



    [ControlValueProperty("Text")]
    internal abstract class TextInputUiControl : UiControl
    {
        public TextInputUiControl()
        {
            this.Text = "";
            this.Type = TextBoxType.String;
        }

        [BindableProperty()]
        [FormsProperty()]
        public string Text { get; set; }


        [FormsProperty()]
        public TextBoxType Type { get; set; }
    }

}
