using WampSharp.V2.Rpc;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// This class should be implemented when a callee is going to be registered on Wamp Router
    /// </summary>
    public interface IRpcService
    {
        /// <summary>
        /// Basic ping method
        /// </summary>
        [WampProcedure("ping")]
        void Ping();
    }
}