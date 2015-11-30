using System.Collections.Generic;
using System.IO;
using System.Text;
using Composite.Core.Logging;

namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    internal static class LogReaderHelper
    {
        public static IEnumerable<string> GetLinesEnumerable(FileStream fileStream)
        {
            using (var reader = new StreamReader(fileStream, Encoding.UTF8))
            {
                while (reader.Peek() >= 0)
                {
                    yield return reader.ReadLine();
                }
            }
        }

        public static IEnumerable<LogEntry> ParseLogLines(FileStream fileStream)
        {
            var linesEnumerable = GetLinesEnumerable(fileStream);

            return ParseLogLines(linesEnumerable);
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
    }
}