using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class BindEntityTokenToViewQueueItem : IConsoleMessageQueueItem
	{
        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }
	}
}
