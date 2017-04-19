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
    public sealed class OpenSlideViewQueueItem : IConsoleMessageQueueItem
    {
        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Url { get; set; }

    }
}
