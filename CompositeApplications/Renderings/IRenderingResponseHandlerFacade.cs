using Composite.Data;


namespace Composite.Renderings
{
	internal interface IRenderingResponseHandlerFacade
	{
        RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken);
	}
}
