using Composite.Core.ResourceSystem;
using System.Collections.Generic;
using System;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class OpenHandledViewMessageQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public OpenHandledViewMessageQueueItem(string entityToken, string handle)
        {
            this.EntityToken = entityToken;
            this.Handle = handle;
            this.Arguments = new Dictionary<string, string>();
        }

        /// <exclude />
        public OpenHandledViewMessageQueueItem(string entityToken, string handle, Dictionary<string, string> arguments)
        {
            this.EntityToken = entityToken;
            this.Handle = handle;
            this.Arguments = arguments;
        }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Handle { get; set; }

        /// <exclude />
        public Dictionary<string, string> Arguments { get; set; }
    }
}
