using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;


namespace Composite.Core.Logging
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class DebugLoggingScope : IDisposable
	{
        private static IDisposable _noActionDisposable = new NoActionDisposable();

        /// <exclude />
        public static IDisposable CompletionTime( Type callingType, string actionInfo )
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                return new DebugLoggingScope(callingType.Name, actionInfo, false, TimeSpan.MinValue);
            }
            else
            {
                return _noActionDisposable;
            }
        }


        /// <exclude />
        public static IDisposable CompletionTime(Type callingType, string actionInfo, TimeSpan loggingThreshold)
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                return new DebugLoggingScope(callingType.Name, actionInfo, false, loggingThreshold);
            }
            else
            {
                return _noActionDisposable;
            }
        }


        /// <exclude />
        public static IDisposable MethodInfoScope
        {
            get
            {
                if (RuntimeInformation.IsDebugBuild)
                {
                    StackTrace stackTrace = new StackTrace();
                    StackFrame stackFrame = stackTrace.GetFrame(1);
                    string scopeName = string.Format("{0}.{1}", stackFrame.GetMethod().DeclaringType.Name, stackFrame.GetMethod().Name);

                    return new DebugLoggingScope(scopeName, "Method", true, TimeSpan.MinValue);
                }
                else
                {
                    return _noActionDisposable;
                }
            }
        }


        private int _startTickCount;
        private string _scopeName;
        private string _actionInfo;
        private TimeSpan _threshold;

        private DebugLoggingScope(string scopeName, string actionInfo, bool logStart, TimeSpan threshold)
        {
            _startTickCount = Environment.TickCount;
            _scopeName = scopeName;
            _actionInfo = actionInfo;
            _threshold = threshold;

            if (logStart==true)
            {
                LoggingService.LogVerbose(_scopeName, string.Format("Starting {0}", _actionInfo));
            }
        }


        /// <exclude />
        public void Dispose()
        {
            int endTickCount = Environment.TickCount;
            if ((endTickCount - _startTickCount) >= _threshold.Milliseconds)
            {
                LoggingService.LogVerbose(_scopeName, string.Format("Finished {0} ({1} ms)", _actionInfo, endTickCount - _startTickCount));
            }
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }


#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~DebugLoggingScope()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif


        private class NoActionDisposable : IDisposable
        {
            public void Dispose()
            {
            }
        }

    }
}
