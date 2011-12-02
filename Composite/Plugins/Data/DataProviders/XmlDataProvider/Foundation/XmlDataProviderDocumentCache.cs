using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;
using Composite.Core.Configuration;
using Composite.Core;
using Composite.Core.Application;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderDocumentCache
    {
        private const int NumberOfRetries = 30;
        private static readonly string LogTitle = "XmlDataProvider";
        private static string _globalLockFileName = null;

        internal class FileRecord
        {
            public string FileName;
            public string ElementName;

            public RecordSet RecordSet;

            public IEnumerable<XElement> ReadOnlyElementsList;
            public DateTime LastModified;
            public DateTime FileModificationDate;
            public bool Dirty = false; // Determines whether the inner XElement list is dirty

            public string TempFileName
            {
                get
                {
                    return FileName + ".tmp";
                }
            }
        }

        internal class RecordSet
        {
            public Hashtable<IDataId, XElement> Index;
        }

        private static readonly Hashtable<string, FileRecord> _cache = new Hashtable<string, FileRecord>();
        private static HashSet<string> _watchedFiles = new HashSet<string>();
        private static readonly object _cacheSyncRoot = new object();
        private static readonly object _documentEditingSyncRoot = new object();

        private static readonly TimeSpan AcceptableNotificationDelay = TimeSpan.FromSeconds(1.0);


        private static void EnsureFileChangesSubscription(string filename)
        {
            filename = filename.ToLower();

            if (_watchedFiles.Contains(filename))
            {
                return;
            }

            lock (_cacheSyncRoot)
            {
                if (_watchedFiles.Contains(filename))
                {
                    return;
                }

                _watchedFiles.Add(filename);

                FileChangeNotificator.Subscribe(filename, OnFileExternallyChanged);
            }
        }

        private static void OnFileExternallyChanged(string filePath, FileChangeType changeType)
        {
            filePath = filePath.ToLower();

            var fileRecord = _cache[filePath];

            // Ignoring this notification since it's probably caused by XmlDataProvider itself
            if (fileRecord == null
                || DateTime.Now - fileRecord.LastModified < AcceptableNotificationDelay)
            {
                return;
            }

            lock (_documentEditingSyncRoot)
            {
                lock (_cacheSyncRoot)
                {
                    fileRecord = _cache[filePath];

                    if (fileRecord == null) return;

                    // Ignoring this notification since it's probably caused by XmlDataProvider itself
                    if (DateTime.Now - fileRecord.LastModified < AcceptableNotificationDelay) return;

                    // Checking if the date has changed
                    if (C1File.GetLastWriteTime(filePath) == fileRecord.FileModificationDate)
                    {
                        return;
                    }

                    _cache.Remove(filePath);
                }
            }
        }

        public static object SyncRoot
        {
            get { return _documentEditingSyncRoot; }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, handle broken saves")]
        public static FileRecord GetFileRecord(string filename, string elementName, Func<XElement, IDataId> keyGetter)
        {
            string cacheKey = filename.ToLower();

            FileRecord cachedData = _cache[cacheKey];

            if (cachedData == null)
            {
                lock (_cacheSyncRoot)
                {
                    cachedData = _cache[cacheKey];

                    if (cachedData == null)
                    {
                        if (!File.Exists(filename))
                        {
                            bool failed = true;
                            bool fileNotFound = false;
                            Exception lastException = null;
                            Log.LogWarning(LogTitle, "Did not find file '{0}' as expected, will look for .tmp. This can happen is a critical system failure killed the last save".FormatWith(filename));

                            for (int i = 0; i < NumberOfRetries; i++)
                            {
                                try
                                {
                                    // Restore broken save
                                    if (File.Exists(filename + ".tmp"))
                                    {
                                        File.Move(filename + ".tmp", filename);
                                        Composite.Core.Log.LogInformation(LogTitle,
                                                                          "Was able to restore '{0}' from .tmp file."
                                                                              .FormatWith(filename));
                                        failed = false;
                                        break;
                                    }
                                    else
                                    {
                                        fileNotFound = true;
                                        break;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    lastException = ex;
                                    Thread.Sleep(10 * (i + 1));
                                }
                            }

                            if (fileNotFound)
                            {
                                throw new InvalidOperationException("File '{0}' not found".FormatWith(filename));
                            }

                            if (failed)
                            {
                                Log.LogCritical("XmlDataProvider",
                                                           "Failed moving file " + filename + " to file " + filename +
                                                           ".tmp");
                                if (lastException != null)
                                {
                                    Log.LogCritical(LogTitle, lastException);
                                    throw lastException;
                                }
                            }
                        }

                        XDocument xDoc;
                        try
                        {
                            XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
                            xmlReaderSettings.CheckCharacters = false;

                            using (XmlReader xmlWriter = XmlReader.Create(filename, xmlReaderSettings))
                            {
                                xDoc = XDocument.Load(xmlWriter);
                            }
                        }
                        catch (Exception ex)
                        {
                            Log.LogCritical("XmlDataProvider", "Failed to load data from the file: " + filename);
                            Log.LogCritical("XmlDataProvider", ex);

                            throw;
                        }

                        List<XElement> elements = ExtractElements(xDoc);

                        var index = new Hashtable<IDataId, XElement>();
                        foreach (var element in elements)
                        {
                            IDataId id = keyGetter(element);
                            if (!index.ContainsKey(id))
                            {
                                index.Add(id, element);
                            }
                            else
                            {
                                // TODO: handle the dublicated id behaviour
                            }
                        }

                        cachedData = new FileRecord
                                         {
                                             FileName = filename,
                                             ElementName = elementName,
                                             RecordSet = new RecordSet {/* Elements = elements,*/ Index = index },
                                             ReadOnlyElementsList = new List<XElement>(elements),
                                             LastModified = DateTime.Now,
                                             FileModificationDate = C1File.GetLastWriteTime(filename)
                                         };

                        EnsureFileChangesSubscription(filename);

                        _cache.Add(cacheKey, cachedData);
                    }
                }
            }

            return cachedData;
        }



        public static IEnumerable<XElement> GetElements(string filename, string elementName, IXmlDataProviderHelper helper)
        {
            Verify.ArgumentNotNullOrEmpty(filename, "filename");
            Verify.ArgumentNotNullOrEmpty(elementName, "elementName");

            return GetFileRecord(filename, elementName, helper.CreateDataId).ReadOnlyElementsList;
        }




        public static void SaveChanges()
        {
            lock (_cacheSyncRoot)
            {
                var dirtyRecords = _cache.GetValues().Where(f => f.Dirty);
                if (!dirtyRecords.Any()) return;

                foreach (FileRecord record in dirtyRecords)
                {
                    SaveChanges(record);
                }
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, to handle broken saves")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotCallXmlWriterCreateWithPath:DoNotCallXmlWriterCreateWithPath", Justification = "This is what we want, to handle broken saves")]
        private static void SaveChanges(FileRecord fileRecord)
        {
            XDocument xDocument = new XDocument();

            // TODO: Move logic to some else place
            string rootNodeName = fileRecord.ElementName + "s";
            XElement root = new XElement(rootNodeName);
            xDocument.Add(root);

            var recordSet = fileRecord.RecordSet;
            List<XElement> elements = new List<XElement>(recordSet.Index.GetValues());

            elements.ForEach(root.Add);

            Exception thrownException = null;

            // Writing the file in the "catch" block in order to prevent chance of corrupting the file by expiriencing ThreadAbortException.
            try
            {
            }
            finally
            {
                try
                {
                    // Saving to temp file and file move to prevent broken saves
#warning MRJ: Clean this
                    XmlWriterSettings xmlWriterSettings = new XmlWriterSettings();
                    xmlWriterSettings.CheckCharacters = false;
                    xmlWriterSettings.Indent = true;

                    using (XmlWriter xmlWriter = XmlWriter.Create(fileRecord.TempFileName, xmlWriterSettings))
                    {
                        xDocument.Save(xmlWriter);
                    }


                    if (File.Exists(fileRecord.FileName))
                    {
                        bool failed = true;
                        Exception lastException = null;
                        for (int i = 0; i < NumberOfRetries; i++)
                        {
                            try
                            {
                                if (File.Exists(fileRecord.FileName))
                                {
                                    File.Delete(fileRecord.FileName);
                                }
                                failed = false;
                                break;
                            }
                            catch (Exception ex)
                            {
                                lastException = ex;
                                Thread.Sleep(10 * (i + 1));
                            }
                        }

                        if (failed)
                        {
                            Log.LogCritical(LogTitle, "Failed deleting the file: " + fileRecord.FileName);
                            if (lastException != null) throw lastException;

                            throw new InvalidOperationException("Failed to delete a file, this code shouldn't be reacheable");
                        }
                    }

                    try
                    {
                        File.Move(fileRecord.TempFileName, fileRecord.FileName);
                        C1File.Touch(fileRecord.FileName);
                    }
                    catch (Exception)
                    {
                        Log.LogCritical(LogTitle, "Failed to move file: " + fileRecord.TempFileName);
                        throw;
                    }
                }
                catch (Exception exception)
                {
                    Log.LogCritical(LogTitle, "Failed to save data to the file file:" + fileRecord.FileName);
                    Log.LogCritical(LogTitle, exception);
                    thrownException = exception;
                }
            }
            // ThreadAbortException should have a higher prioriry, and therefore we're doing rethrow in a separate block
            if (thrownException != null) throw thrownException;


            elements.ForEach(element => element.Remove());

            fileRecord.LastModified = DateTime.Now;
            fileRecord.FileModificationDate = C1File.GetLastWriteTime(fileRecord.FileName);

            // Atomic operation
            fileRecord.ReadOnlyElementsList = new List<XElement>(elements);
            fileRecord.Dirty = false;
        }



        public static void UndoUncommitedChanges()
        {
            lock (_cacheSyncRoot)
            {
                foreach (string filename in _cache.GetKeys())
                {
                    if (_cache[filename].Dirty)
                    {
                        _cache.Remove(filename);
                    }
                }
            }
        }



        public static void ClearCache()
        {
            _cache.Clear();
        }



        private static List<XElement> ExtractElements(XDocument xDocument)
        {
            var result = new List<XElement>(xDocument.Root.Elements());

            result.ForEach(element => element.Remove());

            return result;
        }



        public static IDisposable CreateEditingContext()
        {
            return new EditingContext();
        }



        private class EditingContext : IDisposable
        {
            private readonly bool _entered;

            public EditingContext()
            {
                Monitor.Enter(SyncRoot, ref _entered);
            }

            public void Dispose()
            {
                UndoUncommitedChanges();

                if (_entered)
                {
                    Monitor.Exit(SyncRoot);
                }
            }
        }
    }
}
