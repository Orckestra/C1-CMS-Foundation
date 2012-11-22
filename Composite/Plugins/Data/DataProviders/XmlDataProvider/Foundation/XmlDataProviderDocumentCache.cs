using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderDocumentCache
    {
        private const int NumberOfRetries = 30;
        private static readonly string LogTitle = "XmlDataProvider";

        internal class FileRecord
        {
            internal FileRecord()
            {
                _random = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
            }

            private string _random;

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
                    return string.Format("{0}.{1}.tmp", FileName, _random);
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
        private static readonly List<KeyValuePair<string, Action>> _externalFileChangeActions = new List<KeyValuePair<string, Action>>();
        private static readonly Dictionary<string, Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>>> _fileOrderers = new Dictionary<string, Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>>>();

        private static readonly TimeSpan AcceptableNotificationDelay = TimeSpan.FromSeconds(1.0);

        static XmlDataProviderDocumentCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        /// <summary>
        /// Register an action that will be invoked on external file changes (new file copied in or file edited by external process).
        /// On Flush system event registrations are cleared and you should reregister.
        /// </summary>
        /// <param name="filename">File path</param>
        /// <param name="action">Action to execute on external changes</param>
        internal static void RegisterExternalFileChangeAction(string filename, Action action)
        {
            string key = filename.ToLowerInvariant();

            _externalFileChangeActions.Add(new KeyValuePair<string, Action>(key, action));
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



        public static object SyncRoot
        {
            get { return _documentEditingSyncRoot; }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, handle broken saves")]
        public static FileRecord GetFileRecord(string filename, string elementName, Func<XElement, IDataId> keyGetter)
        {
            string cacheKey = filename.ToLowerInvariant();

            FileRecord cachedData = _cache[cacheKey];

            if (cachedData == null)
            {
                lock (_cacheSyncRoot)
                {
                    cachedData = _cache[cacheKey];

                    if (cachedData == null)
                    {
                        cachedData = LoadFileRecordFromDisk(filename, elementName, keyGetter);

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



        public static IDisposable CreateEditingContext()
        {
            return new EditingContext();
        }



        private static List<XElement> ExtractElements(XDocument xDocument)
        {
            var result = new List<XElement>(xDocument.Root.Elements());

            result.ForEach(element => element.Remove());

            return result;
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

            if (_fileOrderers.ContainsKey(fileRecord.FileName.ToLowerInvariant()))
            {
                var orderer = _fileOrderers[fileRecord.FileName.ToLowerInvariant()];
                var orderedElements = orderer(elements);
                orderedElements.ForEach(root.Add);
            }
            else
            {
                elements.ForEach(root.Add);
            }

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
                        // Ignore exception here. The tmp file might have been "recovered" by the load method
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



        /// <summary>
        /// Fetches a list of files that contain data - both the stable file and tmp files.
        /// List is ordered with newest files first.
        /// </summary>
        /// <param name="filename"></param>
        /// <returns></returns>
        private static IList<C1FileInfo> GetCandidateFiles(string filename)
        {
            List<C1FileInfo> files = new List<C1FileInfo>();
            if (C1File.Exists(filename))
            {
                files.Add(new C1FileInfo(filename));
            }

            var tmpFilenames = C1Directory.GetFiles(Path.GetDirectoryName(filename), string.Format("{0}.*.tmp", Path.GetFileName(filename)));

            foreach (string tmpFilename in tmpFilenames)
            {
                files.Add(new C1FileInfo(tmpFilename));
            }

            return files.OrderByDescending(f => f.LastWriteTime).ToList();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _externalFileChangeActions.Clear();
        }



        private static void EnsureFileChangesSubscription(string filename)
        {
            filename = filename.ToLowerInvariant();

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
            filePath = filePath.ToLowerInvariant();

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

                    Log.LogVerbose(LogTitle, "File '{0}' changed by another process. Flushing cache.", filePath);

                    if (_externalFileChangeActions.Any(f => f.Key == filePath))
                    {
                        foreach (var action in _externalFileChangeActions.Where(f => f.Key == filePath).Select(f => f.Value))
                        {
                            action.Invoke();
                        }
                    }
                    else
                    {
                        Log.LogWarning(LogTitle, "File '{0}' has not been related to a scope - unable to raise store change event", filePath);
                    }
                }
            }
        }



        /// <summary>
        /// Will pull up most recent from disk - if no good file is found an empty store will be constructed anyway
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="elementName"></param>
        /// <param name="keyGetter"></param>
        /// <param name="cachedData"></param>
        /// <returns></returns>
        private static FileRecord LoadFileRecordFromDisk(string filename, string elementName, Func<XElement, IDataId> keyGetter)
        {
            XDocument dataDocument = null;
            C1FileInfo usedFile = null;

            IList<C1FileInfo> candidateFiles = GetCandidateFiles(filename);

            foreach (C1FileInfo candidateFile in candidateFiles)
            {
                bool tryLoad = true;

                while (tryLoad && dataDocument == null)
                {
                    dataDocument = TryLoad(candidateFile);

                    if (dataDocument == null)
                    {
                        if ((DateTime.Now - candidateFile.LastWriteTime).TotalSeconds > 30)
                        {
                            tryLoad = false;
                        }
                        else
                        {
                            Thread.Sleep(250); // other processes/servers may be writing to this file at the moment. Patience young padawan!
                        }
                    }
                }

                if (dataDocument != null)
                {
                    usedFile = candidateFile;
                    break;
                }
            }

            if (dataDocument == null)
            {
                dataDocument = new XDocument(new XElement("fallback"));
                Log.LogWarning(LogTitle, "Did not find a healthy XML document for '{0}' - creating an empty store.", filename);
            }

            List<XElement> elements = ExtractElements(dataDocument);

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
                    Log.LogWarning(LogTitle, "Found multiple elements in '{0}' sharing same key - duplicates ignored.", filename);
                }
            }

            if (usedFile != null)
            {
                // clean up old and unused files
                foreach (C1FileInfo file in candidateFiles.Where(f => f.LastWriteTime < usedFile.LastWriteTime))
                {
                    try
                    {
                        C1File.Move(file.FullName, file.FullName + ".ghost");
                    }
                    catch (Exception)
                    {
                        Log.LogWarning(LogTitle, "Failed to clean up ghost file '{0}'.", filename);
                    }
                }
            }

            DateTime lastModifiedFileDate = usedFile != null ? usedFile.LastWriteTime : DateTime.Now;

            return new FileRecord
            {
                FileName = filename,
                ElementName = elementName,
                RecordSet = new RecordSet { Index = index },
                ReadOnlyElementsList = new List<XElement>(elements),
                LastModified = DateTime.Now,
                FileModificationDate = lastModifiedFileDate
            };
        }



        private static XDocument TryLoad(C1FileInfo candidateFile)
        {
            XDocument dataDocument = null;
            try
            {
                XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
                xmlReaderSettings.CheckCharacters = false;

                using (XmlReader xmlReader = XmlReaderUtils.Create(candidateFile.FullName, xmlReaderSettings))
                {
                    dataDocument = XDocument.Load(xmlReader);
                }
            }
            catch (Exception ex)
            {
                // broken file - should not stop us...
            }

            return dataDocument;
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
