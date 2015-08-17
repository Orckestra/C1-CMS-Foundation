using System;
using Composite.Core.WebClient.Media;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// An interface for providing media urls for a given media id.
    /// </summary>
    public interface IMediaUrlProvider
    {
        /// <summary>
        /// Gets a public media url
        /// </summary>
        /// <param name="storeId">The store id.</param>
        /// <param name="mediaId">The media id.</param>
        /// <returns></returns>
        string GetPublicMediaUrl(string storeId, Guid mediaId);
    }

    /// <summary>    
    /// An interface for providing media urls for a given media id.
    /// </summary>
    public interface IResizableImageUrlProvider: IMediaUrlProvider
    {
        /// <summary>
        /// Gets a public media url, that takes the specified resizing options into account
        /// </summary>
        /// <param name="storeId">The store id.</param>
        /// <param name="mediaId">The media id.</param>
        /// <param name="resizingOptions">The image resizing options.</param>
        /// <returns></returns>
        string GetResizedImageUrl(string storeId, Guid mediaId, ResizingOptions resizingOptions);
    }
}
