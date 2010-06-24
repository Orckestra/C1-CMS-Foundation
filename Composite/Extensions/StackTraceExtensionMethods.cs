using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;


namespace Composite.Extensions
{
	public static class StackTraceExtensionMethods
	{
        public static IEnumerable<StackFrame> AsEnumerable(this StackTrace stackTrace)
        {
            if (stackTrace == null) throw new ArgumentNullException("stackTrace");

            for (int i = 0; i < stackTrace.FrameCount; i++)
            {
                yield return stackTrace.GetFrame(i);
            }
        }


        public static IQueryable<StackFrame> AsQueryable(this StackTrace stackTrace)
        {
            if (stackTrace == null) throw new ArgumentNullException("stackTrace");

            return stackTrace.AsEnumerable().AsQueryable();
        }
    }
}
