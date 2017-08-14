using Composite.C1Console.Events;
using Composite.Core.IO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Composite.Core.Instrumentation
{
#if LeakCheck
    /// <summary>
    /// This class only provide functionality if the conditional compilation symbol #LeakCheck is defined. 
    /// See the <see cref="RegisterFinalizerExecution(string)"/> method for how to feed this class data.
    /// When appPool shuts down a xml file with stack traces and count will be written to the root. This file indicate areas where (tooled) IDisposable classes were not
    /// disposed as expected.
    /// </summary>
    public static class DisposableResourceTracer
    {
        private static Dictionary<string, int> stacks = new Dictionary<string, int>();
        private static object _lock = new object();
        private static object _dumpLock = new object();
        private static bool dumpAlways = false;
        private const string _redundant = @"   at System.Environment.GetStackTrace(Exception e, Boolean needFileInfo)
   at System.Environment.get_StackTrace()
";


        /// <exclude />
        public static readonly DateTime TraceStart = DateTime.Now;

        static DisposableResourceTracer()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);
        }

        private static void OnShutDownEvent(ShutDownEventArgs args)
        {
            dumpAlways = true;
            DumpStacks();
        }

        /// Register a stack trace - expected usage if for this to be called from IDisposable finalizers, indicating they did not dispose as expected from user code.
        /// <example>
        /// #if LeakCheck
        ///     private string stack = Environment.StackTrace;
        ///     ~MyDisposableClass()
        ///     {
        ///         Composite.Core.Instrumentation.DisposableResourceTracer.Register(stack);
        ///     }
        /// #endif
        /// </example>
        /// You should ensure finalizer is not called, when Dispose() execute as expected. Put the following inside your Dispose() method:
        /// <example>
        /// #if LeakCheck
        ///     GC.SuppressFinalize(this);
        /// #endif
        /// </example>
        public static void RegisterFinalizerExecution(string stack)
        {
            lock (_lock)
            {
                string topStack = GetMinimalStackTop(stack);
                int count = 0;
                if (stacks.TryGetValue(topStack, out count))
                {
                    stacks[topStack] = count + 1;
                }
                else
                {
                    stacks.Add(topStack, 1);
                }
            }

            if (dumpAlways) DumpStacks();
        }

        private static void DumpStacks()
        {
            string rootDir = PathUtil.Resolve("~/");
            string fileName = String.Format("DisposableResourceTrace_{0}.xml", TraceStart.ToString("yyyy_MM_dd_HH_mm_ss"));
            string fullPath = Path.Combine(rootDir, fileName);

            var stacks = GetStacks();

            var ordered = stacks.OrderByDescending(f => f.Value);

            XElement dumpDoc = new XElement("DisposableResourceTrace"
                , new XAttribute("start", TraceStart)
                , new XAttribute("end", DateTime.Now)
                , new XAttribute("seconds", (DateTime.Now - TraceStart).TotalSeconds)
                );
            dumpDoc.Add(
                ordered.Select(f => new XElement("Trace", new XAttribute("count", f.Value), f.Key))
                );

            lock (_dumpLock)
            {
                dumpDoc.Save(fullPath);
            }
        }

        private static string GetMinimalStackTop(string stack)
        {
            string[] stackLines = stack.Replace(_redundant,"").Split(new string[] { Environment.NewLine }, StringSplitOptions.None);

            bool foundCaller = false;
            int lineNum = 1;

            StringBuilder sb = new StringBuilder(stackLines[0]+"\n");

            while(!foundCaller && lineNum < stackLines.Length)
            {
                string line = stackLines[lineNum];
                sb.AppendLine(line);
                foundCaller = line.TrimStart().StartsWith("at Composite.") && !line.Contains("..ctor") && !line.Contains(".get_") && !line.Contains(".Threading.");
                lineNum++;
            }

            return sb.ToString();
        }

        /// <summary>
        /// Returns the currently registered stacks - since stacks are typically only registered when GC Generation 2 heap is cleaned - and this happens rarely - the result here is not guaranteed to be complete...
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string, int> GetStacks()
        {
            lock (_lock)
            {
                return new Dictionary<string, int>(stacks);
            }
        }
    }
#endif
}

