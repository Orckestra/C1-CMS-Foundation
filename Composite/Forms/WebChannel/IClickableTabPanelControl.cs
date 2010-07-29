using System.Web.UI;


namespace Composite.Forms.WebChannel
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IClickableTabPanelControl
    {
        string CustomTabId { get; }
        Control EventControl { get; }
    }
}
