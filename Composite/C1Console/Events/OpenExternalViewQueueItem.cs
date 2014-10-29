using System;
using System.Collections.Generic;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class OpenExternalViewQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public OpenExternalViewQueueItem(EntityToken entityToken)
        {
            this.EntityToken = EntityTokenSerializer.Serialize(entityToken);
        }

        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }

        /// <exclude />
        public ResourceHandle IconResourceHandle { get; set; }

        /// <exclude />
        public string Url { get; set; }

        /// <exclude />
        public string ViewType { get; set; }

        /// <exclude />
        public Dictionary<string, string> UrlPostArguments { get; set; }
    }
}
