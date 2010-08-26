using System.Diagnostics;


namespace Composite.Plugins.Logging.LogTraceListeners.TcpLogTraceListener
{
    internal sealed class TcpLogTraceListenerThreadDataQueueItem
    {
        public string Message { get; set; }
        public TraceEventType TraceEventType { get; set; }
    }
}
