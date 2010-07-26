using System.Web.UI;


namespace Composite.Forms.WebChannel
{
    public interface IClickableTabPanelControl
    {
        string CustomTabId { get; }
        Control EventControl { get; }
    }
}
