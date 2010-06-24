

namespace Composite.WebClient.Services.ConsoleMessageService
{
    public class LogEntryParams
    {
        public string SenderId { get; set; }
        public LogLevel Level { get; set; }
        public string Message { get; set; }
    }
}
