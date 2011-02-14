using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class MessageBoxMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public string Title { get; set; }

        /// <exclude />
        public string Message { get; set; }

        /// <exclude />
        public DialogType DialogType { get; set; }
    }
}
