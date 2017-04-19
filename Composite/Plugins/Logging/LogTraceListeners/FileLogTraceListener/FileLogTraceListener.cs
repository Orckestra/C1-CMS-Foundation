using System;
using Composite.Core.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    [ConfigurationElementType(typeof(CustomTraceListenerData))]
	internal class FileLogTraceListener: CustomTraceListener
	{
        private static readonly TimeSpan TimeZoneAdjustment = TimeZone.CurrentTimeZone.GetUtcOffset(DateTime.Now);

        public FileLogTraceListener()
        {
            // That one should not be used
        }

        public FileLogTraceListener(string initializeData)
        {
            Verify.ArgumentNotNullOrEmpty(initializeData, nameof(initializeData));

            string[] parts = initializeData.Split(new[] {','});
            Verify.ArgumentCondition(parts.Length == 2, "initializeData", "Wrong configuration parameters");

            if(LoggerInstance == null)
            {
                string logFolderPath = parts[0];
                bool flushAfterEveryLine;
                if (!bool.TryParse(parts[1], out flushAfterEveryLine))
                {
                    throw new ArgumentException(initializeData, nameof(initializeData));
                }

                // Setting public property, so it can be used by a webservice
                LoggerInstance = new FileLogger(logFolderPath, flushAfterEveryLine);
            }
        }

        public override void TraceData(System.Diagnostics.TraceEventCache eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, object data)
        {
            var logEntry = (Microsoft.Practices.EnterpriseLibrary.Logging.LogEntry)data;

            var fileLogEntry = new LogEntry
            {
                TimeStamp = logEntry.TimeStamp.Add(TimeZoneAdjustment),
                ApplicationDomainId = AppDomain.CurrentDomain.Id,
                ThreadId = System.Threading.Thread.CurrentThread.ManagedThreadId,
                Message = logEntry.Message,
                Severity = logEntry.Severity.ToString(),
            };

            string title = logEntry.Title;
            title = title.Substring(title.IndexOf(')') + 2); // Removing ({AppDomainId} - {ThreadId}}) prefix.

            // Extracting display options from title
            if (title.StartsWith("RGB("))
            {
                fileLogEntry.DisplayOptions = title.Substring(0, title.IndexOf(')') + 1);
                title = title.Substring(fileLogEntry.DisplayOptions.Length);
            }
            fileLogEntry.Title = title;

            LoggerInstance.WriteEntry(fileLogEntry);
        }

        public override void Write(string message)
        {
            // Do nothing here...
        }

        public override void WriteLine(string message)
        {
            // Do nothing here...
        }

        public static FileLogger LoggerInstance { get; private set; }
    }
}
