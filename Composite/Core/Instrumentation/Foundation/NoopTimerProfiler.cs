namespace Composite.Core.Instrumentation.Foundation
{
    internal sealed class NoopTimerProfiler : TimerProfiler
	{
        public static NoopTimerProfiler Instance { get; } = new NoopTimerProfiler();

        public override void Dispose()
        {
        }
    }
}
