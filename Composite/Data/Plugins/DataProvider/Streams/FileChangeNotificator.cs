using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using System.Threading;
using Composite.Core.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Data.Streams;
using System.IO;
using Composite.Core;

namespace Composite.Data.Plugins.DataProvider.Streams
{
	internal static class FileChangeNotificator
	{
        private static readonly object _syncRoot = new object();
        private static C1FileSystemWatcher _fileWatcher;

        private static int _counter;

        // We're holding only weak reference to subscriber objects, in order to avoid memory leaks
        private static readonly Hashtable<string, ReadOnlyCollection<Pair<MethodInfo, WeakReference>>> _subscribers = new Hashtable<string, ReadOnlyCollection<Pair<MethodInfo, WeakReference>>>();


        private static void EnsureInitialization()
        {
            if (_fileWatcher != null)
            {
                return;
            }

            lock (_syncRoot)
            {
                if (_fileWatcher != null)
                {
                    return;
                }

                _fileWatcher = new C1FileSystemWatcher(AppDomain.CurrentDomain.BaseDirectory)
                {
                    IncludeSubdirectories = true,
                    NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite,
                    InternalBufferSize = 32768
                };

                // _fileWatcher.Created += FileWatcher_Created;
                _fileWatcher.Changed += FileWatcher_Changed;
                _fileWatcher.Deleted += FileWatcher_Deleted;

                _fileWatcher.EnableRaisingEvents = true;
            }
        }


        static void FileWatcher_Deleted(object sender, FileSystemEventArgs e)
        {
            FireFileChangedEvent(e.FullPath, FileChangeType.Deleted);
        }

        static void FileWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            FileChangeType changeType = e.ChangeType == WatcherChangeTypes.Renamed
                                            ? FileChangeType.Renamed
                                            : FileChangeType.Modified;
            FireFileChangedEvent(e.FullPath, changeType);
        }

        //static void FileWatcher_Created(object sender, FileSystemEventArgs e)
        //{
        //    // Do nothing...
        //}

        private static void FireFileChangedEvent(string filePath, FileChangeType changeType)
        {
            filePath = filePath.ToLowerInvariant();

            ReadOnlyCollection<Pair<MethodInfo, WeakReference>> weakInvocationList;

            if (!_subscribers.TryGetValue(filePath.ToLowerInvariant(), out weakInvocationList))
            {
                return;
            }

            var parameters = new object[] { filePath, changeType };

            foreach (var callInfo in weakInvocationList)
            {
                try
                {
                    if (callInfo.Second == null) // Call to a static method
                    {
                        callInfo.First.Invoke(null, parameters);
                    }
                    else
                    {
                        object target = callInfo.Second.Target;
                        if (target != null) // Checking if object is alive
                        {
                            callInfo.First.Invoke(target, parameters);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Log.LogError(nameof(FileChangeNotificator), ex);
                }
            }
        }


        public static void Subscribe(FileSystemFileBase file, OnFileChangedDelegate handler)
        {
            Verify.ArgumentNotNull(file, "file");

            Subscribe(file.SystemPath, handler);
        }


	    public static void Subscribe(string filePath, OnFileChangedDelegate handler)
        {
            Verify.ArgumentNotNullOrEmpty(filePath, "filePath");
            Verify.ArgumentNotNull(handler, "handler");

            EnsureInitialization();

            int counterValue = Interlocked.Increment(ref _counter);
            if (counterValue % 100 == 0)
            {
                ClearDeadReferences();
            }

            var weakInvocationList = new List<Pair<MethodInfo, WeakReference>>();
            foreach (Delegate func in handler.GetInvocationList())
            {
                var targetObject = func.Target;
                if (targetObject == null)
                {
                    weakInvocationList.Add(new Pair<MethodInfo, WeakReference>(func.Method, null));
                }
                else
                {
                    weakInvocationList.Add(new Pair<MethodInfo, WeakReference>(func.Method, new WeakReference(handler.Target)));
                }
            }

            string key = filePath.ToLowerInvariant();
            lock (_syncRoot)
            {
                if (_subscribers.ContainsKey(key))
                {
                    ReadOnlyCollection<Pair<MethodInfo, WeakReference>> oldList = _subscribers[key];

                    var newList = new ReadOnlyCollection<Pair<MethodInfo, WeakReference>>(
                        new List<Pair<MethodInfo, WeakReference>>(oldList.Concat(weakInvocationList)));

                    _subscribers[key] = newList;
                }
                else
                {
                    _subscribers.Add(key, new ReadOnlyCollection<Pair<MethodInfo, WeakReference>>(weakInvocationList));
                }
            }
        }

        private static void ClearDeadReferences()
        {
            lock(_syncRoot)
            {
                ICollection<string> keys = _subscribers.GetKeys();

                foreach(string key in keys)
                {
                    ReadOnlyCollection<Pair<MethodInfo, WeakReference>> currentList = _subscribers[key];

                    int countOfAlive = currentList.Count(pair => pair.Second == null || pair.Second.IsAlive);
                    if(countOfAlive == 0)
                    {
                        _subscribers.Remove(key);
                        continue;
                    }

                    if (countOfAlive == currentList.Count)
                    {
                        continue;
                    }

                    var newList = new List<Pair<MethodInfo, WeakReference>>(
                        currentList.Where(pair => pair.Second == null || pair.Second.IsAlive));

                    _subscribers[key] = new ReadOnlyCollection<Pair<MethodInfo, WeakReference>>(newList);
                }
            }
        }
	}
}
