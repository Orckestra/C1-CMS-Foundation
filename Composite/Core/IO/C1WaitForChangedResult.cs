using System.IO;
using System.Runtime.InteropServices;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public struct C1WaitForChangedResult
    {
        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public string OldName { get; set; }

        /// <exclude />
        public WatcherChangeTypes ChangeType { get; set; }

        /// <exclude />
        public bool TimedOut { get; set; }
    }
}
