using System;
using System.Web.UI;

namespace Composite.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 

    public class FlowPage: Page
    {
        public bool SaveStepSucceded { get; set; }
        public EventHandler OnSave { get; set; }
    }
}
