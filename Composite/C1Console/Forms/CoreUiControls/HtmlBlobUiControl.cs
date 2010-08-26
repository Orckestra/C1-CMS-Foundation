using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Html")]
    internal abstract class HtmlBlobUiControl : UiControl
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
