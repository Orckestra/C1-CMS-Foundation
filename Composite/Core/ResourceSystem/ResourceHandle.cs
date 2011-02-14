using System;
using Composite.Core.ResourceSystem.Icons;


namespace Composite.Core.ResourceSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class ResourceHandle
    {
        /// <exclude />
        public static ResourceHandle Build(string resourceNamespace, string resourceName)
        {
            return new ResourceHandle(resourceNamespace, resourceName);
        }


        /// <exclude />
        public static ResourceHandle BuildIconFromDefaultProvider(string resourceName)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, resourceName);
        }


        /// <summary>
        /// DO NOT USE! For serializing only!
        /// </summary>        
        public ResourceHandle() { }


        /// <exclude />
        public ResourceHandle(string resourceNamespace, string resourceName)
        {
            this.ResourceName = resourceName;
            this.ResourceNamespace = resourceNamespace;
        }


        /// <exclude />
        public string ResourceNamespace { get; set; }


        /// <exclude />
        public string ResourceName{ get; set; }
    }
}
