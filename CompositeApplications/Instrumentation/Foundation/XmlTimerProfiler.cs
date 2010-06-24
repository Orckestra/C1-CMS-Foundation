using System;
using System.Diagnostics;
using System.Reflection;


namespace Composite.Instrumentation.Foundation
{
    public sealed class XmlTimerProfiler : TimerProfiler
	{
        private int _startTime;
        private bool _disposed = false;


        internal XmlTimerProfiler()
        {
            StackTrace stackTrace = new StackTrace();

            StackFrame stackFrame = stackTrace.GetFrame(2);

            MemberInfo methodInfo = stackFrame.GetMethod();

            string methodName = string.Format("{0}.{1}", methodInfo.DeclaringType.FullName, methodInfo.Name);

            _startTime = Environment.TickCount;

            XmlTimerProfilerFacade.Instance.Push(methodName, null);
        }



        internal XmlTimerProfiler(string message)
        {
            StackTrace stackTrace = new StackTrace();

            StackFrame stackFrame = stackTrace.GetFrame(2);

            MemberInfo methodInfo = stackFrame.GetMethod();

            string methodName = string.Format("{0}.{1}", methodInfo.DeclaringType.FullName, methodInfo.Name);

            _startTime = Environment.TickCount;

            XmlTimerProfilerFacade.Instance.Push(methodName, message);
        }



        public override void Dispose()
        {
            if (_disposed == false)
            {
                int elapsedTime = Environment.TickCount - _startTime;

                XmlTimerProfilerFacade.Instance.Pop(elapsedTime);

                _disposed = true;
            }
        }



        ~XmlTimerProfiler()
        {
            Dispose();
        }
	}
}
