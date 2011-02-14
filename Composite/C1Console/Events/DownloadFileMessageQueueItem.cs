using Composite.Core.ResourceSystem;
using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class DownloadFileMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public DownloadFileMessageQueueItem(string urlToDownload)
        {
            this.Url = urlToDownload;
        }

        /// <exclude />
        public string Url { get; set; }
    }
}
