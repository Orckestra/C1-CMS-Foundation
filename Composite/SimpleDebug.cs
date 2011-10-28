using System;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Threading;
using Composite.Core.IO;


namespace Composite
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal class SimpleDebug
    {
        public static void AddEntry(string entry)
        {
            string filePath = Path.Combine(PathUtil.BaseDirectory, "Log.txt");

            for (int i = 0; i < 10; i++)
            {
                try
                {
                    File.AppendAllLines(filePath, new[] { entry });
                    return;
                }
                catch (Exception)
                {
                    Thread.Sleep(100);
                }
            }
        }



        public static void AddStack()
        {
            StackTrace stackTrace = new StackTrace();

            foreach (StackFrame stackFrame in stackTrace.GetFrames())
            {
                AddEntry(stackFrame.GetMethod() + " at " + stackFrame.GetFileLineNumber());
            }
        }
    }
}
