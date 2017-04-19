using Composite.Core.WebClient.Renderings.Data;


namespace Composite.Data.Types
{
    /// <summary>    
    /// This data interface represents a image media file in C1 CMS. This can be used to query images through a <see cref="Composite.Data.DataConnection"/>. 
    /// </summary>
    [Title("C1 Image File")]
    [ImmutableTypeId("{BF54E59A-0EBC-4162-95B9-C46EE271C7A9}")]
    [KeyTemplatedXhtmlRenderer(XhtmlRenderingType.Embedable, XhtmlRenderingEncoding.AttributeContent, "<img src='~/media({field:StoreId}:{field:Id})' alt='{field:Title}' />")]
    public interface IImageFile : IMediaFile
	{
	}
}
