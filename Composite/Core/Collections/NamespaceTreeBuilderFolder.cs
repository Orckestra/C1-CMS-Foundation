using System.Diagnostics;
using System.Collections.Generic;


namespace Composite.Core.Collections
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Name = {Name}, Namespace = {Namespace}")]
    public sealed class NamespaceTreeBuilderFolder
    {
        internal NamespaceTreeBuilderFolder(string name, string namespaceName)
        {
            this.Name = name;
            this.Namespace = namespaceName;
            this.Leafs = new List<INamespaceTreeBuilderLeafInfo>();
            this.SubFolders = new List<NamespaceTreeBuilderFolder>();
        }


        /// <exclude />
        public string Name
        {
            get;
            private set;
        }


        /// <exclude />
        public string Namespace
        {
            get;
            private set;
        }


        /// <exclude />
        public List<INamespaceTreeBuilderLeafInfo> Leafs
        {
            get;
            private set;
        }


        /// <exclude />
        public List<NamespaceTreeBuilderFolder> SubFolders
        {
            get;
            private set;
        }
    }
}
