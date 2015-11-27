using System.IO;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;
using System;
using System.Threading.Tasks;
using System.Threading;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    // TODO: has to implement IDisposable as it may contain unmanaged resources
    internal class LocalC1FileSystemWatcher : IC1FileSystemWatcher
    {
        private const string LogTitle = "LocalC1FileSystemWatcher";
        private readonly FileSystemWatcher _fileSystemWatcher;

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public LocalC1FileSystemWatcher(string path, string filter)
        {
            if (filter == null)
            {
                _fileSystemWatcher = new FileSystemWatcher(path)
                {
                    InternalBufferSize = 8192
                };
            }
            else
            {
                _fileSystemWatcher = new FileSystemWatcher(path, filter);
            }
            _fileSystemWatcher.Error += _fileSystemWatcher_Error;
        }



        void _fileSystemWatcher_Error(object sender, ErrorEventArgs e)
        {
            Composite.Core.Log.LogWarning(LogTitle, e.GetException());
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public bool EnableRaisingEvents
        {
            get
            {
                return _fileSystemWatcher.EnableRaisingEvents;
            }
            set
            {
                // Systems with flaky disk IO this can block thread for a very long time
                Task.Factory.StartNew(() => {
                    Thread.Sleep(1000);
                    DoEnableRaisingEvents(value);
                });
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        private void DoEnableRaisingEvents(bool raiseEvents)
        {
            try
            {
                _fileSystemWatcher.EnableRaisingEvents = raiseEvents;
            }
            catch (Exception ex)
            {
                Composite.Core.Log.LogWarning(LogTitle, ex);
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public string Path
        {
            get
            {
                return _fileSystemWatcher.Path;
            }
            set
            {
                _fileSystemWatcher.Path = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public string Filter
        {
            get
            {
                return _fileSystemWatcher.Filter;
            }
            set
            {
                _fileSystemWatcher.Filter = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public bool IncludeSubdirectories
        {
            get
            {
                return _fileSystemWatcher.IncludeSubdirectories;
            }
            set
            {
                _fileSystemWatcher.IncludeSubdirectories = value;
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public int InternalBufferSize
        {
            get { return _fileSystemWatcher.InternalBufferSize; }
            set { _fileSystemWatcher.InternalBufferSize = value; }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Created
        {
            add
            {
                _fileSystemWatcher.Created += value;
            }
            remove
            {
                _fileSystemWatcher.Created -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Changed
        {
            add
            {
                _fileSystemWatcher.Changed += value;
            }
            remove
            {
                _fileSystemWatcher.Changed -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event RenamedEventHandler Renamed
        {
            add
            {
                _fileSystemWatcher.Renamed += value;
            }
            remove
            {
                _fileSystemWatcher.Renamed -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event FileSystemEventHandler Deleted
        {
            add
            {
                _fileSystemWatcher.Deleted += value;
            }
            remove
            {
                _fileSystemWatcher.Deleted -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public event ErrorEventHandler Error
        {
            add
            {
                _fileSystemWatcher.Error += value;
            }
            remove
            {
                _fileSystemWatcher.Error -= value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public NotifyFilters NotifyFilter
        {
            get
            {
                return _fileSystemWatcher.NotifyFilter;
            }
            set
            {
                _fileSystemWatcher.NotifyFilter = value;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public void BeginInit()
        {
            _fileSystemWatcher.BeginInit();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        public void EndInit()
        {
            _fileSystemWatcher.EndInit();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseWaitForChangedResultClass:DoNotUseWaitForChangedResultClass")]
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            WaitForChangedResult result = _fileSystemWatcher.WaitForChanged(changeType);

            return new C1WaitForChangedResult
            {
                Name = result.Name,
                OldName = result.OldName,
                ChangeType = result.ChangeType,
                TimedOut = result.TimedOut
            };
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileSystemWatcherClass:DoNotUseFileSystemWatcherClass")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseWaitForChangedResultClass:DoNotUseWaitForChangedResultClass")]
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            WaitForChangedResult result = _fileSystemWatcher.WaitForChanged(changeType, timeout);

            return new C1WaitForChangedResult
            {
                Name = result.Name,
                OldName = result.OldName,
                ChangeType = result.ChangeType,

                TimedOut = result.TimedOut
            };
        }
    }
}
