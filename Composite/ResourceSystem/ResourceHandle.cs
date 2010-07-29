using System;
using Composite.ResourceSystem.Icons;


namespace Composite.ResourceSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class ResourceHandle
    {
        public static ResourceHandle Build(string resourceNamespace, string resourceName)
        {
            return new ResourceHandle(resourceNamespace, resourceName);
        }



        public static ResourceHandle BuildIconFromDefaultProvider(string resourceName)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, resourceName);
        }


        /// <summary>
        /// DO NOT USE! For serializing only!
        /// </summary>
        public ResourceHandle() { }       


        public ResourceHandle(string resourceNamespace, string resourceName)
        {
            this.ResourceName = resourceName;
            this.ResourceNamespace = resourceNamespace;
        }


        public string ResourceNamespace { get; set; }


        public string ResourceName{ get; set; }
    }
}
