using System;
using System.IO;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.FileSystemWatcher. Using this implementation instead 
    /// of System.IO.FileSystemWatcher, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.FileSystemWatcher for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileStream"/>.
    /// </summary>
    public class C1FileSystemWatcher : ImplementationContainer<C1FileSystemWatcherImplementation>, IDisposable
    {
        /// <summary>
        /// Creates a new file system watcher given the path.
        /// </summary>
        /// <param name="path">Path to watch.</param>
        public C1FileSystemWatcher(string path)
            : this(path, null)
        {
        }



        /// <summary>
        /// Creates a new file system watcher given the path.
        /// </summary>
        /// <param name="path">Path to watch.</param>
        /// <param name="filter">Filter to use.</param>
        public C1FileSystemWatcher(string path, string filter)
            : base(() => ImplementationFactory.CurrentFactory.CreateC1FileSystemWatcher(path, filter))
        {
        }



        /// <summary>
        /// Gets or sets if events should be raised or not.
        /// </summary>
        public bool EnableRaisingEvents
        {
            get
            {
                return this.Implementation.EnableRaisingEvents;
            }
            set
            {
                this.Implementation.EnableRaisingEvents = value;
            }
        }



        /// <summary>
        /// Path to watch.
        /// </summary>
        public string Path
        {
            get
            {
                return this.Implementation.Path;
            }
            set
            {
                this.Implementation.Path = value;
            }
        }



        /// <summary>
        /// Filter to use.
        /// </summary>
        public string Filter
        {
            get
            {
                return this.Implementation.Filter;
            }
            set
            {
                this.Implementation.Filter = value;
            }
        }



        /// <summary>
        /// Gets or sets of subdirectories should also be watched.
        /// </summary>
        public bool IncludeSubdirectories
        {
            get
            {
                return this.Implementation.IncludeSubdirectories;
            }
            set
            {
                this.Implementation.IncludeSubdirectories = value;
            }
        }


        /// <summary>
        /// Gets or sets the size of an internal buffer.
        /// </summary>
        public int InternalBufferSize
        {
            get
            {
                return this.Implementation.InternalBufferSize;
            }
            set
            {
                this.Implementation.InternalBufferSize = value;
            }
        }


        /// <summary>
        /// Adds or removes an event handler when new items are created.
        /// </summary>
        public event FileSystemEventHandler Created
        {
            add
            {
                this.Implementation.Created += value;
            }
            remove
            {
                this.Implementation.Created -= value;
            }
        }



        /// <summary>
        /// Adds or removes an event handler when new items changed.
        /// </summary>
        public event FileSystemEventHandler Changed
        {
            add
            {
                this.Implementation.Changed += value;
            }
            remove
            {
                this.Implementation.Changed -= value;
            }
        }



        /// <summary>
        /// Adds or removes an event handler when new items are renamed.
        /// </summary>
        public event RenamedEventHandler Renamed
        {
            add
            {
                this.Implementation.Renamed += value;
            }
            remove
            {
                this.Implementation.Renamed -= value;
            }
        }



        /// <summary>
        /// Adds or removes an event handler when new items are deleted.
        /// </summary>
        public event FileSystemEventHandler Deleted
        {
            add
            {
                this.Implementation.Deleted += value;
            }
            remove
            {
                this.Implementation.Deleted -= value;
            }
        }



        /// <summary>
        /// Adds or removes an event handler when an error occur.
        /// </summary>
        public event ErrorEventHandler Error
        {
            add
            {
                this.Implementation.Error += value;
            }
            remove
            {
                this.Implementation.Error -= value;
            }
        }



        /// <summary>
        /// Gets or sets the notify filter.
        /// </summary>
        public NotifyFilters NotifyFilter
        {
            get
            {
                return this.Implementation.NotifyFilter;
            }
            set
            {
                this.Implementation.NotifyFilter = value;
            }
        }



        /// <summary>
        /// Begins the initialization.
        /// </summary>
        public void BeginInit()
        {
            Log.LogInformation("C1FileSystemWatcher", "BeginInit starting");
            this.Implementation.BeginInit();
            Log.LogInformation("C1FileSystemWatcher", "BeginInit done");
        }



        /// <summary>
        /// Ends the initialization.
        /// </summary>
        public void EndInit()
        {
            this.Implementation.EndInit();
        }



        /// <summary>
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            return this.Implementation.WaitForChanged(changeType);
        }



        /// <summary>
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            return this.Implementation.WaitForChanged(changeType, timeout);
        }

        void IDisposable.Dispose()
        {
            Dispose(true);
        }

        /// <summary>
        /// Destructor.
        /// </summary>
        ~C1FileSystemWatcher()
        {
            Dispose(false);
        }


        /// <summary>
        /// Disposes the stream.
        /// </summary>
        /// <param name="disposing">True if the stream is disposing.</param>
        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                DisposeImplementation();
            }
        }
    }
}
