//#define UseLockFiles

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;


namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    /// <summary>
    /// File logger
    /// </summary>
    internal class FileLogger : IDisposable
    {
        private const int MaxLogFiles = 10;
        private bool _initializationFailed;

#if UseLockFiles
        private static readonly TimeSpan LockFileUpdateFrequency = TimeSpan.FromSeconds(20);
        private static readonly TimeSpan OldLockFilesPreservationTime = TimeSpan.FromSeconds(60);
        private DateTime _lockFileUpdatedLast = DateTime.MinValue;
#endif

        private static readonly TimeSpan FileStreamFlushInterval = TimeSpan.FromSeconds(5);
        private static readonly TimeSpan FileStreamCloseOnIdleInterval = TimeSpan.FromSeconds(10);

        private readonly string _logDirectoryPath;
        private readonly bool _flushImmediately;

        public static event ThreadStart OnReset;
        private static Task _flushOnIdleTask;


        internal LogFileInfo FileConnection;
        readonly object _syncRoot = new object();

        public object SyncRoot => _syncRoot;

        public FileLogger(string logDirectoryPath, bool flushImmediately)
        {
            Verify.ArgumentNotNull(logDirectoryPath, "logDirectoryPath");

            _logDirectoryPath = Path.Combine(PathUtil.BaseDirectory, logDirectoryPath);
            if (!C1Directory.Exists(_logDirectoryPath))
            {
                C1Directory.CreateDirectory(_logDirectoryPath);
            }
            _flushImmediately = flushImmediately;

            _flushOnIdleTask = Task.Factory.StartNew(FlushOnIdle);

#if UseLockFiles
            TouchLockFile();
#endif
        }

        private void FlushOnIdle()
        {
            Predicate<LogFileInfo> fileShouldBeClosed = logFile =>
                logFile.LastUsageTime != null && DateTime.Now - logFile.LastUsageTime.Value > FileStreamCloseOnIdleInterval;

            Predicate<LogFileInfo> fileStreamShouldBeFlushed = logFile =>
            {
                var lastFlushTime = logFile.LastFlushTime ?? logFile.StartupTime;
                return logFile.LastUsageTime != null && logFile.LastUsageTime.Value > lastFlushTime
                       && DateTime.Now - lastFlushTime > FileStreamFlushInterval;
            };

            while (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
            {
                Thread.Sleep(500);

                var conn = this.FileConnection;
                if (conn != null && (fileShouldBeClosed(conn) || fileStreamShouldBeFlushed(conn)))
                {
                    lock (SyncRoot)
                    {
                        conn = this.FileConnection;
                        if (conn != null)
                        {
                            if (fileShouldBeClosed(conn))
                            {
                                CloseLogFile(true);
                            }
                            else if (fileStreamShouldBeFlushed(conn))
                            {
                                Flush(true);
                            }
                        }
                    }
                }
            }
        }


        public DateTime StartupTime
        {
            get
            {
                lock (_syncRoot)
                {
                    return FileConnection?.StartupTime ?? DateTime.Now;
                }
            }
        }



        public void WriteEntry(LogEntry entry)
        {
            if (_initializationFailed) return;

            string logLine = entry.ToString();

            byte[] bytes = Encoding.UTF8.GetBytes(logLine + "\n");

            lock (_syncRoot)
            {
                // Checking whether we should change the file after midnight
                int dayNumber = entry.TimeStamp.Day;

                var now = DateTime.Now;

                if (FileConnection != null && dayNumber != FileConnection.CreationDate.Day
                   && dayNumber == now.Day)
                {
                    CloseLogFile(true);
                }

                EnsureInitialize();
                if (_initializationFailed) return;

                FileConnection.NewEntries.Add(entry);

                // Writing the file in the "catch" block in order to prevent chance of corrupting the file by experiencing ThreadAbortException.
                Exception thrownException = null;
                try
                {
                }
                finally
                {
                    
                    try
                    {
                        FileConnection.FileStream.Write(bytes, 0, bytes.Length);
                        FileConnection.LastUsageTime = now;

                        if (_flushImmediately)
                        {
                            Flush(false);
                        }
                    }
                    catch (Exception exception)
                    {
                        thrownException = exception;
                    }
                }
                // ThreadAbortException should have a higher priority, and therefore we're doing rethrow in a separate block
                if (thrownException != null) throw thrownException;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass", Justification = "This is what we want, touch is used later on")]
        public LogFileReader[] GetLogFiles()
        {
#if UseLockFiles
            if (MoreThanOneAppDomainRunning()) return Array.Empty<LogFileReader>();
#endif

            string[] filePathes = Directory.GetFiles(_logDirectoryPath);

            string currentlyOpenedFileName = null;

            var result = new List<LogFileReader>();

            lock (_syncRoot)
            {
                if (FileConnection != null)
                {
                    currentlyOpenedFileName = FileConnection.FileName;

                    result.Add(new CurrentFileReader(this));

                    FileConnection.LastUsageTime = DateTime.Now;
                }
            }

            foreach (string filePath in filePathes)
            {
                string fileName = Path.GetFileName(filePath);

                // Skipping file to which we're currently using
                if (currentlyOpenedFileName != null
                    && string.Compare(fileName, currentlyOpenedFileName, StringComparison.OrdinalIgnoreCase) == 0)
                {
                    continue;
                }

                // File names have format yyyymmdd[_number].txt
                if (fileName.Length < 12)
                {
                    continue;
                }

                DateTime date;

                if (!DateTime.TryParseExact(fileName.Substring(0, 8),
                                            "yyyyMMdd",
                                            CultureInfo.InvariantCulture.DateTimeFormat,
                                            DateTimeStyles.None,
                                            out date))
                {
                    continue;
                }

                result.Add(new PlainFileReader(filePath, date));
            }

            // Sorting by date
            result.Sort((a, b) => a.Date.CompareTo(b.Date));

            return result.ToArray();
        }

        internal void Flush(bool silent)
        {
            lock (_syncRoot)
            {
                if (FileConnection != null)
                {
                    try
                    {
                        FileConnection.FileStream.Flush();
                    }
                    catch (Exception) when (silent)
                    {
                    }

                    FileConnection.LastFlushTime = DateTime.Now;
                }
            }
        }

        [DebuggerStepThrough]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        private static FileStream TryOpenFile(string filePath, out Exception e)
        {
            e = null;
            try
            {
                return File.Open(filePath, FileMode.Create, FileAccess.ReadWrite, FileShare.Read);
            }
            catch (Exception ex)
            {
                e = ex;

                return null;
            }
        }



        [DebuggerStepThrough]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass", Justification = "This is what we want, touch is used later on")]
        private static bool TryReadAndOpen(string filePath, out string[] content, out FileStream stream, out Exception exception)
        {
            content = null;
            stream = null;
            exception = null;

            try
            {
                stream = File.Open(filePath, FileMode.Open, FileAccess.ReadWrite, FileShare.Read);

                // Not disposing StreamReader so the stream is not closed afterwards
                var reader = new StreamReader(stream, Encoding.UTF8, true);
                
                var lines = new List<string>();

                string line;

                while ((line = reader.ReadLine()) != null)
                {
                    lines.Add(line);
                }

                content = lines.ToArray();
            }
            catch (Exception e)
            {
                exception = e;
                return false;
            }

            return true;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass", Justification = "This is what we want, touch is used later on")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is what we want, touch is used later on")]
        private void EnsureInitialize()
        {
#if UseLockFiles
            TouchLockFile();
            RemoveOldLockFiles();
#endif

            if (FileConnection != null) return;

            lock (_syncRoot)
            {
                if (FileConnection != null) return;

                DateTime creationDate = DateTime.Now;

                string fileNamePrefix = creationDate.ToString("yyyyMMdd");

                for (int i = 0; i < MaxLogFiles; i++)
                {
                    var fileName = fileNamePrefix + (i > 0 ? "_" + i : string.Empty) + ".txt";
                    string filePath = Path.Combine(_logDirectoryPath, fileName);

                    FileStream stream;
                    Exception ex;
                    if (!File.Exists(filePath))
                    {
                        stream = TryOpenFile(filePath, out ex);

                        if (stream == null)
                        {
                            // Ignoring this exception if the file has already created
                            if (File.Exists(filePath)) continue;

                            throw new Exception($"Failed to create file '{filePath}'", ex);
                        }

                        FileConnection = new LogFileInfo
                                              {
                                                  CreationDate = creationDate.Date,
                                                  StartupTime = creationDate,
                                                  FileName = fileName,
                                                  FilePath = filePath,
                                                  FileStream = stream
                                              };

                        WriteUTF8EncodingHeader(stream);
                        return;
                    }

                    string[] alreadyWritten;

                    if (!TryReadAndOpen(filePath, out alreadyWritten, out stream, out ex))
                    {
                        // Trying another file name, since the file may be in use by another process
                        continue;
                    }

                    FileConnection = new LogFileInfo
                                          {
                                              CreationDate = creationDate.Date,
                                              StartupTime = creationDate,
                                              FileName = fileName,
                                              FilePath = filePath,
                                              FileStream = stream
                                          };
                    return;
                }

                _initializationFailed = true;
            }

        }


#if UseLockFiles
        [SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass")]        
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private void RemoveOldLockFiles()
        {
            foreach (string filePath in Directory.GetFiles(_logDirectoryPath, "*.lock"))
            {
                string appDomainIdString = Path.GetFileNameWithoutExtension(filePath);
                int appDomainId;
                if (!int.TryParse(appDomainIdString, out appDomainId)) continue;

                if (appDomainId != AppDomain.CurrentDomain.Id)
                {
                    DateTime lastWrite = File.GetLastWriteTime(filePath);

                    TimeSpan fileAge = DateTime.Now - lastWrite;

                    if (fileAge > OldLockFilesPreservationTime)
                    {
                        try
                        {
                            File.Delete(filePath);
                        }
                        catch (Exception)
                        {
                            // Ignore
                        }
                    }
                }
            }
        }

        [SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass")]
        private bool MoreThanOneAppDomainRunning()
        {
            return Directory.GetFiles(_logDirectoryPath, "*.lock").Length > 1;
        }
#endif

        private void CloseLogFile(bool raiseOnResetEvent)
        {
            if (FileConnection != null)
            {
                FileConnection.Dispose();
                FileConnection = null;
            }

            if (raiseOnResetEvent)
            {
                OnReset?.Invoke();
            }
        }


        private static void WriteUTF8EncodingHeader(Stream stream)
        {
            byte[] preamble = Encoding.UTF8.GetPreamble();
            stream.Write(preamble, 0, preamble.Length);
        }


#if UseLockFiles
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private void TouchLockFile()
        {
            if (_lockFileUpdatedLast + LockFileUpdateFrequency >= DateTime.Now)
            {
                return;
            }

            // Create .lock file
            try
            {
                File.WriteAllText(LockFileName, "");

                _lockFileUpdatedLast = DateTime.Now;
            }
            catch (Exception)
            {
                // Ignore
            }
        }
#endif

#if UseLockFiles
        private string LockFileName => Path.Combine(_logDirectoryPath, AppDomain.CurrentDomain.Id + ".lock");
#endif


        bool _disposed;
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    CloseLogFile(false);
                }

                _disposed = true;
            }
#if UseLockFiles
            // Delete the file in any case
            try
            {
                File.Delete(LockFileName);
            }
            catch (Exception)
            {
                // Ignore
            }
#endif
        }


        public void Dispose()
        {
            Dispose(true);
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }


#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~FileLogger()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif
    }
}
