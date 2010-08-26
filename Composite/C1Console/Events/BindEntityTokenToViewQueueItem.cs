using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public class BindEntityTokenToViewQueueItem : IConsoleMessageQueueItem
	{
        public string ViewId { get; set; }
        public string EntityToken { get; set; }
	}
}
