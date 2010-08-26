using System;
using System.IO;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderDocumentCache
    {
        internal class FileRecord
        {
            public string FileName;
            public string ElementName;

            public RecordSet RecordSet;
            
            public IEnumerable<XElement> ReadOnlyElementsList;
            public DateTime LastModified;
            public DateTime FileModificationDate;
            public bool Dirty = false; // Determines whether the inner XElement list is dirty
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

            if(_watchedFiles.Contains(filename))
            {
                return;
            }

            lock(_cacheSyncRoot)
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
            if(fileRecord == null
                || DateTime.Now - fileRecord.LastModified < AcceptableNotificationDelay)
            {
                return;
            }

            lock(_documentEditingSyncRoot)
            {
                lock(_cacheSyncRoot)
                {
                    fileRecord = _cache[filePath];

                    if (fileRecord == null) return;

                    // Ignoring this notification since it's probably caused by XmlDataProvider itself
                    if(DateTime.Now - fileRecord.LastModified < AcceptableNotificationDelay) return;

                    // Checking if the date has changed
                    if(File.GetLastWriteTime(filePath) == fileRecord.FileModificationDate)
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
                        XDocument xDoc = XDocument.Load(filename);
                        List<XElement> elements = ExtractElements(xDoc);

                        var index = new Hashtable<IDataId, XElement>();
                        foreach(var element in elements)
                        {
                            IDataId id = keyGetter(element);
                            if(!index.ContainsKey(id))
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
                            RecordSet = new RecordSet { /* Elements = elements,*/ Index = index},
                            ReadOnlyElementsList = new ReadOnlyList<XElement>(new List<XElement>(elements)),
                            LastModified = DateTime.Now,
                            FileModificationDate = File.GetLastWriteTime(filename)
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
                    XmlWriterSettings xmlWriterSettings = new XmlWriterSettings();
                    xmlWriterSettings.CheckCharacters = false;
                    xmlWriterSettings.Indent = true;
                    using (XmlWriter xmlWriter = XmlWriter.Create(fileRecord.FileName, xmlWriterSettings))
                    {
                        xDocument.Save(xmlWriter);
                    }
                }
                catch (Exception exception)
                {
                    thrownException = exception;
                }
            }
            // ThreadAbortException should have a higher prioriry, and therefore we're doing rethrow in a separate block
            if (thrownException != null) throw thrownException;


            elements.ForEach(element => element.Remove());

            fileRecord.LastModified = DateTime.Now;
            fileRecord.FileModificationDate = File.GetLastWriteTime(fileRecord.FileName);

            // Atomic operation
            fileRecord.ReadOnlyElementsList = new ReadOnlyList<XElement>(new List<XElement>(elements));
            fileRecord.Dirty = false;
        }

        public static void SaveChanges()
        {
            lock (_cacheSyncRoot)
            {
                foreach (string filename in _cache.GetKeys())
                {
                    var record = _cache[filename];
                    if (record.Dirty)
                    {
                        SaveChanges(record);
                    }
                }
            }
        }

        public static void UndoUncommitedChanges()
        {
            lock(_cacheSyncRoot)
            {
                foreach (string filename in _cache.GetKeys())
                {
                    if(_cache[filename].Dirty)
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

                if(_entered)
                {
                    Monitor.Exit(SyncRoot);
                }
            }
        }
    }
}
