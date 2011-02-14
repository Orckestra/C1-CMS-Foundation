using System.Web.UI;


namespace Composite.C1Console.Forms.WebChannel
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IClickableTabPanelControl
    {
        /// <exclude />
        string CustomTabId { get; }

        /// <exclude />
        Control EventControl { get; }
    }
}
