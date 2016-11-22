using System;
using System.Globalization;
using Composite.Core.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation pending
    /// </summary>
    public class LogImplementation : ILog
    {
        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called        
        /// </summary>
        public LogImplementation()
        {
        }


        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        public virtual void LogInformation(string title, string message)
        {
            LoggingService.LogInformation(title, message);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="messageFormat"></param>
        /// <param name="args"></param>
        public virtual void LogInformation(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogInformation(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        public virtual void LogVerbose(string title, string message)
        {
            LoggingService.LogVerbose(title, message);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="messageFormat"></param>
        /// <param name="args"></param>
        public virtual void LogVerbose(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogVerbose(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        public virtual void LogWarning(string title, string message)
        {
            LoggingService.LogWarning(title, message);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="messageFormat"></param>
        /// <param name="args"></param>
        public virtual void LogWarning(string title, string messageFormat, params object[] args) 
        {
            LogWarning(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="exception"></param>
        public virtual void LogWarning(string title, Exception exception) 
        {
            LoggingService.LogWarning(title, exception);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        public virtual void LogError(string title, string message)
        {
            LoggingService.LogError(title, message);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="messageFormat"></param>
        /// <param name="args"></param>
        public virtual void LogError(string title, string messageFormat, params object[] args) 
        {
            LogError(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="exception"></param>
        public virtual void LogError(string title, Exception exception) 
        {
            LoggingService.LogError(title, exception);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        public virtual void LogCritical(string title, string message)
        {
            LoggingService.LogCritical(title, message);
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="messageFormat"></param>
        /// <param name="args"></param>
        public virtual void LogCritical(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogCritical(title, string.Format(CultureInfo.InvariantCulture, messageFormat, args));
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        /// <param name="title"></param>
        /// <param name="exception"></param>
        public virtual void LogCritical(string title, Exception exception) 
        {
            LoggingService.LogCritical(title, exception);
        }        
    }

    /// <summary>
    /// IServiceCollection extensions
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Registers logging service
        /// </summary>
        /// <param name="serviceCollection">Collection onto register service</param>
        public static void AddLogging(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(ILog), typeof(LogImplementation));
        }
    }
}
