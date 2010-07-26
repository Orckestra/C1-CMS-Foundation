//#define PROFILE_MODE
using Composite.Instrumentation.Foundation;


namespace Composite.Instrumentation
{
    internal static class TimerProfilerFacade
    {
        public static TimerProfiler CreateTimerProfiler()
        {
            if (RuntimeInformation.IsDebugBuild == true)
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


        public static TimerProfiler CreateTimerProfiler(string message)
        {
            if (RuntimeInformation.IsDebugBuild == true)
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
