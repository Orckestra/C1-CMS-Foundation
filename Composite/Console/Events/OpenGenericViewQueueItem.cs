using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;

namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public class OpenGenericViewQueueItem : IConsoleMessageQueueItem
    {
        public OpenGenericViewQueueItem(EntityToken entityToken)
            : this(entityToken, Guid.NewGuid().ToString())
        {
        }



        public OpenGenericViewQueueItem(EntityToken entityToken, string viewId)
        {
            this.EntityToken = EntityTokenSerializer.Serialize(entityToken);
            this.ViewId = viewId;
        }

        public string ViewId { get; set; }
        public string EntityToken { get; set; }        

        public string Label { get; set; }
        public string ToolTip { get; set; }
        public ResourceHandle IconResourceHandle { get; set; }        

        public string Url { get; set; }
        public Dictionary<string, string> UrlPostArguments { get; set; }
    }
}
