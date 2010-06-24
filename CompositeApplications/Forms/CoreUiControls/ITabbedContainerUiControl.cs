using System.Collections.Generic;

using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    /// <summary>
    /// Base class for UiControl tabbed containers. 
    /// </summary>
    public interface ITabbedContainerUiControl : IContainerUiControl
    {
        /// <summary>
        /// Zero-based index of pre selected tab.
        /// </summary>
        [FormsProperty()]
        int PreSelectedIndex { get; set; }
    }
}
