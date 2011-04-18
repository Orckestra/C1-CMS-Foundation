namespace Composite.Core.Routing.Plugins.PageUrlsProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PageUrlSet
    {
        /// <summary>
        /// Url by which page will be accessable
        /// </summary>
        public string PublicUrl { get; set; }

        /// <summary>
        /// Friendly url, requesting this url will lead to a redirect to PublicUrl
        /// </summary>
        public string FriendlyUrl { get; set; }
    }
}
