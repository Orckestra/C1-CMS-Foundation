#define ProfileMemory

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.Core.Threading;

namespace Composite.Core.Instrumentation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class Profiler
    {
        private static readonly string ProfilerKey = typeof (Profiler).FullName;
        // private static readonly IEnumerable<Measurement> EmptyReport = new Measurement[0];


        /// <exclude />
        public static void BeginProfiling()
        {
            if (Disabled) return;

            ThreadDataManagerData threadData = ThreadDataManager.Current;

            Verify.That(!threadData.HasValue(ProfilerKey), "Profiler has already been initialized");

            var stack = new Stack<Measurement>();
            stack.Push(new Measurement("Root") { MemoryUsage = GC.GetTotalMemory(true) });
            threadData.SetValue(ProfilerKey,  stack);
        }


        /// <exclude />
        public static Measurement EndProfiling()
        {
            var threadData = ThreadDataManager.GetCurrentNotNull();

            var stack = threadData[ProfilerKey] as Stack<Measurement>;

            Verify.That(stack.Count == 1, "Perfomance node stack should have exactly one (the root) node");

            threadData.SetValue(ProfilerKey, null);

            var measurement = stack.Pop();

            measurement.MemoryUsage = GC.GetTotalMemory(false) - measurement.MemoryUsage;

            return measurement;
        }


        /// <exclude />
        public static IDisposable Measure(string name)
        {
            if (Disabled) return EmptyDisposable.Instance;

            ThreadDataManagerData currentThreadData = ThreadDataManager.Current;
            ThreadDataManagerData threadData = currentThreadData;

            bool isInParralel = false;
            while(threadData != null)
            {
                if(threadData.HasValue(ProfilerKey))
                {
                    var stack = threadData[ProfilerKey] as Stack<Measurement>;

                    if (stack.Count > 0)
                    {
                        Measurement parentNode = stack.Peek();

                        Stack<Measurement> newNodeStack;

                        if (isInParralel)
                        {
                            if (currentThreadData.HasValue(currentThreadData))
                            {
                                newNodeStack = currentThreadData[ProfilerKey] as Stack<Measurement>;
                            }
                            else
                            {
                                newNodeStack = new Stack<Measurement>();
                                currentThreadData.SetValue(ProfilerKey, newNodeStack);
                            }
                        }
                        else
                        {
                            newNodeStack = stack;
                        }

                        return new InfoCollector(parentNode, name, isInParralel, newNodeStack);
                    }
                }

                // Going to parent thread
                threadData = threadData.Parent;
                isInParralel = true;
            }

            return EmptyDisposable.Instance;
        }

        private class InfoCollector : IDisposable
        {
            private readonly Measurement _node;
            private readonly Stopwatch _stopwatch;
            private readonly Stack<Measurement> _stack;

            public InfoCollector(Measurement parentNode, string name, bool isInParralel, Stack<Measurement> stack)
            {
                _stack = stack;
                _node = new Measurement(name);
#if ProfileMemory
                _node.MemoryUsage = GC.GetTotalMemory(false);
#endif

                if (isInParralel)
                {
                    lock (parentNode.SyncRoot)
                    {
                        parentNode.ParallelNodes.Add(_node);
                    }
                }
                else
                {
                    parentNode.Nodes.Add(_node);
                }

                stack.Push(_node);
                
                _stopwatch = Stopwatch.StartNew();
            }

            public void Dispose()
            {
                _stopwatch.Stop();

                _node.TotalTime = (_stopwatch.ElapsedTicks*1000000) / Stopwatch.Frequency;

#if ProfileMemory
                _node.MemoryUsage = GC.GetTotalMemory(false) - _node.MemoryUsage;
#endif

                _stack.Pop();
            }
        }

        private static bool Disabled
        {
            get { return false; }
        }

        private class EmptyDisposable: IDisposable
        {
            public static readonly EmptyDisposable Instance = new EmptyDisposable();

            public void  Dispose()
            {
            }
        }
    }
}
