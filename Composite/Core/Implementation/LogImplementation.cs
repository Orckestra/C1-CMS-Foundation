using System;
using Composite.Core.Logging;

namespace Composite.Core.Implementation
{
    public class LogImplementation
    {
        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called        
        /// </summary>
        public LogImplementation()
        {
        }



        public virtual void LogInformation(string title, string message)
        {
            LoggingService.LogInformation(title, message);
        }



        public virtual void LogInformation(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogInformation(title, string.Format(messageFormat, args));
        }



        public virtual void LogVerbose(string title, string message)
        {
            LoggingService.LogVerbose(title, message);
        }



        public virtual void LogVerbose(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogVerbose(title, string.Format(messageFormat, args));
        }



        public virtual void LogWarning(string title, string message)
        {
            LogWarning(title, message);
        }



        public virtual void LogWarning(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogWarning(title, string.Format(messageFormat, args));
        }



        public virtual void LogWarning(string title, Exception exception) 
        {
            LoggingService.LogWarning(title, exception);
        }



        public virtual void LogError(string title, string message)
        {
            LogError(title, message);
        }



        public virtual void LogError(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogError(title, string.Format(messageFormat, args));
        }



        public virtual void LogError(string title, Exception exception) 
        {
            LoggingService.LogError(title, exception);
        }



        public virtual void LogCritical(string title, string message)
        {
            LoggingService.LogCritical(title, message);
        }



        public virtual void LogCritical(string title, string messageFormat, params object[] args) 
        {
            LoggingService.LogCritical(title, string.Format(messageFormat, args));
        }



        public virtual void LogCritical(string title, Exception exception) 
        {
            LoggingService.LogCritical(title, exception);
        }        
    }
}
