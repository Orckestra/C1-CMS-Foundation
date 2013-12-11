using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using Composite.Core.Logging;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    internal class PlainFileReader : LogFileReader
    {
        private FileStream _file;
        private readonly string _filePath;
        private int? _entriesCount;

        public PlainFileReader(string filePath, DateTime date)
        {
            _filePath = filePath;
            Date = date;
        }

        [DebuggerStepThrough]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public override bool Open()
        {
            try
            {
                _file = File.OpenRead(_filePath);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public override void Close()
        {
            if (_file == null) return;

            _file.Close();
            _file.Dispose();
            _file = null;
        }

        public static IEnumerable<LogEntry> ParseLogLines(IEnumerable<string> lines)
        {
            var multilineMessage = new StringBuilder();

            LogEntry currentEntry = null;
            foreach (string line in lines)
            {
                LogEntry nextEntry = LogEntry.Parse(line);
                if (nextEntry != null)
                {
                    if (currentEntry != null)
                    {
                        if (multilineMessage.Length > 0)
                        {
                            currentEntry.Message = multilineMessage.ToString();
                            multilineMessage.Clear();
                        }

                        yield return currentEntry;
                    }
                    currentEntry = nextEntry;
                }
                else
                {
                    if (currentEntry != null)
                    {
                        if (multilineMessage.Length == 0)
                        {
                            multilineMessage.Append(currentEntry.Message);
                        }

                        multilineMessage.AppendLine(line);
                    }
                }
            }

            if (currentEntry != null)
            {
                if (multilineMessage.Length > 0)
                {
                    currentEntry.Message = multilineMessage.ToString();
                    multilineMessage.Clear();
                }

                yield return currentEntry;
            }
        }

        public override IEnumerable<LogEntry> GetLogEntries(DateTime timeFrom, DateTime timeFromTo)
        {
            var logLines = GetLogLinesEnumerable();

            return ParseLogLines(logLines);
        }

        private IEnumerable<string> GetLogLinesEnumerable()
        {
            using (var reader = new StreamReader(_file, Encoding.UTF8))
            {
                while (reader.Peek() >= 0)
                {
                    yield return reader.ReadLine();
                }
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public override int EntriesCount
        {
            get
            {
                if (_entriesCount == null)
                {
                    try
                    {
                        Open();

                        _entriesCount = GetLogEntries(DateTime.MinValue, DateTime.MaxValue).Count();
                    }
                    finally
                    {
                        Close();
                    }
                }

                return (int)_entriesCount;
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        public override bool Delete()
        {
            try
            {
                File.Delete(_filePath);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
