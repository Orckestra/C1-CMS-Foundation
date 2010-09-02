using System;
using Composite.Core.Implementation;


namespace Composite.Core
{
    public static class Log
    {
        public void LogInformation(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogInformation(title, message);
        }



        public virtual void LogInformation(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogInformation(title, messageFormat, args);
        }



        public virtual void LogVerbose(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogVerbose(title, message);
        }



        public virtual void LogVerbose(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogVerbose(title, string.Format(messageFormat, args));
        }



        public virtual void LogWarning(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, message);
        }



        public virtual void LogWarning(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, messageFormat, args);
        }



        public virtual void LogWarning(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogWarning(title, exception);
        }



        public virtual void LogError(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, message);
        }



        public virtual void LogError(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, messageFormat, args);
        }



        public virtual void LogError(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogError(title, exception);
        }



        public virtual void LogCritical(string title, string message)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, message);
        }



        public virtual void LogCritical(string title, string messageFormat, params object[] args)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, messageFormat, args);
        }



        public virtual void LogCritical(string title, Exception exception)
        {
            ImplementationFactory.CurrentFactory.StatelessLog.LogCritical(title, exception);
        }    
    }
}
