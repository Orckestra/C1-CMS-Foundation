#define ProfileMemory

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.C1Console.Security;
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

            Verify.That(stack.Count == 1, "Performance node stack should have exactly one (the root) node");

            threadData.SetValue(ProfilerKey, null);

            var measurement = stack.Pop();

            measurement.MemoryUsage = GC.GetTotalMemory(false) - measurement.MemoryUsage;

            return measurement;
        }

        /// <exclude />
        public static IDisposable Measure(string name)
        {
            return Measure(name, null);
        }


        /// <exclude />
        public static IDisposable Measure(string name, Func<EntityToken> entityTokenFactory)
        {
            if (Disabled) return EmptyDisposable.Instance;

            Measurement currentNode;
            Stack<Measurement> stack;
            bool isInParallel;

            if (!GetCurrentNode(out currentNode, out stack, out isInParallel))
            {
                return EmptyDisposable.Instance;
            }

            Stack<Measurement> newNodeStack;

            if (isInParallel)
            {
                ThreadDataManagerData currentThreadData = ThreadDataManager.Current;

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

            return new InfoCollector(currentNode, name, isInParallel, newNodeStack, entityTokenFactory);
        }

        private static bool GetCurrentNode(
            out Measurement parentNode, 
            out Stack<Measurement> stack,
            out bool isInParallel)
        {
            if (Disabled)
            {
                parentNode = null;
                stack = null;
                isInParallel = false;
                return false;
            }

            ThreadDataManagerData currentThreadData = ThreadDataManager.Current;
            ThreadDataManagerData threadData = currentThreadData;

            isInParallel = false;
            while (threadData != null)
            {
                if (threadData.HasValue(ProfilerKey))
                {
                    stack = threadData[ProfilerKey] as Stack<Measurement>;

                    if (stack.Count > 0)
                    {
                        parentNode = stack.Peek();

                        return true;
                    }
                }

                // Going to parent thread
                threadData = threadData.Parent;
                isInParallel = true;
            }

            stack = null;
            parentNode = null;
            return false;
        }

        private class InfoCollector : IDisposable
        {
            private readonly Measurement _node;
            private readonly Stopwatch _stopwatch;
            private readonly Stack<Measurement> _stack;

            public InfoCollector(Measurement parentNode, string name, bool isInParallel, Stack<Measurement> stack, Func<EntityToken> entityTokenFactory)
            {
                _stack = stack;

                _node = new Measurement(name)
                {
                    EntityTokenFactory = entityTokenFactory,
#if ProfileMemory
                    MemoryUsage = GC.GetTotalMemory(false)
#endif
                };




                if (isInParallel)
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

        internal static void AddSubMeasurement(Measurement measurement)
        {
            Verify.ArgumentNotNull(measurement, "measurement");

            Measurement currentNode;
            Stack<Measurement> stack;
            bool isInParallel;

            if (!GetCurrentNode(out currentNode, out stack, out isInParallel))
            {
                return;
            }

            if (isInParallel)
            {
                lock (currentNode.SyncRoot)
                {
                    currentNode.ParallelNodes.Add(measurement);
                }
            }
            else
            {
                currentNode.Nodes.Add(measurement);
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
