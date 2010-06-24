using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;


namespace Composite.Logging
{
    /// <summary>
    /// This is used when the Composite.Mocks.Plugins.Logging.LogTraceListeners.WinFormTraceListener.WinFormTraceListener
    /// is not available to the system.
    /// </summary>
    internal sealed class NullLogTraceListener : CustomTraceListener
    {
        public override void Write(string message)
        {
        }

        public override void WriteLine(string message)
        {
        }
    }
}
