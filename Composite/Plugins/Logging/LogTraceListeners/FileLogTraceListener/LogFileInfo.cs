using System;
using System.IO;
using Composite.Core.Logging;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    internal class LogFileInfo : IDisposable
    {
        public string FileName;
        public string FilePath;
        public FileStream FileStream;
        public CircularList<LogEntry> NewEntries = new CircularList<LogEntry>(100);
        public DateTime CreationDate;
        public DateTime StartupTime;

        private bool _disposed;

        public void Dispose()
        {
            if (!_disposed)
            {
                FileStream.Dispose();
                _disposed = true;
            }

#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~LogFileInfo()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
    }
}
