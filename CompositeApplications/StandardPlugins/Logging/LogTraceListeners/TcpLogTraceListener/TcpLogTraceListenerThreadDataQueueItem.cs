using System.Diagnostics;


namespace Composite.StandardPlugins.Logging.LogTraceListeners.TcpLogTraceListener
{
    public sealed class TcpLogTraceListenerThreadDataQueueItem
    {
        public string Message { get; set; }
        public TraceEventType TraceEventType { get; set; }
    }
}
