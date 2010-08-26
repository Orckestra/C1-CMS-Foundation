using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class SaveStatusConsoleMessageQueueItem : IConsoleMessageQueueItem
	{
        public string ViewId { get; set; }
        public bool Succeeded { get; set; }
	}
}
