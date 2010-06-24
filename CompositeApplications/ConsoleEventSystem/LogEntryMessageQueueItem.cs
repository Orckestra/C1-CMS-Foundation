using System;

using Composite.Logging;


namespace Composite.ConsoleEventSystem
{
    [Serializable]
    public sealed class LogEntryMessageQueueItem : IConsoleMessageQueueItem
    {
        public Type Sender { get; set; }
        public LogLevel Level { get; set; }
        public string Message { get; set; }
    }
}
