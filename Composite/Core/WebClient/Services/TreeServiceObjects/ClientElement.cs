using System.Collections.Generic;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientElement
    {
        public string ElementKey { get; set; }  // CORE
        public string ProviderName { get; set; }
        public string EntityToken { get; set; }
        public string Piggybag { get; set; }
        public string PiggybagHash { get; set; }
        public string Label { get; set; }  // CORE
        public string ToolTip { get; set; }  // CORE
        public bool HasChildren { get; set; }  // CORE
        public bool IsDisabled { get; set; }  // CORE
        public ResourceHandle Icon { get; set; }  // CORE
        public ResourceHandle OpenedIcon { get; set; }   // CORE       
        public List<ClientAction> Actions { get; set; }
        public List<string> ActionKeys { get; set; }
        public List<KeyValuePair> PropertyBag { get; set; }  // CORE
        public List<string> DropTypeAccept { get; set; }
        public bool DetailedDropSupported { get; set; }
        public string DragType { get; set; }
        public string TagValue { get; set; } // CORE
        public bool ContainsTaggedActions { get; set; } // CORE
        public bool TreeLockEnabled { get; set; }
    }
}
