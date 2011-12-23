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
    internal abstract class LogFileReader
    {

        public DateTime Date { get; protected set; }

        public abstract int EntriesCount { get; }

        public abstract bool Open();
        public abstract void Close();

        public abstract bool Delete();

        public abstract IEnumerable<LogEntry> GetLogEntries(DateTime timeFrom, DateTime timeFromTo);
    }
}
