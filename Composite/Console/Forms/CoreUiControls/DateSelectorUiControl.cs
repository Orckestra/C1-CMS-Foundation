using System;

using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Date")]
    internal abstract class DateTimeSelectorUiControl : UiControl
    {
        [BindableProperty()]
        [FormsProperty()]
        public DateTime? Date { get; set; }
    }
}
