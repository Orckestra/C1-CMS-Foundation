using System;
using System.Diagnostics;
using System.Net.Sockets;
using System.Text;


namespace Composite.StandardPlugins.Logging.LogTraceListeners.TcpLogTraceListener
{
    internal static class TcpLogTraceListenerThread
    {

        public static void ThreadMethod(object tcpLogTraceListenerThreadDataObject)
        {
            TcpLogTraceListenerThreadData data = (TcpLogTraceListenerThreadData)tcpLogTraceListenerThreadDataObject;

            while (data.Terminate == false)
            {
                data.MessageReadyEvent.WaitOne();

                bool isConnected = EnsureConnection(data);
                if (isConnected == true)
                {
                    SendNextMessage(data);
                }
                else
                {
                    if (data.Messages.Count > 100)
                    {
                        lock (data.Lock)
                        {
                            if (data.Messages.Count > 100)
                            {
                                data.Messages.Clear();
                            }
                        }
                    }
                }
            }
        }



        private static void SendNextMessage(TcpLogTraceListenerThreadData data)
        {
            TcpLogTraceListenerThreadDataQueueItem queueItem = null;

            while (data.Messages.Count > 0)
            {
                if (data.Messages.Count > 0)
                {
                    lock (data.Lock)
                    {
                        if (data.Messages.Count > 0)
                        {
                            queueItem = data.Messages.Dequeue();
                        }
                    }
                }

                if (queueItem != null)
                {

                    UTF8Encoding encoding = new UTF8Encoding();
                    byte[] bytes = encoding.GetBytes(queueItem.Message);

                    bytes.CopyTo(data.Buffer, 2);

                    data.Buffer[0] = (byte)255;
                    data.Buffer[1] = (byte)queueItem.TraceEventType;

                    try
                    {
                        // An exeption here means that the connection to the logger has been broken. Ignore
                        data.Client.GetStream().Write(data.Buffer, 0, bytes.Length + 2);
                    }
                    catch
                    {
                        data.Connected = false;
                    }
                }
            }
        }


        [DebuggerStepThrough]
        private static bool EnsureConnection(TcpLogTraceListenerThreadData data)
        {
            if (data.Connected == false)
            {
                try
                {
                    data.Client = new TcpClient();
                    data.Client.Connect(data.Host, data.Port);
                    data.Connected = true;
                }
                catch (Exception)
                {
                    data.Connected = false;
                    return false;
                }
            }

            return true;
        }
    }
}
