using Composite.Core.ResourceSystem;
using System;
using System.Collections.Generic;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class OpenViewMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public OpenViewMessageQueueItem()
        {
            this.FlowHandle = "";
        }

        /// <exclude />
        public string ViewId { get; set; }
        
        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string FlowHandle { get; set; }

        /// <exclude />
        public string Url { get; set; }

        /// <exclude />
        public Dictionary<string, string> UrlPostArguments { get; set; }

        /// <exclude />
        public ViewType ViewType { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }

        /// <exclude />
        public ResourceHandle IconResourceHandle { get; set; }        
    }
}
