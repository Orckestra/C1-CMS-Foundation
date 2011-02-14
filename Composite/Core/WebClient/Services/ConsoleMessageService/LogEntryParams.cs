

namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class LogEntryParams
    {
        /// <exclude />
        public string SenderId { get; set; }
        
        /// <exclude />
        public LogLevel Level { get; set; }

        /// <exclude />
        public string Message { get; set; }
    }
}
