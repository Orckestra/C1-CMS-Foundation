using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Logging.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Logging.TraceListeners;


namespace Composite.StandardPlugins.Logging.LogTraceListeners.TcpLogTraceListener
{
    [ConfigurationElementType(typeof(TcpLogTraceListenerData))]
    internal sealed class TcpLogTraceListener : CustomTraceListener
    {
        private TcpLogTraceListenerThreadData _tcpLogTraceListenerThreadData = new TcpLogTraceListenerThreadData();
        private Thread _tcpLogTraceListenerThread = null;


        public TcpLogTraceListener()
        {
        }


        public TcpLogTraceListener(string initData)
        {
            string[] s = initData.Split(':');

            if (s.Length == 2)
            {
                _tcpLogTraceListenerThreadData.Port = Int32.Parse(s[1]);
            }

            _tcpLogTraceListenerThreadData.Host = s[0];
        }



        public override void TraceData(TraceEventCache eventCache, string source, TraceEventType eventType, int id, object data)
        {
            // DDZ: this code spawns up to 5 threads - to be fixed
            if (_tcpLogTraceListenerThread == null)
            {
                ParameterizedThreadStart parameterizedThreadStart = TcpLogTraceListenerThread.ThreadMethod;
                _tcpLogTraceListenerThread = new Thread(parameterizedThreadStart);
                _tcpLogTraceListenerThread.Name = "Tcp Log Trace Listener";
                _tcpLogTraceListenerThread.Start(_tcpLogTraceListenerThreadData);
            }


            LogEntry entry = data as LogEntry;

            if (entry == null)
            {
                return;
            }


            string eventTypeString = entry.Severity.ToString();
            char separator = ':';

            using (StringReader sr = new StringReader(entry.Message))
            {
                string line = sr.ReadLine();
                while (line != null)
                {
                    string s = string.Format("{0} {1} {2} {1} {3}", eventTypeString, separator, entry.Title, line);

                    SendMessage(entry.Severity, s);

                    line = sr.ReadLine();
                }
            }
        }


        public override void Write(string message)
        {
            // NOOB
        }

        public override void WriteLine(string message)
        {
            // NOOB
        }



        private void SendMessage(TraceEventType traceEventType, string message)
        {
            var queueItem = new TcpLogTraceListenerThreadDataQueueItem
                                {
                                    Message = message + Environment.NewLine,
                                    TraceEventType = traceEventType
                                };

            lock (_tcpLogTraceListenerThreadData.Lock)
            {
                _tcpLogTraceListenerThreadData.Messages.Enqueue(queueItem);                
            }

            _tcpLogTraceListenerThreadData.MessageReadyEvent.Set();
        }
    }


    internal sealed class TcpLogTraceListenerData : CustomTraceListenerData
    {
    }
}
