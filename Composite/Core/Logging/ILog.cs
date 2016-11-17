using System;

namespace Composite.Core.Logging
{
    /// <summary>
    /// Provide access to write to the log
    /// </summary>
    public interface ILog
    {

        void LogCritical(string title, string message);
        void LogCritical(string title, Exception exception);
        void LogCritical(string title, string messageFormat, params object[] args);
        void LogError(string title, string message);
        void LogError(string title, Exception exception);
        void LogError(string title, string messageFormat, params object[] args);
        void LogInformation(string title, string message);
        void LogInformation(string title, string messageFormat, params object[] args);
        void LogVerbose(string title, string message);
        void LogVerbose(string title, string messageFormat, params object[] args);
        void LogWarning(string title, string message);
        void LogWarning(string title, Exception exception);
        void LogWarning(string title, string messageFormat, params object[] args);
    }
}