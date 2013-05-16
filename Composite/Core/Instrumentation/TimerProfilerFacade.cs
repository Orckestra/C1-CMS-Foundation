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
            if (RuntimeInformation.IsDebugBuild)
            {
#if PROFILE_MODE
                return new XmlTimerProfiler();
#else
                return new NoopTimerProfiler();
#endif
            }
            else
            {
                return new NoopTimerProfiler();
            }
        }


        /// <exclude />
        public static TimerProfiler CreateTimerProfiler(string message)
        {
            if (RuntimeInformation.IsDebugBuild)
            {
#if PROFILE_MODE
                return new XmlTimerProfiler(message);
#else
                return new NoopTimerProfiler();
#endif
            }
            else
            {
                return new NoopTimerProfiler();
            }
        }
    }
}
