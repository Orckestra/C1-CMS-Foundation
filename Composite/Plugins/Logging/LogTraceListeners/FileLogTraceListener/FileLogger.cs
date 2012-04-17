using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading;
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
        private readonly string _logDirectoryPath;
        private readonly bool _flushImmediately;

        public static event ThreadStart OnReset;


        internal LogFileInfo _fileConnection;
        internal readonly object _syncRoot = new object();
        private DateTime _lastLogFileTouch = DateTime.MinValue;


        public FileLogger(string logDirectoryPath, bool flushImmediately)
        {
            Verify.ArgumentNotNull(logDirectoryPath, "logDirectoryPath");

            _logDirectoryPath = Path.Combine(PathUtil.BaseDirectory, logDirectoryPath);
            if (!C1Directory.Exists(_logDirectoryPath))
            {
                C1Directory.CreateDirectory(_logDirectoryPath);
            }
            _flushImmediately = flushImmediately;

            TouchLockFile();
        }
        


        public DateTime StartupTime
        {
            get
            {
                lock (_syncRoot)
                {
                    if (_fileConnection != null)
                    {
                        return _fileConnection.StartupTime;
                    }
                }
                return DateTime.Now;
            }
        }



        public void WriteEntry(LogEntry entry)
        {
            string logLine = entry.ToString();

            byte[] bytes = Encoding.UTF8.GetBytes(logLine + "\n");

            EnsureInitialize();

            lock (_syncRoot)
            {
                _fileConnection.NewEntries.Add(entry);

                // Checking whether we should change the file after midnight
                int dayNumber = entry.TimeStamp.Day;

                if (dayNumber != _fileConnection.CreationDate.Day
                   && dayNumber == DateTime.Now.Day)
                {
                    ResetInitialization();
                }

                // Writing the file in the "catch" block in order to prevent chance of corrupting the file by expiriencing ThreadAbortException.
                Exception thrownException = null;
                try
                {
                }
                finally
                {
                    try
                    {
                        _fileConnection.FileStream.Write(bytes, 0, bytes.Length);

                        if (_flushImmediately)
                        {
                            _fileConnection.FileStream.Flush();
                        }
                    }
                    catch (Exception exception)
                    {
                        thrownException = exception;
                    }
                }
                // ThreadAbortException should have a higher prioriry, and therefore we're doing rethrow in a separate block
                if (thrownException != null) throw thrownException;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass", Justification = "This is what we want, touch is used later on")]
        public LogFileReader[] GetLogFiles()
        {
            EnsureInitialize();

            if (MoreThanOneAppDomainRunning()) return new LogFileReader[] { };

            string[] filePathes = Directory.GetFiles(_logDirectoryPath);

            string currentlyOpenedFileName = null;

            var result = new List<LogFileReader>();

            lock (_syncRoot)
            {
                if (_fileConnection != null)
                {
                    currentlyOpenedFileName = _fileConnection.FileName;

                    result.Add(new CurrentFileReader(this));
                }
            }

            foreach (string filePath in filePathes)
            {
                string fileName = Path.GetFileName(filePath);

                // Skipping file to which we're currently using
                if (currentlyOpenedFileName != null
                    && string.Compare(fileName, currentlyOpenedFileName, true) == 0)
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
        private static bool TryReadAndOpen(string filePath, out string[] content, out FileStream stream, out Exception exception)
        {
            content = null;
            stream = null;
            exception = null;

            try
            {
                // TODO: It should open file only once, not twice
                content = File.ReadAllLines(filePath);

                stream = File.Open(filePath, FileMode.Open, FileAccess.ReadWrite, FileShare.Read);
                stream.Seek(stream.Length, SeekOrigin.Begin);
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
            TouchLockFile();

            RemoveOldLockFiles();            

            TouchLogFiles();

            if (_fileConnection != null) return;

            lock (_syncRoot)
            {
                if (_fileConnection != null) return;

                DateTime creationDate = DateTime.Now;

                string fileNamePrefix = creationDate.ToString("yyyyMMdd");
                string fileName;
                FileStream stream = null;
                Exception ex;

                for (int i = 0; i < 10; i++)
                {
                    fileName = fileNamePrefix + (i > 0 ? "_" + i : string.Empty) + ".txt";
                    string filePath = Path.Combine(_logDirectoryPath, fileName);

                    if (!File.Exists(filePath))
                    {
                        stream = TryOpenFile(filePath, out ex);

                        if (stream == null)
                        {
                            // Ignoring this exception if the file has already created
                            if (File.Exists(filePath)) continue;

                            throw new Exception("Failed to create file '{0}'".FormatWith(filePath), ex);
                        }

                        _fileConnection = new LogFileInfo
                                              {
                                                  CreationDate = creationDate.Date,
                                                  StartupTime = creationDate,
                                                  FileName = fileName,
                                                  FilePath = filePath,
                                                  FileStream = stream,
                                                  OldEntries = new string[0]
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

                    _fileConnection = new LogFileInfo
                                          {
                                              CreationDate = creationDate.Date,
                                              StartupTime = creationDate,
                                              FileName = fileName,
                                              FilePath = filePath,
                                              FileStream = stream,
                                              OldEntries = alreadyWritten
                                          };
                    return;
                }

                throw new InvalidOperationException("Failed to open/create a log file");
            }

        }



        /// <summary>
        /// Due to the nature of this logger. Keeping files open all the time. It works very badly with Azure blob syncronization.
        /// So this class dont uses the C1 IO classes. But logfiles are nice to have synced to the blob, so old logfiles are touched.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass", Justification = "This is what we want, touch is used later on")]
        private void TouchLogFiles()
        {
            if (DateTime.Now - _lastLogFileTouch > TimeSpan.FromHours(12))
            {
                lock (_syncRoot)
                {
                    _lastLogFileTouch = DateTime.Now;

                    DateTime creationDate = DateTime.Now;
                    string fileNamePrefix = creationDate.ToString("yyyyMMdd");

                    foreach (string filepath in Directory.GetFiles(_logDirectoryPath))
                    {
                        if (!Path.GetFileName(filepath).StartsWith(fileNamePrefix))
                        {
                            C1File.Touch(filepath);
                        }
                    }

                }
            }
        }



        [SuppressMessage("Composite.IO", "Composite.DoNotUseDirectoryClass:DoNotUseDirectoryClass")]        
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private void RemoveOldLockFiles()
        {
            DateTime now = DateTime.Now;
            foreach (string filePath in Directory.GetFiles(_logDirectoryPath, "*.lock"))
            {
                string appDomainIdString = Path.GetFileNameWithoutExtension(filePath);
                int appDomainId;
                if (!int.TryParse(appDomainIdString, out appDomainId)) continue;

                if (appDomainId != AppDomain.CurrentDomain.Id)
                {
                    DateTime lastWrite = File.GetLastWriteTime(filePath);

                    TimeSpan fileAge = now - lastWrite;

                    if (fileAge.TotalSeconds >= 60)
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



        private void ResetInitialization()
        {
            lock (_syncRoot)
            {
                if (_fileConnection != null)
                {
                    _fileConnection.Dispose();
                    _fileConnection = null;
                }

                if (OnReset != null)
                {
                    OnReset();
                }

                EnsureInitialize();
            }
        }


        private static void WriteUTF8EncodingHeader(Stream stream)
        {
            byte[] preamble = Encoding.UTF8.GetPreamble();
            stream.Write(preamble, 0, preamble.Length);
        }



        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private void TouchLockFile()
        {
            // Create .lock file
            try
            {
                File.WriteAllText(LockFileName, "");
            }
            catch (Exception)
            {
                // Ignore
            }
        }



        private string LockFileName
        {
            get
            {
                string lockFileName = Path.Combine(_logDirectoryPath, AppDomain.CurrentDomain.Id + ".lock");

                return lockFileName;
            }
        }



        bool _disposed = false;
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    if (_fileConnection != null)
                    {
                        _fileConnection.Dispose();
                        _fileConnection = null;
                    }
                }

                _disposed = true;
            }

            // Delete the file in any case
            try
            {
                if (File.Exists(LockFileName))
                {
                    File.Delete(LockFileName);
                }
            }
            catch (Exception)
            {
                // Ignore
            }
        }


        public void Dispose()
        {
            Dispose(true);
        }


        ~FileLogger()
        {
            Dispose(false);
        }
    }
}
