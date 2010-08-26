using System;
using System.Globalization;
using System.ComponentModel;


using Composite.C1Console.Forms.Foundation;
using System.Collections.Generic;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Xhtml")]
    internal abstract class XhtmlEditorUiControl : UiControl
    {
        private string _xhtml = "";

        [BindableProperty()]
        [FormsProperty()]
        public string Xhtml
        {
            get { return _xhtml; }
            set { _xhtml = value; }
        }

        [FormsProperty()]
        public string ClassConfigurationName { get; set; }

        [FormsProperty()]
        public IEnumerable<Type> EmbedableFieldsTypes { get; set; }
    }

}
