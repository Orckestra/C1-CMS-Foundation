using System;

using Composite.Core.Logging;


namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class LogEntryMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public Type Sender { get; set; }

        /// <exclude />
        public LogLevel Level { get; set; }

        /// <exclude />
        public string Message { get; set; }
    }
}
