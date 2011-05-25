using System;
using System.Globalization;
using System.ComponentModel;
using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum TextBoxType
    {
        /// <exclude />
        String = 0,

        /// <exclude />
        Integer = 1,

        /// <exclude />
        Decimal = 2,

        /// <exclude />
        Password = 3,

        /// <exclude />
        ProgrammingIdentifier = 4,
        
        /// <exclude />
        ProgrammingNamespace = 5,

        /// <exclude />
        ReadOnly = 6,

        /// <exclude />
        Guid = 7
    }



    [ControlValueProperty("Text")]
    internal abstract class TextInputUiControl : UiControl
    {
        public TextInputUiControl()
        {
            this.Text = "";
            this.Type = TextBoxType.String;
            this.Required = false;
        }

        [BindableProperty]
        [FormsProperty]
        public string Text { get; set; }


        [FormsProperty]
        public TextBoxType Type { get; set; }

        [BindableProperty]
        [FormsProperty]
        public bool Required { get; set; }
    }

}
