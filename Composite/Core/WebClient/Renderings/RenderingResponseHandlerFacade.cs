using Composite.Data;


namespace Composite.Core.WebClient.Renderings
{
    /// <summary>
    /// Pass information about a request through all <see cref="Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.IDataRenderingResponseHandler"/> 
    /// plugins registered on the C1 CMS site. Use this if you are handling raw page / media http requests yourself.
    /// 
    /// </summary>
	public static class RenderingResponseHandlerFacade
	{
        private static IRenderingResponseHandlerFacade _implementation = new RenderingResponseHandlerFacadeImpl();

        internal static IRenderingResponseHandlerFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        /// <summary>
        /// Pass information about a request through all <see cref="Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.IDataRenderingResponseHandler"/> 
        /// plugins registered on the C1 CMS site. The resulting <see cref="RenderingResponseHandlerResult"/> define how you should treat the request.
        /// </summary>
        /// <param name="requestedItemEntityToken">The data being rendered. This can be <see cref="Composite.Data.Types.IPage"/> and <see cref="Composite.Data.Types.IMediaFile"/>.</param>
        /// <returns>A <see cref="RenderingResponseHandlerResult"/> object detailing what should happen to the user request. Returning null means no special handling should be done (request should continue).</returns>
        public static RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken)
        {
            return _implementation.GetDataResponseHandling(requestedItemEntityToken);
        }
	}
}
