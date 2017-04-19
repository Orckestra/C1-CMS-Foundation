using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1FileSystemWatcher"/>.
    /// See <see cref="Composite.Core.IO.C1FileSystemWatcher"/> for more information.
    /// </summary>
    public interface IC1FileSystemWatcher
    {
        /// <summary>
        /// Gets or sets if events should be raised or not.
        /// </summary>
        bool EnableRaisingEvents { get; set; }


        /// <summary>
        /// Path to watch.
        /// </summary>
        string Path { get; set; }


        /// <summary>
        /// Filter to use.
        /// </summary>
        string Filter { get; set; }


        /// <summary>
        /// Gets or sets of subdirectories should also be watched.
        /// </summary>
        bool IncludeSubdirectories { get; set; }


        /// <summary>
        /// Gets or sets the size of an internal buffer.
        /// </summary>
        int InternalBufferSize { get; set; }


        /// <summary>
        /// Adds or removes an event handler when new items are created.
        /// </summary>
        event FileSystemEventHandler Created;


        /// <summary>
        /// Adds or removes an event handler when new items changed.
        /// </summary>
        event FileSystemEventHandler Changed;


        /// <summary>
        /// Adds or removes an event handler when new items are renamed.
        /// </summary>
        event RenamedEventHandler Renamed;


        /// <summary>
        /// Adds or removes an event handler when new items are deleted.
        /// </summary>
        event FileSystemEventHandler Deleted;


        /// <summary>
        /// Adds or removes an event handler when an error occure.
        /// </summary>
        event ErrorEventHandler Error;


        /// <summary>
        /// Gets or sets the notify filter.
        /// </summary>        
        NotifyFilters NotifyFilter { get; set; }


        /// <summary>
        /// Begins the initialization.
        /// </summary>
        void BeginInit();


        /// <summary>
        /// Ends the initialization.
        /// </summary>
        void EndInit();


        /// <summary>
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType);


        /// <summary>
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout);
    }
}
