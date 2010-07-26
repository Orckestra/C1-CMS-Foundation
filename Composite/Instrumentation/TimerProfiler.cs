using System;


namespace Composite.Instrumentation
{
    internal abstract class TimerProfiler : IDisposable
    {
        internal TimerProfiler()
        {
        }



        public abstract void Dispose();
    }
}
