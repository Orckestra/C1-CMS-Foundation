namespace Composite.GlobalSettings
{
    public interface IResourceCacheSettings
    {
        string CachePath { get; set; }
        int ServerCacheMinutes { get; set; }
        int ClientCacheMinutes { get; set; }
    }
}
