using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class SelectElementQueueItem : IConsoleMessageQueueItem
	{
        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string PerspectiveElementKey { get; set; }
	}
}
