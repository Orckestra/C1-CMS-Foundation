using System;
using System.Web.UI;

namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 

    public class FlowPage: Page
    {
        /// <exclude />
        public bool SaveStepSucceded { get; set; }

        /// <exclude />
        public EventHandler OnSave { get; set; }

        /// <exclude />
        public EventHandler OnSaveAndPublish { get; set; }
    }
}
