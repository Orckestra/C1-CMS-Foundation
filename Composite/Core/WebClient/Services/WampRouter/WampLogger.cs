using System;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Composite.Core.Logging;
using WampSharp.Logging;
using LogLevel = WampSharp.Logging.LogLevel;

namespace Composite.Core.WebClient.Services.WampRouter
{
    class WampLogger : ILogProvider
    {
        public Logger GetLogger(string name)
        {
            return new CompositeLoggerWrapper().Log;
        }

        public IDisposable OpenNestedContext(string message)
        {
            return null;
        }

        public IDisposable OpenMappedContext(string key, string value)
        {
            return null;
        }

        internal class CompositeLoggerWrapper
        {
            public bool Log(LogLevel logLevel, Func<string> messageFunc, Exception exception,
                params object[] formatParameters)
            {
                if (exception is OperationCanceledException)
                {
                    return true;
                }

                if (messageFunc != null)
                {
                    var eventType = GetTraceEventType(logLevel);

                    var message = FormatMessage(messageFunc, formatParameters);

                    LoggingService.LogEntry(nameof(WampLogger), message, LoggingService.Category.General, eventType);
                }

                if (exception != null)
                {
                    Core.Log.LogError(nameof(WampLogger), exception);
                }

                return true;
            }

            private static TraceEventType GetTraceEventType(LogLevel logLevel)
            {
                switch (logLevel)
                {
                    case LogLevel.Fatal:
                        return TraceEventType.Critical;
                    case LogLevel.Error:
                        return TraceEventType.Error;
                    case LogLevel.Warn:
                        return TraceEventType.Warning;
                    case LogLevel.Info:
                        return TraceEventType.Information;
                    case LogLevel.Trace:
                    case LogLevel.Debug:
                        return TraceEventType.Verbose;
                }

                return TraceEventType.Warning;
            }


            private string FormatMessage(Func<string> messageFunc, params object[] formatParameters)
            {
                var message = messageFunc();
                var needle = new Regex(@"\{(.*?)\}");

                int i = 0;
                while (needle.IsMatch(message))
                {
                    message = needle.Replace(message, "^" + i + "#", 1);
                    i++;
                }

                return string.Format(message.Replace('#', '}').Replace('^', '{'), formatParameters);
            }
        }
    }
}
