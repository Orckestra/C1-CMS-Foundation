//#define PROFILE_MODE
using Composite.Core.Instrumentation.Foundation;


namespace Composite.Core.Instrumentation
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TimerProfilerFacade
    {
        /// <exclude />
        public static TimerProfiler CreateTimerProfiler()
        {
#if PROFILE_MODE
            if (RuntimeInformation.IsDebugBuild)
            {
                return new XmlTimerProfiler();
            }
#endif
            return NoopTimerProfiler.Instance;
        }


        /// <exclude />
        public static TimerProfiler CreateTimerProfiler(string message)
        {
#if PROFILE_MODE
            if (RuntimeInformation.IsDebugBuild)
            {
                return new XmlTimerProfiler(message);
            }
#endif
            return NoopTimerProfiler.Instance;
        }
    }
}