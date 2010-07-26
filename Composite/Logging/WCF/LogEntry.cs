using System;
using System.Runtime.Serialization;

namespace Composite.Logging.WCF
{
    [DataContract]
	internal class LogEntry
	{
        public LogEntry()
        {
        }

        public LogEntry(Composite.Logging.LogEntry fileLogEntry)
        {
            TimeStamp = fileLogEntry.TimeStamp;
            ApplicationDomainId = fileLogEntry.ApplicationDomainId;
            ThreadId = fileLogEntry.ThreadId;
            Severity = fileLogEntry.Severity;
            Title = fileLogEntry.Title;
            DisplayOptions = fileLogEntry.DisplayOptions;
            Message = fileLogEntry.Message;
        }

        [DataMember]
        public DateTime TimeStamp;

        [DataMember]
        public int ApplicationDomainId;

        [DataMember]
        public int ThreadId;

        [DataMember]
        public string Severity;

        [DataMember]
        public string Title;

        [DataMember]
        public string DisplayOptions;

        [DataMember]
        public string Message;
	}
}
