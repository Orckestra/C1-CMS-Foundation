using Composite.Core.Application;
using Composite.Core.WebClient.Services.WampRouter;
using Composite.Plugins.Components.ComponentsEndpoint;
using Composite.Plugins.Search.Endpoint;
using WampSharp.V2.Rpc;

namespace Composite.Core.WebClient
{
    [ApplicationStartup]
    class ComponentsEndpoint
    {
        public static void OnInitialized()
        {
            WampRouterFacade.RegisterCallee(new PageStructureRpc());
        }
    }

    /// <summary>
    /// Rpcs related to page structure
    /// </summary>
    public class PageStructureRpc : IRpcService
    {
        /// <summary>
        /// To get page structure by its name
        /// </summary>
        /// <returns>Page structure</returns>
        [WampProcedure("structure.page")]
        public object Get(string name)
        {
            // TODO: use an interface to resolve a page structure object
            if (name == "search")
            {
                return new ConsoleSearchPageStructure();
            }

            return new ComponentsResponseMessage();
        }
    }
}
