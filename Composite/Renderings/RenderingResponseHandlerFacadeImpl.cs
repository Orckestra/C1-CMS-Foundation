using Composite.Data;
using Composite.Renderings.Foundation;
using Composite.Renderings.Foundation.PluginFacades;


namespace Composite.Renderings
{
    internal sealed class RenderingResponseHandlerFacadeImpl : IRenderingResponseHandlerFacade
	{
        public RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken)
        {
            foreach (string name in RenderingResponseHandlerRegistry.RenderingResponseHandlerNames)
            {
                if (RenderingResponseHandlerPluginFacade.IsDataRenderingResponseHandler(name) == false) continue;

                RenderingResponseHandlerResult result = RenderingResponseHandlerPluginFacade.GetDataResponseHandling(name, requestedItemEntityToken);

                if ((result != null) && 
                    (result.PreventPublicCaching 
                    || result.EndRequest
                    || (result.RedirectRequesterTo != null)))
                {
                    return result;
                }
            }

            return null;
        }
    }
}
