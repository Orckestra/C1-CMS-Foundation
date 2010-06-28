using System;
using System.ComponentModel;
using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [DefaultBindingProperty("Selected")]
    internal class DataReferenceTreeSelectorUiControl : UiControl
    {
        public DataReferenceTreeSelectorUiControl()
        {
            Selected = null;
        }

        [BindableProperty(), FormsProperty()]
        public string Selected { get; set; }

        [FormsProperty()]
        public string Handle { get; set; }

        [FormsProperty()]
        public string RootEntityToken { get; set; }

        [FormsProperty()]
        public string SearchToken { get; set; }

        [FormsProperty()]
        public Type DataType { get; set; }

        [FormsProperty()]
        public bool NullValueAllowed { get; set; }
    }
}
