using System;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum LogLevel
    {
        Fine,
        Info,
        Debug,
        Warn,
        Error,
        Fatal
    }


    internal static class InternalLogLevelConvertExtensions
    {
        internal static LogLevel AsConsoleType(this Composite.Core.Logging.LogLevel internalLogLevel)
        {
            switch (internalLogLevel)
            {
                case Composite.Core.Logging.LogLevel.Info:
                    return LogLevel.Info;
                case Composite.Core.Logging.LogLevel.Debug:
                    return LogLevel.Debug;
                case Composite.Core.Logging.LogLevel.Fine:
                    return LogLevel.Fine;
                case Composite.Core.Logging.LogLevel.Warning:
                    return LogLevel.Warn;
                case Composite.Core.Logging.LogLevel.Error:
                    return LogLevel.Error;
                case Composite.Core.Logging.LogLevel.Fatal:
                    return LogLevel.Fatal;
                default:
                    throw new ArgumentException("Unknown Composite.Core.Logging.LogLevel " + internalLogLevel.ToString());
            }
        }
    }

}
