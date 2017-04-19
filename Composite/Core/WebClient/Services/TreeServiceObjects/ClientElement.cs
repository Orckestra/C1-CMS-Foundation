using System.Collections.Generic;
using System.Diagnostics;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("ClientElement: '{Label}'")]
    public sealed class ClientElement
    {
        /// <exclude />
        public string ElementKey { get; set; }  // CORE

        /// <exclude />
        public string ProviderName { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Piggybag { get; set; }

        /// <exclude />
        public string PiggybagHash { get; set; }

        /// <exclude />
        public string Label { get; set; }  // CORE

        /// <exclude />
        public string ToolTip { get; set; }  // CORE

        /// <exclude />
        public bool HasChildren { get; set; }  // CORE

        /// <exclude />
        public bool IsDisabled { get; set; }  // CORE

        /// <exclude />
        public ResourceHandle Icon { get; set; }  // CORE

        /// <exclude />
        public ResourceHandle OpenedIcon { get; set; }   // CORE       

        /// <exclude />
        public List<ClientAction> Actions { get; set; }

        /// <exclude />
        public List<string> ActionKeys { get; set; }

        /// <exclude />
        public List<KeyValuePair> PropertyBag { get; set; }  // CORE

        /// <exclude />
        public List<string> DropTypeAccept { get; set; }
        
        /// <exclude />
        public bool DetailedDropSupported { get; set; }

        /// <exclude />
        public string DragType { get; set; }

        /// <exclude />
        public string TagValue { get; set; } // CORE

        /// <exclude />
        public bool ContainsTaggedActions { get; set; } // CORE

        /// <summary>
        /// When client is searching through elements to find the element with the given entity token, 
        /// the client should disregard elements with TreeLockEnabled == <value>true</value> and continue searching.
        /// </summary>
        public bool TreeLockEnabled { get; set; }

        /// <summary>
        /// Having a common ElementBundle across elements will make the client bundle them up as a single node, and allow the user to select a specific element via a drop down, showing individual BundleElementName values
        /// </summary>
        public string ElementBundle { get; set; }

        /// <summary>
        /// When bundling elements this field is used to identify this specific element for selection
        /// </summary>
        public string BundleElementName { get; set; }
    }
}
