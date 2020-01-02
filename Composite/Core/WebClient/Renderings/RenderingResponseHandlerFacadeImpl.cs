using Composite.Data;
using Composite.Core.WebClient.Renderings.Foundation;
using Composite.Core.WebClient.Renderings.Foundation.PluginFacades;
using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler;


namespace Composite.Core.WebClient.Renderings
{
    internal sealed class RenderingResponseHandlerFacadeImpl : IRenderingResponseHandlerFacade
	{
        public RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken)
        {
            foreach (string name in RenderingResponseHandlerRegistry.RenderingResponseHandlerNames)
            {
                if (!RenderingResponseHandlerPluginFacade.IsDataRenderingResponseHandler(name)) continue;

                var result = RenderingResponseHandlerPluginFacade.GetDataResponseHandling(name, requestedItemEntityToken);

                if (result != null && result.IsNotEmpty)
                {
                    return result;
                }
            }

            foreach (var responseHandler in ServiceLocator.GetServices<IDataRenderingResponseHandler>())
            {
                var result = responseHandler.GetDataResponseHandling(requestedItemEntityToken);

                if (result != null && result.IsNotEmpty)
                {
                    return result;
                }
            }

            return null;
        }
    }
}
