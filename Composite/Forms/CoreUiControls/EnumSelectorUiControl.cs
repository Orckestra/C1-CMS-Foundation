using System;
using Composite.Forms.Foundation;
namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Selected")]
    internal abstract class EnumSelectorUiControl : UiControl
    {
        private string _selected;

        [BindableProperty()]
        [FormsProperty()]
        public string Selected 
        { 
            get { return _selected; } 
            set { _selected = Enum.Parse(EnumType, value).ToString(); } 
        }

        [RequiredValue()]
        [FormsProperty()]
        public Type EnumType { get; set; }
    }
}
