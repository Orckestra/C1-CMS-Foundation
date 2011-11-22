using Composite.Core.WebClient.Renderings.Data;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Title("C1 Image File")]
    [ImmutableTypeId("{BF54E59A-0EBC-4162-95B9-C46EE271C7A9}")]
    [KeyTemplatedXhtmlRenderer(XhtmlRenderingType.Embedable, XhtmlRenderingEncoding.AttributeContent, "<img src='~/media({field:Id})?store={field:StoreId}' alt='{field:Title}' />")]
    public interface IImageFile : IMediaFile
	{
	}
}
