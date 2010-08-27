using System;
using System.Globalization;
using System.Runtime.Serialization;
using System.Text;
using System.Diagnostics;


namespace Composite.Core.Logging
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class LogEntry
    {
        const char NonBreakingSpace = (char)160;
        private static readonly string DateTimeFormat = "yyyyMMdd" + NonBreakingSpace + "HH:mm:ss.ffff";

        public DateTime TimeStamp { get; set; }
        public int ApplicationDomainId { get; set; }
        public int ThreadId { get; set; }
        public string Severity { get; set; }
        public string Title { get; set; }
        public string DisplayOptions { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            int applicationDomainId = AppDomain.CurrentDomain.Id;
            int threadId = System.Threading.Thread.CurrentThread.ManagedThreadId;

            var sb = new StringBuilder();
            sb.Append(TimeStamp.ToString(DateTimeFormat)); // It has one NonBreakingSpace inside
            sb.Append(NonBreakingSpace).Append(applicationDomainId);
            sb.Append(NonBreakingSpace).Append(threadId < 10 ? " " : string.Empty).Append(threadId);
            sb.Append(NonBreakingSpace).Append(Severity);
            sb.Append(NonBreakingSpace).Append(Title);
            sb.Append(NonBreakingSpace).Append(DisplayOptions);
            sb.Append(NonBreakingSpace).Append(Message/*.Replace("\n", @"\n")*/);

            return sb.ToString();
        }



        [DebuggerStepThrough]
        public static LogEntry Parse(string serializedLogEntry)
        {
            Verify.ArgumentNotNull(serializedLogEntry, "serializedLogEntry");
            if(serializedLogEntry.IndexOf((char)65533) == -1
                && serializedLogEntry.IndexOf((char)160) == -1)
            {
                return null;
            }

            string[] parts = serializedLogEntry.Split((char)65533);

            if(parts.Length != 8)
            {
                parts = serializedLogEntry.Split((char)160);
            }

            if(parts.Length != 8)
            {
                return null;
            }

            var result = new LogEntry();

            try
            {
                string date = parts[0] + parts[1];

                result.TimeStamp = DateTime.ParseExact(date, "yyyyMMddHH:mm:ss.ffff",
                                                       CultureInfo.InvariantCulture.DateTimeFormat);
                result.ApplicationDomainId = int.Parse(parts[2]);
                result.ThreadId = int.Parse(parts[3]);
                result.Severity = parts[4];
                result.Title = parts[5];
                result.DisplayOptions = parts[6];
                result.Message = parts[7];
            }
            catch(Exception)
            {
                return null;
            }

            return result;
        }
    }
}
