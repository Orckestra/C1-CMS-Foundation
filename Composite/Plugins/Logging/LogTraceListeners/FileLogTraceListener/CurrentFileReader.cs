using System;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.Core.Logging;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    internal class CurrentFileReader : LogFileReader
    {
        private readonly FileLogger _fileLogger;

        public CurrentFileReader(FileLogger fileLogger)
        {
            _fileLogger = fileLogger;

            lock (_fileLogger._syncRoot)
            {
                var fileConnection = _fileLogger._fileConnection;

                if (fileConnection != null)
                {
                    Date = fileConnection.CreationDate;
                }
            }

        }

        public override bool Open()
        {
            // do nothing
            return true;
        }

        public override void Close()
        {
            // do nothing
        }

        public override int EntriesCount
        {
            get
            {
                lock (_fileLogger._syncRoot)
                {
                    return _fileLogger._fileConnection.OldEntries.Length +
                           _fileLogger._fileConnection.NewEntries.Count;
                }
            }
        }

        public override IEnumerable<LogEntry> GetLogEntries(DateTime timeFrom, DateTime timeTo)
        {
            if (timeFrom < _fileLogger.StartupTime)
            {
                var parserEnumerable = PlainFileReader.ParseLogLines(_fileLogger._fileConnection.OldEntries);
                foreach (var logEntry in parserEnumerable)
                {
                    yield return logEntry;
                }
            }
            
            LogEntry[] newEntries = null;

            lock (_fileLogger._syncRoot)
            {
                var fileConnection = _fileLogger._fileConnection;
                if (fileConnection != null)
                {
                    newEntries = fileConnection.NewEntries.ToArray();
                }
            }

            if (newEntries != null)
            {
                foreach (var logEntry in newEntries) yield return logEntry;
            }
        }

        public override bool Delete()
        {
            return false;
        }
    }
}
