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
        [Obsolete("Use SaveStepSucceeded property instead")]
        public bool SaveStepSucceded { get { return SaveStepSucceeded; } set { SaveStepSucceeded = value; } }

        /// <exclude />
        public bool SaveStepSucceeded { get; set; }

        /// <exclude />
        public EventHandler OnSave { get; set; }

        /// <exclude />
        public EventHandler OnSaveAndPublish { get; set; }
    }
}
