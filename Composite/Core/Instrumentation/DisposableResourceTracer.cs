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
    /// It is defined for this build...
    /// It is NOT defined for this build...
    /// </summary>
    public static class DisposableResourceTracer
    {
        private static Dictionary<string, int> stacks = new Dictionary<string, int>();
        private static object _lock = new object();
        private static object _dumpLock = new object();
        private static bool dumpAlways = false;

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

        public static void Register(string stack)
        {
            lock (_lock)
            {
                int count = 0;
                if (stacks.TryGetValue(stack, out count))
                {
                    stacks[stack] = count + 1;
                }
                else
                {
                    stacks.Add(stack, 1);
                }
            }

            if (dumpAlways) DumpStacks();
        }

        private static void DumpStacks()
        {
            string rootDir = PathUtil.Resolve("~/");
            string fileName = String.Format("DisposableResourceTrace_{0}.xml", TraceStart.ToString("yyyy_MM_dd_HH_mm_ss"));
            string fullPath = Path.Combine(rootDir, fileName);

            var redundant = @"   at System.Environment.GetStackTrace(Exception e, Boolean needFileInfo)
   at System.Environment.get_StackTrace()";
            var stacks = GetStacks();

            var ordered = stacks.OrderByDescending(f => f.Value);

            XElement dumpDoc = new XElement("DisposableResourceTrace"
                , new XAttribute("start", TraceStart)
                , new XAttribute("end", DateTime.Now)
                , new XAttribute("seconds", (DateTime.Now - TraceStart).TotalSeconds)
                );
            dumpDoc.Add(
                ordered.Select(f => new XElement("Trace", new XAttribute("count", f.Value), f.Key.Replace(redundant,"")))
                );

            lock (_dumpLock)
            {
                dumpDoc.Save(fullPath);
            }
        }

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

