using Composite.ResourceSystem;
using System;

namespace Composite.ConsoleEventSystem
{
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
