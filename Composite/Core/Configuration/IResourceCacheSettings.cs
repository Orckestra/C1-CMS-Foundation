namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IResourceCacheSettings
    {
        /// <exclude />
        string ResourceCacheDirectory { get; set; }
        
        /// <exclude />
        int ServerCacheMinutes { get; set; }
        
        /// <exclude />
        int ClientCacheMinutes { get; set; }
    }
}
