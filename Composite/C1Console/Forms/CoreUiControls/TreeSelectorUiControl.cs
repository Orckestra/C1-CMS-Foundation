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
        public string SelectionProperty { get; set; }

        [FormsProperty]
        public string SelectionValue { get; set; }

        [FormsProperty]
        public string SelectionResult { get; set; }

        [FormsProperty]
        public string SerializedSearchToken { get; set; }

        [FormsProperty]
        public bool Required { get; set; }
    }
}
