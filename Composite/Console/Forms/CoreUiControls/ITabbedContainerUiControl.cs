using System.Collections.Generic;

using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    /// <summary>
    /// Base class for UiControl tabbed containers. 
    /// </summary>
    internal interface ITabbedContainerUiControl : IContainerUiControl
    {
        /// <summary>
        /// Zero-based index of pre selected tab.
        /// </summary>
        [FormsProperty()]
        int PreSelectedIndex { get; set; }
    }
}
