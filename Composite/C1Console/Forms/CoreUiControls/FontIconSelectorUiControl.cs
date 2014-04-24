using System;
using System.Globalization;
using System.ComponentModel;
using Composite.C1Console.Forms.Foundation;
using System.Collections.Generic;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    internal abstract class FontIconSelectorUiControl : UiControl
    {
        public FontIconSelectorUiControl()
        {
            this.SelectedClassName = "";
            this.Required = false;
        }

        [BindableProperty]
        [FormsProperty]
        public string SelectedClassName { get; set; }

        [FormsProperty]
        [RequiredValue]
        public object ClassNameOptions { get; set; }

        [FormsProperty]
        [RequiredValue]
        public string StylesheetPath { get; set; }

        [FormsProperty]
        public string ClassNamePrefix { get; set; }

        [FormsProperty]
        public bool Required { get; set; }
    }

}
