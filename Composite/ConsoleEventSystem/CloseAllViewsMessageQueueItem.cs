using System;

namespace Composite.ConsoleEventSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class CloseAllViewsMessageQueueItem : IConsoleMessageQueueItem    
	{
        public string Reason { get; set; }
	}
}
