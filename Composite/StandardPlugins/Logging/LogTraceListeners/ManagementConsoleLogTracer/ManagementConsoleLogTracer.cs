using System;
using System.Text.RegularExpressions;
using Composite.ConsoleEventSystem;
using Composite.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;


namespace Composite.StandardPlugins.Logging.LogTraceListeners.ManagementConsoleLogTracer
{
    [ConfigurationElementType(typeof(CustomTraceListenerData))]
    public sealed class ManagementConsoleLogTracer : CustomTraceListener
    {
        private LogLevel _logLevel;

        public ManagementConsoleLogTracer()
        {

            _logLevel = LogLevel.Info;
        }

        public ManagementConsoleLogTracer(string logLevel)
        {
            switch (logLevel)
            {
                case "Fine":
                    _logLevel = LogLevel.Fine;
                    break;
                case "Info":
                    _logLevel = LogLevel.Info;
                    break;
                case "Fatal":
                    _logLevel = LogLevel.Fatal;
                    break;
                case "Warning":
                    _logLevel = LogLevel.Warning;
                    break;
                case "Debug":
                    _logLevel = LogLevel.Debug;
                    break;
                case "Error":
                    _logLevel = LogLevel.Error;
                    break;
                default:
                    throw new ArgumentException( "Unhandled log level: " + logLevel);
            }
        }


        public override void Write(string message)
        {
            Regex regex = new Regex(@"RGB\((?<r>[0-9]+), (?<g>[0-9]+), (?<b>[0-9]+)\)");
            Match matchMessage = regex.Match(message);
            if (matchMessage.Success == true)
            {
                message = message.Replace(matchMessage.Groups[0].Value, "");
            }

            LogEntryMessageQueueItem messageItem = new LogEntryMessageQueueItem { Level = _logLevel, Message = message, Sender = this.GetType() };
            ConsoleMessageQueueFacade.Enqueue(messageItem, null);
        }


        public override void WriteLine(string message)
        {
            this.Write(message);
        }
    }

}
