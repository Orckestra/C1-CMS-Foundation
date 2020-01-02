using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;

namespace Composite.Plugins.Logging.LogTraceListeners.SystemDiagnosticsTrace
{
    [ConfigurationElementType(typeof(CustomTraceListenerData))]
    internal sealed class SystemDiagnosticsTraceBridge : CustomTraceListener
    {
        public SystemDiagnosticsTraceBridge()
        {
        }

        public SystemDiagnosticsTraceBridge(string initializeData)
        {
        }

        public override void TraceData(System.Diagnostics.TraceEventCache eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, object data)
        {
            var logEntry = (Microsoft.Practices.EnterpriseLibrary.Logging.LogEntry)data;

            string title = logEntry.Title;
            title = title.Substring(title.IndexOf(')') + 2); // Removing ({AppDomainId} - {ThreadId}}) prefix.
            if (title.StartsWith("RGB("))
            {
                string displayOptions = title.Substring(0, title.IndexOf(')') + 1);
                title = title.Substring(displayOptions.Length);
            }

            string message = String.Format("[{0}] {1}", title, logEntry.Message);

            switch (logEntry.Severity)
            {
                case System.Diagnostics.TraceEventType.Critical:
                case System.Diagnostics.TraceEventType.Error:
                    System.Diagnostics.Trace.TraceError(message);
                    break;
                case System.Diagnostics.TraceEventType.Warning:
                    System.Diagnostics.Trace.TraceWarning(message);
                    break;
                case System.Diagnostics.TraceEventType.Information:
                    System.Diagnostics.Trace.TraceInformation(message);
                    break;
                default:
                    System.Diagnostics.Trace.WriteLine(message);
                    break;
            }

            System.Diagnostics.Trace.Flush();
        }

        public override void Write(string message)
        {
            System.Diagnostics.Trace.Write(message);
        }

        public override void WriteLine(string message)
        {
            System.Diagnostics.Trace.WriteLine(message);
        }
    }
}
