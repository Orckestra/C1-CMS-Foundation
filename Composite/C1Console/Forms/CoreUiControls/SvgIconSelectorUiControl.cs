using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Text")]
    internal abstract class SvgIconSelectorUiControl : UiControl
    {
        public SvgIconSelectorUiControl()
        {
            this.Selected = "";
            this.Required = false;
        }

        [BindableProperty]
        [FormsProperty]
        public string Selected { get; set; }

        [FormsProperty]
        public string SvgSpritePath { get; set; }

        [FormsProperty]
        public bool Required { get; set; }
    }

}
