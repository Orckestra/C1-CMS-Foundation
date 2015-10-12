using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core;
using Composite.Core.IO;
using System.IO;
using System.Threading;
using System.Xml;
using Composite.C1Console.Events;

namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderDocumentWriter
    {
        private static readonly ConcurrentQueue<FileRecord> _dirtyRecords = new ConcurrentQueue<FileRecord>();
        private static readonly Dictionary<string, Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>>> _fileOrderers = new Dictionary<string, Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>>>();
        private static readonly object _flushEnterLock = new object();
        private static readonly object _flushExecuteLock = new object();
        private static DateTime _activeFlushActivityStart = DateTime.MinValue;
        private static System.Timers.Timer _autoCommitTimer;

        private static readonly TimeSpan _updateFrequency = TimeSpan.FromMilliseconds(1000);
        private static readonly TimeSpan _fileIoDelay = TimeSpan.FromMilliseconds(10); // small pause between io operations to reduce asp.net appPool recycles due to FileWatcher buffer fills - edge case, but highly annoying
        private const int NumberOfRetries = 30;
        private static readonly string LogTitle = "XmlDataProvider";
        private static bool forceImmediateWrite = false;


        static XmlDataProviderDocumentWriter()
        {
            _autoCommitTimer = new System.Timers.Timer(_updateFrequency.TotalMilliseconds);
            _autoCommitTimer.AutoReset = true;
            _autoCommitTimer.Elapsed += new System.Timers.ElapsedEventHandler(OnAutoCommitTimer);
            _autoCommitTimer.Start();

            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);
        }


        private static void OnShutDownEvent(ShutDownEventArgs args)
        {
            forceImmediateWrite = true;
            Flush();
        }


        internal static void Save(FileRecord fileRecord)
        {
            _dirtyRecords.Enqueue(fileRecord);

            if (forceImmediateWrite)
            {
                Flush();
            }
        }


        internal static void RegisterFileOrderer(string filename, Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>> orderer)
        {
            string key = filename.ToLowerInvariant();

            if (_fileOrderers.ContainsKey(key))
            {
                _fileOrderers.Remove(key);
            }

            _fileOrderers.Add(key, orderer);
        }


        private static bool TryGetFileOrderer(out Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>> orderer, string filename)
        {
            string key = filename.ToLowerInvariant();

            if (_fileOrderers.ContainsKey(key))
            {
                orderer = _fileOrderers[key];
                return true;
            }

            orderer = null;
            return false;
        }


        internal static void Flush()
        {
            lock (_flushEnterLock)
            {
                if (!forceImmediateWrite && (DateTime.Now - _activeFlushActivityStart).TotalSeconds < 30)
                {
                    return;
                }

                _activeFlushActivityStart = DateTime.Now;
            }

            FileRecord dirtyFileRecord;
            List<FileRecord> fileRecords = new List<FileRecord>();

            lock (_flushExecuteLock)
            {
                while (_dirtyRecords.TryDequeue(out dirtyFileRecord))
                {
                    if (!fileRecords.Any(f => f.FilePath == dirtyFileRecord.FilePath))
                    {
                        fileRecords.Add(dirtyFileRecord);
                    }
                }

                foreach (var fileRecord in fileRecords)
                {
                    try
                    {
                        DoSave(fileRecord);
                    }
                    catch (Exception ex)
                    {
                        Log.LogError(LogTitle, ex);
                        _dirtyRecords.Enqueue(fileRecord);
                    }
                }
            }

            _activeFlushActivityStart = DateTime.MinValue;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, to handle broken saves")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotCallXmlWriterCreateWithPath:DoNotCallXmlWriterCreateWithPath", Justification = "This is what we want, to handle broken saves")]
        private static void DoSave(FileRecord fileRecord)
        {
            XDocument xDocument = new XDocument();

            XElement root = new XElement(GetRootElementName(fileRecord.ElementName));
            xDocument.Add(root);

            var recordSet = fileRecord.RecordSet;
            List<XElement> elements = new List<XElement>(recordSet.Index.GetValues());

            string key = fileRecord.FilePath.ToLowerInvariant();

            Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>> orderer;
            if (TryGetFileOrderer(out orderer, fileRecord.FilePath))
            {
                var orderedElements = orderer(elements);

                orderedElements.ForEach(root.Add);
            }
            else
            {
                elements.ForEach(root.Add);
            }

            Exception thrownException = null;

            // Writing the file in the "catch" block in order to prevent chance of corrupting the file by experiencing ThreadAbortException.
            try
            {
            }
            finally
            {
                try
                {
                    // Saving to temp file and file move to prevent broken saves
                    XmlWriterSettings xmlWriterSettings = new XmlWriterSettings();
                    xmlWriterSettings.CheckCharacters = false;
                    xmlWriterSettings.Indent = true;

                    using (XmlWriter xmlWriter = XmlWriter.Create(fileRecord.TempFilePath, xmlWriterSettings))
                    {
                        xDocument.Save(xmlWriter);
                    }
                    Thread.Sleep(_fileIoDelay);

                    bool failed = true;
                    Exception lastException = null;
                    for (int i = 0; i < NumberOfRetries; i++)
                    {
                        DateTime lastSuccessfulFileChange = fileRecord.FileModificationDate; 
                        try
                        {

                            fileRecord.FileModificationDate = DateTime.MinValue;
                            File.Copy(fileRecord.TempFilePath, fileRecord.FilePath, true);
                            failed = false;
                            break;
                        }
                        catch (Exception ex)
                        {
                            fileRecord.FileModificationDate = lastSuccessfulFileChange;
                            lastException = ex;
                            Thread.Sleep(10 * (i + 1));
                        }
                    }

                    if (!failed)
                    {
                        Thread.Sleep(_fileIoDelay);
                        File.Delete(fileRecord.TempFilePath);
                    }
                    else
                    {
                        Log.LogCritical(LogTitle, "Failed deleting the file: " + fileRecord.FilePath);
                        if (lastException != null) throw lastException;

                        throw new InvalidOperationException("Failed to delete a file, this code shouldn't be reacheable");
                    }

                    fileRecord.FileModificationDate = C1File.GetLastWriteTime(fileRecord.FilePath);
                }
                catch (Exception exception)
                {
                    Log.LogCritical(LogTitle, "Failed to save data to the file file:" + fileRecord.FilePath);
                    Log.LogCritical(LogTitle, exception);
                    thrownException = exception;
                }
            }
            // ThreadAbortException should have a higher prioriry, and therefore we're doing rethrow in a separate block
            if (thrownException != null) throw thrownException;
        }

        internal static string GetRootElementName(string elementName)
        {
            return elementName + "Elements";
        }


        private static void OnAutoCommitTimer(object sender, System.Timers.ElapsedEventArgs e)
        {
            Flush();
        }
    }
}
