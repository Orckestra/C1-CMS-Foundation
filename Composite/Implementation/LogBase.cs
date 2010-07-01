using System;


namespace Composite.Implementation
{
    public class LogBase : ImplementationBase
    {
        public virtual void LogInformation(string title, string messageFormat, params object[] args) { }
        public virtual void LogVerbose(string title, string messageFormat, params object[] args) { }
        public virtual void LogWarning(string title, string messageFormat, params object[] args) { }
        public virtual void LogError(string title, string messageFormat, params object[] args) { }
        public virtual void LogCritical(string title, string messageFormat, params object[] args) { }

        // These could have been added in a later version
        public virtual void LogWarning(string title, Exception exception) { }
        public virtual void LogError(string title, Exception exception) { }
        public virtual void LogCritical(string title, Exception exception) { }
    }
}
