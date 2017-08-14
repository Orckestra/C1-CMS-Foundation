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
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderDocumentCache
    {
        private static readonly string LogTitle = "XmlDataProvider";

        private static readonly Hashtable<string, FileRecord> _cache = new Hashtable<string, FileRecord>();
        private static HashSet<string> _watchedFiles = new HashSet<string>();
        private static readonly object _cacheSyncRoot = new object();
        private static readonly object _documentEditingSyncRoot = new object();
        private static readonly List<KeyValuePair<string, Action>> _externalFileChangeActions = new List<KeyValuePair<string, Action>>();

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


        public static object SyncRoot
        {
            get { return _documentEditingSyncRoot; }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is what we want, handle broken saves")]
        public static FileRecord GetFileRecord(string filePath, string elementName, Func<XElement, IDataId> keyGetter)
        {
            string cacheKey = filePath.ToLowerInvariant();

            FileRecord cachedData = _cache[cacheKey];

            if (cachedData == null)
            {
                lock (_cacheSyncRoot)
                {
                    cachedData = _cache[cacheKey];

                    if (cachedData == null)
                    {
                        cachedData = LoadFileRecordFromDisk(filePath, elementName, keyGetter);

                        EnsureFileChangesSubscription(filePath);

                        _cache.Add(cacheKey, cachedData);
                    }
                }
            }

            return cachedData;
        }



        public static IEnumerable<XElement> GetElements(string filePath, string elementName, IXmlDataProviderHelper helper)
        {
            Verify.ArgumentNotNullOrEmpty(filePath, "filename");
            Verify.ArgumentNotNullOrEmpty(elementName, "elementName");

            return GetFileRecord(filePath, elementName, helper.CreateDataId).ReadOnlyElementsList;
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



        public static void ClearCache()
        {
            XmlDataProviderDocumentWriter.Flush();
            _cache.Clear();
        }



        public static IDisposable CreateEditingContext()
        {
            return new EditingContext();
        }



        private static List<XElement> ExtractElements(XDocument xDocument)
        {
            IEnumerable<XElement> elements = xDocument.Root.Elements();

            var result = new List<XElement>(elements.Count());
            result.AddRange(elements);

            xDocument.Root.RemoveNodes();

            return result;  
        }



        private static void SaveChanges(FileRecord fileRecord)
        {
            fileRecord.LastModified = DateTime.Now;
            fileRecord.ReadOnlyElementsList = fileRecord.RecordSet.Index.GetValues();
            fileRecord.CachedTable = null;
            fileRecord.Dirty = false;

            XmlDataProviderDocumentWriter.Save(fileRecord);
        }



        /// <summary>
        /// Fetches a list of files that contain data - both the stable file and tmp files.
        /// List is ordered with newest files first.
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        private static IList<C1FileInfo> GetCandidateFiles(string filePath)
        {
            List<C1FileInfo> files = new List<C1FileInfo>();
            if (C1File.Exists(filePath))
            {
                files.Add(new C1FileInfo(filePath));
            }

            var tmpFilePaths = C1Directory.GetFiles(Path.GetDirectoryName(filePath), string.Format("{0}.*.tmp", Path.GetFileName(filePath)));

            foreach (string tmpFilePath in tmpFilePaths)
            {
                files.Add(new C1FileInfo(tmpFilePath));
            }

            return files.OrderByDescending(f => f.LastWriteTime).ToList();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _externalFileChangeActions.Clear();
        }



        private static void EnsureFileChangesSubscription(string filePath)
        {
            filePath = filePath.ToLowerInvariant();

            if (_watchedFiles.Contains(filePath))
            {
                return;
            }

            lock (_cacheSyncRoot)
            {
                if (_watchedFiles.Contains(filePath))
                {
                    return;
                }

                _watchedFiles.Add(filePath);

                FileChangeNotificator.Subscribe(filePath, OnFileExternallyChanged);
            }
        }



        private static void OnFileExternallyChanged(string filePath, FileChangeType changeType)
        {
            filePath = filePath.ToLowerInvariant();

            var fileRecord = _cache[filePath];

            if (fileRecord == null
                || fileRecord.FileModificationDate == DateTime.MinValue
                || C1File.GetLastWriteTime(filePath) == fileRecord.FileModificationDate)
            {
                // Ignoring this notification since it's very very probably caused by XmlDataProvider itself
                return;
            }

            lock (_documentEditingSyncRoot)
            {
                lock (_cacheSyncRoot)
                {
                    fileRecord = _cache[filePath];

                    if (fileRecord == null
                        || fileRecord.FileModificationDate == DateTime.MinValue
                        || C1File.GetLastWriteTime(filePath) == fileRecord.FileModificationDate)
                    {
                        // Ignoring this notification since it's very very probably caused by XmlDataProvider itself
                        return;
                    }

                    _cache.Remove(filePath);

                    Log.LogVerbose(LogTitle, "File '{0}' changed by another process. Flushing cache.", filePath);

                    if (_externalFileChangeActions.Any(f => f.Key == filePath))
                    {
                        var actions = _externalFileChangeActions.Where(f => f.Key == filePath).Select(f => f.Value).ToList();
                        foreach (var action in actions)
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
        /// <param name="filePath"></param>
        /// <param name="elementName"></param>
        /// <param name="keyGetter"></param>
        /// <returns></returns>
        private static FileRecord LoadFileRecordFromDisk(string filePath, string elementName, Func<XElement, IDataId> keyGetter)
        {
            XDocument dataDocument = null;
            C1FileInfo usedFile = null;

            IList<C1FileInfo> candidateFiles = GetCandidateFiles(filePath);

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
                Log.LogWarning(LogTitle, "Did not find a healthy XML document for '{0}' - creating an empty store.", filePath);
            }

            List<XElement> elements = ExtractElements(dataDocument);

            var index = new Hashtable<IDataId, XElement>(elements.Count);
            foreach (var element in elements)
            {
                IDataId id = keyGetter(element);
                if (!index.ContainsKey(id))
                {
                    index.Add(id, element);
                }
                else
                {
                    Log.LogWarning(LogTitle, "Found multiple elements in '{0}' sharing same key - duplicates ignored.", filePath);
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
                        Log.LogWarning(LogTitle, "Failed to clean up ghost file '{0}'.", filePath);
                    }
                }
            }

            DateTime lastModifiedFileDate = usedFile != null ? usedFile.LastWriteTime : DateTime.Now;

            return new FileRecord
            {
                FilePath = filePath,
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
            catch (Exception)
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
                if (_entered)
                {
                    Monitor.Exit(SyncRoot);
                }
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~EditingContext()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }

    }
}
