using System;

namespace Composite.Core.Logging
{
    /// <summary>
    /// Provide access to write to the log
    /// </summary>
    public interface ILog
    {
        /// <summary>
        /// LogCritical
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="message">message</param>
        void LogCritical(string title, string message);

        /// <summary>
        /// LogCritical
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="exception">exception</param>
        void LogCritical(string title, Exception exception);

        /// <summary>
        /// LogCritical
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="messageFormat">messageFormat</param>
        /// <param name="args">args</param>
        void LogCritical(string title, string messageFormat, params object[] args);

        /// <summary>
        /// LogError
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="message">message</param>
        void LogError(string title, string message);

        /// <summary>
        /// LogError
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="exception">exception</param>
        void LogError(string title, Exception exception);

        /// <summary>
        /// LogError
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="messageFormat">messageFormat</param>
        /// <param name="args">args</param>
        void LogError(string title, string messageFormat, params object[] args);

        /// <summary>
        /// LogInformation
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="message">message</param>
        void LogInformation(string title, string message);

        /// <summary>
        /// LogInformation
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="messageFormat">messageFormat</param>
        /// <param name="args">args</param>
        void LogInformation(string title, string messageFormat, params object[] args);

        /// <summary>
        /// LogVerbose
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="message">message</param>
        void LogVerbose(string title, string message);

        /// <summary>
        /// LogVerbose
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="messageFormat">messageFormat</param>
        /// <param name="args">args</param>
        void LogVerbose(string title, string messageFormat, params object[] args);

        /// <summary>
        /// LogWarning
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="message">message</param>
        void LogWarning(string title, string message);

        /// <summary>
        /// LogWarning
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="exception">exception</param>
        void LogWarning(string title, Exception exception);

        /// <summary>
        /// LogWarning
        /// </summary>
        /// <param name="title">title</param>
        /// <param name="messageFormat">messageFormat</param>
        /// <param name="args">args</param>
        void LogWarning(string title, string messageFormat, params object[] args);
    }
}