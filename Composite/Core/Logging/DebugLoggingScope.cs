using System;
using System.Diagnostics;


namespace Composite.Core.Logging
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class DebugLoggingScope : IDisposable
	{
        /// <exclude />
        public static IDisposable CompletionTime( Type callingType, string actionInfo )
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                return new DebugLoggingScope(callingType.Name, actionInfo, false, TimeSpan.MinValue);
            }

            return EmptyDisposable.Instance;
        }


        /// <exclude />
        public static IDisposable CompletionTime(Type callingType, string actionInfo, TimeSpan loggingThreshold)
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                return new DebugLoggingScope(callingType.Name, actionInfo, false, loggingThreshold);
            }

            return EmptyDisposable.Instance;
        }


        /// <exclude />
        public static IDisposable MethodInfoScope
        {
            get
            {
                if (RuntimeInformation.IsDebugBuild)
                {
                    var stackTrace = new StackTrace();
                    var method = stackTrace.GetFrame(1).GetMethod();
                    string scopeName = $"{method.DeclaringType.Name}.{method.Name}";

                    return new DebugLoggingScope(scopeName, "Method", true, TimeSpan.MinValue);
                }

                return EmptyDisposable.Instance;
            }
        }


        private readonly int _startTickCount;
        private readonly string _scopeName;
        private readonly string _actionInfo;
        private readonly TimeSpan _threshold;

        private DebugLoggingScope(string scopeName, string actionInfo, bool logStart, TimeSpan threshold)
        {
            _startTickCount = Environment.TickCount;
            _scopeName = scopeName;
            _actionInfo = actionInfo;
            _threshold = threshold;

            if (logStart)
            {
                Log.LogVerbose(_scopeName, $"Starting {_actionInfo}");
            }
        }


        /// <exclude />
        public void Dispose()
        {
            int endTickCount = Environment.TickCount;
            var totalMilliseconds = endTickCount - _startTickCount;
            if (totalMilliseconds >= _threshold.TotalMilliseconds)
            {
                Log.LogVerbose(_scopeName, $"Finished {_actionInfo} ({totalMilliseconds} ms)");
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
    }
}
