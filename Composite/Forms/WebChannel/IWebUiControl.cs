using System.Web.UI;


namespace Composite.Forms.WebChannel
{
    public interface IWebUiControl : IUiControl
    {
        Control BuildWebControl();
        void InitializeViewState();
        string ClientName { get; }
        bool IsFullWidthControl { get; }
    }
}
