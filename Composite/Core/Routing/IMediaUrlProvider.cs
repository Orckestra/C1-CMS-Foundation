using System;
using Composite.Core.WebClient.Media;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// An interface for providing media urls for a given <see cref="MediaUrlData"/>
    /// </summary>
    public interface IMediaUrlProvider
    {
        bool IsSupportedStoreId(string storeId);

        string GetPublicMediaUrl(string storeId, Guid mediaId);
    }

    /// <summary>    
    /// An interface for providing media urls for a given <see cref="MediaUrlData"/>
    /// </summary>
    public interface IResizableImageUrlProvider: IMediaUrlProvider
    {
        string GetResizedImageUrl(string storeId, Guid mediaId, ResizingOptions resizingOptions);
    }
}
