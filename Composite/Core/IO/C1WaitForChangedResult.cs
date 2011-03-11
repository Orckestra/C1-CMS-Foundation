using System.IO;
using System.Runtime.InteropServices;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.WaitForChangedResult. Using this implementation instead 
    /// of System.IO.WaitForChangedResult, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.WaitForChangedResult for more documentation on the methods of this class.
    /// Used by <see cref="C1FileSystemWatcher"/>
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public struct C1WaitForChangedResult
    {
        /// <summary>
        /// Gets or sets the name of the changed file system item.
        /// </summary>
        public string Name { get; set; }


        /// <summary>
        /// Gets or sets the old name of the changed file system item.
        /// </summary>
        public string OldName { get; set; }

        
        /// <summary>
        /// Gets or sets the type of the change.
        /// </summary>
        public WatcherChangeTypes ChangeType { get; set; }

        
        /// <summary>
        /// Gets or sets whether the operation timed out.
        /// </summary>
        public bool TimedOut { get; set; }
    }
}
