using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenViewParams
    {
        public string ViewId { get; set; }
        public string EntityToken { get; set; }
        public string FlowHandle { get; set; }
        public string Handle { get; set; }
        public string Url { get; set; }
        public List<KeyValuePair> Argument { get; set; }  
        public ViewType ViewType { get; set; }

        /// <summary>
        /// Label for view
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Icon URL
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// Tooltip for view tab
        /// </summary>
        public string ToolTip { get; set; }
    }
}
