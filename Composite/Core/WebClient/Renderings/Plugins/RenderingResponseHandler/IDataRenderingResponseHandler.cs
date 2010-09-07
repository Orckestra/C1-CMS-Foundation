using Composite.Data;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDataRenderingResponseHandler : IRenderingResponseHandler
	{
        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestedItemEntityToken"></param>
        /// <returns>Returning null if no special handling should be done.</returns>
        RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken);
	}
}
