
using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Title")]
    public abstract class HeadingUiControl : UiControl
    {
        [FormsProperty()]
        public string Title { get; set; }


        [FormsProperty()]
        public string Description { get; set; }
    }
}
