namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IResourceCacheSettings
    {
        string CachePath { get; set; }
        int ServerCacheMinutes { get; set; }
        int ClientCacheMinutes { get; set; }
    }
}
