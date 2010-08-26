using Composite.Data;


namespace Composite.Core.WebClient.Renderings
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class RenderingResponseHandlerFacade
	{
        private static IRenderingResponseHandlerFacade _implementation = new RenderingResponseHandlerFacadeImpl();

        internal static IRenderingResponseHandlerFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        public static RenderingResponseHandlerResult GetDataResponseHandling(DataEntityToken requestedItemEntityToken)
        {
            return _implementation.GetDataResponseHandling(requestedItemEntityToken);
        }
	}
}
