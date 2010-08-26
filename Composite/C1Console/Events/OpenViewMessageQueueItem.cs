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
        public OpenViewMessageQueueItem()
        {
            this.FlowHandle = "";
        }

        public string ViewId { get; set; }
        public string EntityToken { get; set; }
        public string FlowHandle { get; set; }
        public string Url { get; set; }
        public Dictionary<string, string> UrlPostArguments { get; set; }
        public ViewType ViewType { get; set; }
        public string Label { get; set; }
        public string ToolTip { get; set; }
        public ResourceHandle IconResourceHandle { get; set; }        
    }
}
