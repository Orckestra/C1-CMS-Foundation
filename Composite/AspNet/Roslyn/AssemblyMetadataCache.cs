using Microsoft.CodeAnalysis;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;

namespace Composite.AspNet.Roslyn
{
    internal class AssemblyMetadataCache
    {
        private const long MaxInactiveTicksAllowed = 1200000000L;

        private const long MillisecondsInOneMinutes = 60000L;

        private static AssemblyMetadataCache instance = new AssemblyMetadataCache();

        private ConcurrentDictionary<string, AssemblyMetadata> dictionary;

        private DateTime lastActiveTime;

        private volatile Timer timer;

        private object lockObject;

        private AssemblyMetadataCache()
        {
            this.dictionary = new ConcurrentDictionary<string, AssemblyMetadata>();
            this.lockObject = new object();
            this.Activate();
        }

        public static AssemblyMetadataCache GetInstance()
        {
            return AssemblyMetadataCache.instance;
        }

        public AssemblyMetadata GetOrAdd(string key, Func<string, AssemblyMetadata> func)
        {
            this.Activate();
            this.StartTimer();
            return this.dictionary.GetOrAdd(key, func);
        }

        private void Activate()
        {
            this.lastActiveTime = DateTime.Now;
        }

        private void StartTimer()
        {
            if (this.timer == null)
            {
                lock (this.lockObject)
                {
                    if (this.timer == null)
                    {
                        this.timer = new Timer(new TimerCallback(this.ClearIfInactive), null, MillisecondsInOneMinutes, MillisecondsInOneMinutes);
                    }
                }
            }
        }

        private bool IsActive()
        {
            return DateTime.Now.Ticks - this.lastActiveTime.Ticks > MaxInactiveTicksAllowed;
        }

        private void ClearIfInactive(object state)
        {
            if (!this.IsActive())
            {
                Timer timer = this.timer;
                if (Interlocked.CompareExchange<Timer>(ref this.timer, null, timer) == timer && timer != null)
                {
                    timer.Dispose();
                }
                ICollection<string> keys = this.dictionary.Keys;
                foreach (string current in keys)
                {
                    AssemblyMetadata assemblyMetadata;
                    this.dictionary.TryRemove(current, out assemblyMetadata);
                    if (assemblyMetadata != null)
                    {
                        assemblyMetadata.Dispose();
                    }
                }
            }
        }
    }
}
