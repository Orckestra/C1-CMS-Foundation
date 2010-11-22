using System.IO;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileSystemWatcher : ImplementationContainer<C1FileSystemWatcherImplementation>
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1FileSystemWatcher(string path)
            : this(path, null)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="filter"></param>
        public C1FileSystemWatcher(string path, string filter)
            : base(() => ImplementationFactory.CurrentFactory.CreateC1FileSystemWatcher(path, filter))
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        public void BeginInit()
        {
            this.Implementation.BeginInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void EndInit()
        {
            this.Implementation.EndInit();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType)
        {
            return this.Implementation.WaitForChanged(changeType);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout)
        {
            return this.Implementation.WaitForChanged(changeType, timeout);
        }
    }
}
