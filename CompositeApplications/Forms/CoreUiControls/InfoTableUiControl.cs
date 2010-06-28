using System;
using System.Globalization;
using System.ComponentModel;

using Composite.Forms.Foundation;
using System.Collections.Generic;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Rows")]
    internal abstract class InfoTableUiControl : UiControl
    {
        [FormsProperty()]
        public List<string> Headers { get; set; }

        [FormsProperty()]
        public List<List<string>> Rows  { get; set; }

        [FormsProperty()]
        public string Caption { get; set; }

        [FormsProperty()]
        public bool Border { get; set; }
    }
}
