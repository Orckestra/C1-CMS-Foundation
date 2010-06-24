using Composite.Data;


namespace Composite.Renderings
{
	public interface IRenderingResponseHandlerFacade
	{
        RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken);
	}
}
