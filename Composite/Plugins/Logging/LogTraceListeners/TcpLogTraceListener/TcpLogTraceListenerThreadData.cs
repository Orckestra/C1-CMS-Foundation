using System.Collections.Generic;
using System.Net.Sockets;
using System.Threading;


namespace Composite.Plugins.Logging.LogTraceListeners.TcpLogTraceListener
{    
	internal class TcpLogTraceListenerThreadData
	{
        public TcpLogTraceListenerThreadData()
        {
            this.Client = new TcpClient();
            this.Connected = false;
            this.Terminate = false;
            this.Buffer = new byte[32768];
            this.Host = "localhost";
            this.Port = 27500;
            this.Lock = new object();
            this.Messages = new Queue<TcpLogTraceListenerThreadDataQueueItem>();
            this.MessageReadyEvent = new AutoResetEvent(false);
        }


        public object Lock { get; private set; }
        public AutoResetEvent MessageReadyEvent { get; private set; }
        public Queue<TcpLogTraceListenerThreadDataQueueItem> Messages { get; private set; }

        public TcpClient Client { get; set; }
        public bool Connected { get; set; }
        public bool Terminate { get; set; }        
        public byte[] Buffer { get; private set; }
        public string Host { get; set; }
        public int Port { get; set; }
	}
}
