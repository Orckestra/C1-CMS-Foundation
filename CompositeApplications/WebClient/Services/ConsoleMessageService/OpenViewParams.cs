using System.Collections.Generic;
using Composite.Types;


namespace Composite.WebClient.Services.ConsoleMessageService
{
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
