using System;


namespace Composite.ConsoleEventSystem.Foundation
{
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
