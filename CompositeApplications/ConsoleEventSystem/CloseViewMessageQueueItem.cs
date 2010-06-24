using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class CloseViewMessageQueueItem : IConsoleMessageQueueItem
    {
        public string ViewId { get; set; }
    }
}
