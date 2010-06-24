using System;


namespace Composite.WebClient.Services.ConsoleMessageService
{
    public enum LogLevel
    {
        Fine,
        Info,
        Debug,
        Warn,
        Error,
        Fatal
    }


    public static class InternalLogLevelConvertExtensions
    {
        internal static LogLevel AsConsoleType(this Composite.Logging.LogLevel internalLogLevel)
        {
            switch (internalLogLevel)
            {
                case Composite.Logging.LogLevel.Info:
                    return LogLevel.Info;
                case Composite.Logging.LogLevel.Debug:
                    return LogLevel.Debug;
                case Composite.Logging.LogLevel.Fine:
                    return LogLevel.Fine;
                case Composite.Logging.LogLevel.Warning:
                    return LogLevel.Warn;
                case Composite.Logging.LogLevel.Error:
                    return LogLevel.Error;
                case Composite.Logging.LogLevel.Fatal:
                    return LogLevel.Fatal;
                default:
                    throw new ArgumentException("Unknown Composite.Logging.LogLevel " + internalLogLevel.ToString());
            }
        }
    }

}
