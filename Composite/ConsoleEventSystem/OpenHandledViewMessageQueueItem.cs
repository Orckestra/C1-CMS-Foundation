using Composite.ResourceSystem;
using System.Collections.Generic;
using System;

namespace Composite.ConsoleEventSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class OpenHandledViewMessageQueueItem : IConsoleMessageQueueItem
    {
        public OpenHandledViewMessageQueueItem(string entityToken, string handle)
        {
            this.EntityToken = entityToken;
            this.Handle = handle;
            this.Arguments = new Dictionary<string, string>();
        }

        public OpenHandledViewMessageQueueItem(string entityToken, string handle, Dictionary<string, string> arguments)
        {
            this.EntityToken = entityToken;
            this.Handle = handle;
            this.Arguments = arguments;
        }

        public string EntityToken { get; set; }
        public string Handle { get; set; }
        public Dictionary<string, string> Arguments { get; set; }
    }
}
