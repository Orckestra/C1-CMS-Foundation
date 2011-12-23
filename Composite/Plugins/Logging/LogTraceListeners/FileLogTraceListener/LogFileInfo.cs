using System;
using System.Collections.Generic;
using System.IO;
using Composite.Core.Logging;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    internal class LogFileInfo : IDisposable
    {
        public string FileName;
        public string FilePath;
        public FileStream FileStream;
        public string[] OldEntries; // Keeping old log entries in memory isn't a good idea, easely can eat up 10-20 megabytes of memory
        public List<LogEntry> NewEntries = new List<LogEntry>();
        public DateTime CreationDate;
        public DateTime StartupTime;

        private bool disposed = false;

        public void Dispose()
        {
            if (!disposed)
            {
                FileStream.Close();
                disposed = true;
            }
        }

        ~LogFileInfo()
        {
            Dispose();
        }
    }
}
