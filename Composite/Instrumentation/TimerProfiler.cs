using System;


namespace Composite.Instrumentation
{
    public abstract class TimerProfiler : IDisposable
    {
        internal TimerProfiler()
        {
        }



        public abstract void Dispose();
    }
}
