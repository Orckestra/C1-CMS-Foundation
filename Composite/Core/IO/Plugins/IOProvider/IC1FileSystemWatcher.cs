using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1FileSystemWatcher
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool EnableRaisingEvents { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Path { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Filter { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool IncludeSubdirectories { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Created;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Changed;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event RenamedEventHandler Renamed;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event FileSystemEventHandler Deleted;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        event ErrorEventHandler Error;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>        
        NotifyFilters NotifyFilter { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void BeginInit();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void EndInit();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="changeType"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        C1WaitForChangedResult WaitForChanged(WatcherChangeTypes changeType, int timeout);
    }
}
