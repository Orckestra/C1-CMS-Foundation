
using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Title")]
    internal abstract class HeadingUiControl : UiControl
    {
        [FormsProperty()]
        public string Title { get; set; }


        [FormsProperty()]
        public string Description { get; set; }
    }
}
