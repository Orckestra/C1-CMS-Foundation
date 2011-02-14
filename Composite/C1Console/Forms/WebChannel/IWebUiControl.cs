using System.Web.UI;


namespace Composite.C1Console.Forms.WebChannel
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IWebUiControl : IUiControl
    {
        /// <exclude />
        Control BuildWebControl();

        /// <exclude />
        void InitializeViewState();

        /// <exclude />
        string ClientName { get; }

        /// <exclude />
        bool IsFullWidthControl { get; }
    }
}
