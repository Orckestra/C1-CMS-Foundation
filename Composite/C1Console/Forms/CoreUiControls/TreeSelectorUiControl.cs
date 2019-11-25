using System;
using System.Collections.Generic;
using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("SelectedKeys")]
    internal abstract class TreeSelectorUiControl : UiControl
    {
        [BindableProperty]
        [FormsProperty]
        public string SelectedKey { get; set; }

        [FormsProperty]
        public string ElementProvider { get; set; }

        [FormsProperty]
        public string SelectableElementPropertyName { get; set; }

        [FormsProperty]
        public string SelectableElementPropertyValue { get; set; }

        [FormsProperty]
        public string SelectableElementReturnValue { get; set; }

        [FormsProperty]
        public string SerializedSearchToken { get; set; }

        [FormsProperty]
        public bool Required { get; set; }
    }
}
