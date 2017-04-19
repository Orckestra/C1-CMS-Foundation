using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
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

            lock (_fileLogger.SyncRoot)
            {
                var fileConnection = _fileLogger.FileConnection;

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
                DateTime readUntil;
                int count;
                string filePath;

                lock (_fileLogger.SyncRoot)
                {
                    var fileConn = _fileLogger.FileConnection;

                    var firstEntry = fileConn.NewEntries.First();
                    readUntil = firstEntry?.TimeStamp ?? DateTime.MaxValue;

                    count = fileConn.NewEntries.Count;

                    filePath = fileConn.FilePath;
                }

                using (var fs = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    foreach (var logEntry in LogReaderHelper.ParseLogLines(fs))
                    {
                        if (logEntry.TimeStamp >= readUntil) { break; }

                        count++;
                    }
                }

                return count;
            }
        }

        public override IEnumerable<LogEntry> GetLogEntries(DateTime timeFrom, DateTime timeTo)
        {
            Verify.That(timeFrom <= timeTo, "An incorrect time interval given.");

            string filePath;
            LogEntry[] newEntries;

            lock (_fileLogger.SyncRoot)
            {
                var fileConn = _fileLogger.FileConnection;
                newEntries = fileConn.NewEntries.ToArray();

                filePath = fileConn.FilePath;
            }

            DateTime readUntil = newEntries.FirstOrDefault()?.TimeStamp.AddMilliseconds(-1) ?? DateTime.Now;

            if (timeFrom <= readUntil)
            {
                using (var fs = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    var parserEnumerable = LogReaderHelper.ParseLogLines(fs);
                    foreach (var logEntry in parserEnumerable)
                    {
                        if(logEntry.TimeStamp < timeFrom) continue;
                        if (logEntry.TimeStamp > timeTo 
                            || logEntry.TimeStamp > readUntil) break;

                        yield return logEntry;
                    }
                }
            }

            foreach (var logEntry in newEntries)
            {
                if (logEntry.TimeStamp < timeFrom) continue;
                if (logEntry.TimeStamp > timeTo) break;

                yield return logEntry;
            }
        }

        public override bool Delete()
        {
            return false;
        }
    }
}
