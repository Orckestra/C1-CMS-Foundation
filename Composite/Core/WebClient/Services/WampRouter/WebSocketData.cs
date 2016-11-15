using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Web;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <exclude />
    public sealed class WebSocketData
    {
        internal WebSocketData(WebSocket webSocket,HttpContext httpContext)
        {
            WebSocket = webSocket;
            HttpContext = httpContext;
        }

        /// <exclude />
        public WebSocket WebSocket { get; }

        /// <exclude />
        public HttpContext HttpContext { get; }

        /// <exclude />
        public Task ReadTask { get; internal set; }
    }
}