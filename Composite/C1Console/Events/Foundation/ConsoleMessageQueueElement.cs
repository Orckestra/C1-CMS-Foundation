using System;


namespace Composite.C1Console.Events.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConsoleMessageQueueElement
    {
        /// <exclude />
        public string ReceiverConsoleId
        {
            get;
            internal set;
        }



        /// <exclude />
        public int QueueItemNumber 
        { 
            get;
            internal set; 
        }



        /// <exclude />
        public DateTime EnqueueTime 
        { 
            get;
            internal set; 
        }



        /// <exclude />
        public IConsoleMessageQueueItem QueueItem
        {
            get;
            internal set; 
        }
    }
}
