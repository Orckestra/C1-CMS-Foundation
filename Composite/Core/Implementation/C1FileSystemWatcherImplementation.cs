using System.IO;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
    /// </summary>
    public class C1FileSystemWatcherImplementation
    {
        private readonly IC1FileSystemWatcher _fileSystemWatcher;


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="filter"></param>
        public C1FileSystemWatcherImplementation(string path, string filter)
        {
            _fileSystemWatcher = IOFacade.CreateC1FileSystemWatcher(path, filter);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual bool EnableRaisingEvents
        {
            get
            {
                return _fileSystemWatcher.EnableRaisingEvents;
            }
            set
            {
                _fileSystemWatcher.EnableRaisingEvents = value;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual string Path
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual string Filter
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual bool IncludeSubdirectories
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual int InternalBufferSize
        {
            get
            {
                return _fileSystemWatcher.InternalBufferSize;
            }
            set
            {
                _fileSystemWatcher.InternalBufferSize = value;
            }
        }
        



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual event FileSystemEventHandler Created
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual event FileSystemEventHandler Changed
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual event RenamedEventHandler Renamed
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual event FileSystemEventHandler Deleted
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "Error")]
        public virtual event ErrorEventHandler Error
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual NotifyFilters NotifyFilter
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



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual void BeginInit()
        {
            _fileSystemWatcher.BeginInit();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        public virtual void EndInit()
        {
            _fileSystemWatcher.EndInit();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        public virtual C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            return _fileSystemWatcher.WaitForChanged(changeType);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public virtual C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            return _fileSystemWatcher.WaitForChanged(changeType, timeout);
        }
    }
}
