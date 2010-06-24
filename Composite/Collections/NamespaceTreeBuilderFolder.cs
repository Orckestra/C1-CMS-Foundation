using System.Diagnostics;
using System.Collections.Generic;


namespace Composite.Collections
{
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


        public string Name
        {
            get;
            private set;
        }


        public string Namespace
        {
            get;
            private set;
        }


        public List<INamespaceTreeBuilderLeafInfo> Leafs
        {
            get;
            private set;
        }


        public List<NamespaceTreeBuilderFolder> SubFolders
        {
            get;
            private set;
        }
    }
}
