using Composite.Data;


namespace Composite.Core.WebClient.Renderings
{
	internal interface IRenderingResponseHandlerFacade
	{
        RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken);
	}
}
