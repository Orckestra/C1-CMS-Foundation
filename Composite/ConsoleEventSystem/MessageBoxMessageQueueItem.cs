using System;

namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class MessageBoxMessageQueueItem : IConsoleMessageQueueItem
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public DialogType DialogType { get; set; }
    }
}
