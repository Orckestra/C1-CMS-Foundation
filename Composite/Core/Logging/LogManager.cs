using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener;

namespace Composite.Core.Logging
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class LogManager
    {
        private static readonly string VerboseSeverity = "Verbose";
        private static readonly TimeSpan LockedFileAwaitingPeriod = TimeSpan.FromSeconds(15);
        private static readonly DateTime _startTime = DateTime.Now;

        /// <exclude />
        public static int LogLinesRequestLimit = 5000;

        private static LogFileReader[] _logFiles;
        private static readonly object _syncRoot = new object();

        /// <exclude />
        static LogManager()
        {
            FileLogger.OnReset += () => _logFiles = null;
        }

        private static FileLogger FileLogger => FileLogTraceListener.LoggerInstance;

        private static LogFileReader[] LogFiles
        {
            get
            {
                var result = _logFiles;
                if (result == null || result.Length == 0)
                {
                    lock (_syncRoot)
                    {
                        result = _logFiles;
                        if (result == null || result.Length == 0)
                        {
                            _logFiles = result = FileLogger?.GetLogFiles() ?? new LogFileReader[0];
                        }
                    }
                }
                return result;
            }
        }


        /// <exclude />
        public static bool DeleteLogFile(DateTime date)
        {
            date = date.Date;

            var filesToDelete = FileLogger.GetLogFiles().Where(file => file.Date.Date == date).ToArray();

            bool updated = false;
            foreach (var file in filesToDelete)
            {
                updated |= file.Delete();
            }

            if (updated)
            {
                lock (_syncRoot)
                {
                    _logFiles = null;
                }
            }

            return updated;
        }

        internal static void Flush()
        {
            FileLogger?.Flush(true);
        }


        /// <exclude />
        public static DateTime GetLastStartupTime()
        {
            return FileLogger.StartupTime;
        }


        /// <exclude />
        public static DateTime[] GetLoggingDates()
        {
            return LogFiles.Select(entry => entry.Date).Distinct().OrderBy(date => date).ToArray();
        }


        /// <exclude />
        public static int GetLogEntriesCount(DateTime timeFrom, DateTime timeTo, bool includeVerbose)
        {
            throw new NotImplementedException();
        }


        /// <exclude />
        public static int GetLogEntriesCountByDate(DateTime date, bool includeVerbose)
        {
            date = date.Date;

            return LogFiles.Where(logFile => logFile.Date == date).Sum(logFile => logFile.EntriesCount);
        }


        /// <exclude />
        public static LogEntry[] GetLogEntries(DateTime timeFrom, DateTime timeTo, bool includeVerbose, int maximumAmount)
        {
            if (maximumAmount == 0)
            {
                maximumAmount = LogLinesRequestLimit;
            }

            Verify.That(maximumAmount > 0 && maximumAmount <= LogLinesRequestLimit, "Maximum amount should be in range [1..{0}]", LogLinesRequestLimit);

            var files = LogFiles.Where(logFile => logFile.Date >= timeFrom.Date && logFile.Date <= timeTo.Date);

            var result = new List<LogEntry>();

            lock (_syncRoot)
            {
                foreach (var logFile in files)
                {
                    try
                    {
                        if (!logFile.Open())
                        {
                            if (DateTime.Now - _startTime < LockedFileAwaitingPeriod)
                            {
                                // Waiting for some time until all log files are released
                                // This ensures that LogViewer will get all the logs from previous, currently being shutdown AppDomain(s)
                                return Array.Empty<LogEntry>();
                            }

                            continue;
                        }

                        int entriesRead = 0;
                        foreach (var entry in logFile.GetLogEntries(timeFrom, timeTo))
                        {
                            if (entry.TimeStamp >= timeFrom && entry.TimeStamp <= timeTo)
                            {
                                if (!includeVerbose && entry.Severity == VerboseSeverity)
                                {
                                    continue;
                                }

                                result.Add(entry);

                                entriesRead++;
                                if (entriesRead == maximumAmount) break;
                            }
                        }
                    }
                    finally
                    {
                        logFile.Close();
                    }
                }
            }

            return result.OrderBy(entry => entry.TimeStamp).Take(maximumAmount).ToArray();
        }
    }
}
