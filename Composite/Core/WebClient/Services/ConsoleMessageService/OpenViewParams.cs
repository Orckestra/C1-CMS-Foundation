using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenViewParams
    {
        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string FlowHandle { get; set; }

        /// <exclude />
        public string Handle { get; set; }

        /// <exclude />
        public string Url { get; set; }

        /// <exclude />
        public List<KeyValuePair> Argument { get; set; }

        /// <exclude />
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
