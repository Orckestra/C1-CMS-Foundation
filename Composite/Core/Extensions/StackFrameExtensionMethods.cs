using System;
using System.Diagnostics;
using System.Reflection;


namespace Composite.Core.Extensions
{
	internal static class StackFrameExtensionMethods
	{
        public static string ToExceptionString(this StackFrame stackFrame)
        {
            if (stackFrame == null) throw new ArgumentNullException("stackFrame");

            MethodInfo mi = stackFrame.GetMethod() as MethodInfo;
            string methodExceptionString = ( mi == null ? "(constructor)" : mi.ToExceptionString());

            return string.Format("   at {0} in {1}:line {2}", methodExceptionString, stackFrame.GetFileName(), stackFrame.GetFileLineNumber());
        }
	}
}
