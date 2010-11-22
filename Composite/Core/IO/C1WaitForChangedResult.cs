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
        public string Name { get; set; }
        public string OldName { get; set; }
        public WatcherChangeTypes ChangeType { get; set; }
        public bool TimedOut { get; set; }
    }
}
