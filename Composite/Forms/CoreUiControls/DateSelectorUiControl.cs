using System;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Date")]
    internal abstract class DateTimeSelectorUiControl : UiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public DateTime? Date { get; set; }
    }
}
