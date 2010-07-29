using Composite.ResourceSystem;
using System;

namespace Composite.ConsoleEventSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class DownloadFileMessageQueueItem : IConsoleMessageQueueItem
    {
        public DownloadFileMessageQueueItem(string urlToDownload)
        {
            this.Url = urlToDownload;
        }

        public string Url { get; set; }
    }
}
