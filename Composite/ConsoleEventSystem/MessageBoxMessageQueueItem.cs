using System;

namespace Composite.ConsoleEventSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class MessageBoxMessageQueueItem : IConsoleMessageQueueItem
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public DialogType DialogType { get; set; }
    }
}
