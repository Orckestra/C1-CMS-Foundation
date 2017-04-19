using System;
using System.Globalization;
using Composite.Core.Implementation;
using JetBrains.Annotations;


namespace Composite.Core
{
    /// <summary>
    /// Provide write access to the C1 CMS log. Note that 'verbose' messages are typically only shown in run-time log viewers.
    /// </summary>
    public static class Log
    {
        /// <summary>
        /// Logs a 'information' message to the C1 CMS log.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="message">Message to log</param>
        public static void LogInformation(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogInformation(title, message);
        }



        /// <summary>
        /// Logs a 'information' message to the C1 CMS log.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="messageFormat">Message to log in a String.Format() style using {0} etc.</param>
        /// <param name="args">Arguments to put into the message</param>
        [StringFormatMethod("messageFormat")]
        public static void LogInformation(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogInformation(title, messageFormat, args);
        }



        /// <summary>
        /// Logs a 'verbose' message to the C1 CMS log. Verbose messages are typically only shown in developer log viewers.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="message">Message to log</param>
        public static void LogVerbose(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogVerbose(title, message);
        }



        /// <summary>
        /// Logs a 'verbose' message to the C1 CMS log.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="messageFormat">Message to log in a String.Format() style using {0} etc.</param>
        /// <param name="args">Arguments to put into the message</param>
        [StringFormatMethod("messageFormat")]
        public static void LogVerbose(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogVerbose(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Logs a 'warning' message to the C1 CMS log. 
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="message">Message to log</param>
        public static void LogWarning(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, message);
        }



        /// <summary>
        /// Logs a 'warning' message to the C1 CMS log.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="messageFormat">Message to log in a String.Format() style using {0} etc.</param>
        /// <param name="args">Arguments to put into the message</param>
        [StringFormatMethod("messageFormat")]
        public static void LogWarning(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, messageFormat, args);
        }



        /// <summary>
        /// Logs a 'verbose' message to the C1 CMS log. 
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="exception">Exception to log</param>
        public static void LogWarning(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, exception);
        }



        /// <summary>
        /// Logs a 'error' message to the C1 CMS log. 
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="message">Message to log</param>
        public static void LogError(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, message);
        }



        /// <summary>
        /// Logs a 'error' message to the C1 CMS log.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="messageFormat">Message to log in a String.Format() style using {0} etc.</param>
        /// <param name="args">Arguments to put into the message</param>
        [StringFormatMethod("messageFormat")]
        public static void LogError(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, messageFormat, args);
        }



        /// <summary>
        /// Logs a 'error' message to the C1 CMS log. 
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="exception">Exception to log</param>
        public static void LogError(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, exception);
        }



        /// <summary>
        /// Logs a 'critical' message to the C1 CMS log. You should only use 'critical' when a major system failure occur.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="message">Message to log</param>
        public static void LogCritical(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, message);
        }



        /// <summary>
        /// Logs a 'critical' message to the C1 CMS log. You should only use 'critical' when a major system failure occur.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="messageFormat">Message to log in a String.Format() style using {0} etc.</param>
        /// <param name="args">Arguments to put into the message</param>
        [StringFormatMethod("messageFormat")]
        public static void LogCritical(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, messageFormat, args);
        }



        /// <summary>
        /// Logs a 'critical' message to the C1 CMS log. You should only use 'critical' when a major system failure occur.
        /// </summary>
        /// <param name="title">Title of log message</param>
        /// <param name="exception">Exception to log</param>
        public static void LogCritical(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, exception);
        }    
    }
}
