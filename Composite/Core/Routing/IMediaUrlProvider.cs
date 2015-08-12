namespace Composite.Core.Routing
{
    /// <summary>    
    /// An interface for providing media urls for a given <see cref="MediaUrlData"/>
    /// </summary>
    public interface IMediaUrlProvider
    {
        /// <summary>
        /// Gets a public media file
        /// </summary>
        string GetUrl(MediaUrlData mediaUrlData);
    }
}
