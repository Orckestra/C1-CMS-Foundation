using System;


namespace Composite.ConsoleEventSystem.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConsoleMessageQueueElement
    {
        public string ReceiverConsoleId
        {
            get;
            internal set;
        }



        public int QueueItemNumber 
        { 
            get;
            internal set; 
        }



        public DateTime EnqueueTime 
        { 
            get;
            internal set; 
        }



        public IConsoleMessageQueueItem QueueItem
        {
            get;
            internal set; 
        }
    }
}
