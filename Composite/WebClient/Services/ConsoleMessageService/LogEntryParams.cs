

namespace Composite.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class LogEntryParams
    {
        public string SenderId { get; set; }
        public LogLevel Level { get; set; }
        public string Message { get; set; }
    }
}
