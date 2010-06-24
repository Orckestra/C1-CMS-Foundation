using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Html")]
    public abstract class HtmlBlobUiControl : UiControl
    {
        private string _html = "";

        [FormsProperty()]
        public string Html
        {
            get { return _html; }
            set { _html = value; }
        }
    }
}
