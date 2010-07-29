namespace Composite.WebClient.Services.LocalizationServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientLocale
    {
        public string Name { get; set; }
        public string IsoName { get; set; }
        public string UrlMappingName { get; set; }
        public string SerializedActionToken { get; set; }
        public bool IsCurrent { get; set; }
    }
}
