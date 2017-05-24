using System;
using Composite.Core.Extensions;

namespace Composite.Core.Instrumentation
{
    /// <summary>
    /// Logs execution time of the nested code
    /// </summary>
    internal class LogExecutionTime : IDisposable
    {
        private readonly string _message;
        private readonly int _startTime;
        private readonly string _logTitle;

        public LogExecutionTime(string logTitle, string message)
        {
            _logTitle = logTitle;
            _message = message;
            _startTime = Environment.TickCount;
            Log.LogVerbose(_logTitle, "Starting: " + _message);
        }

        public void Dispose()
        {
            int executionTime = Environment.TickCount - _startTime;
            Log.LogVerbose(_logTitle, "Finished: " + _message + " ({0} ms)".FormatWith(executionTime));
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~LogExecutionTime()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
    }
}
