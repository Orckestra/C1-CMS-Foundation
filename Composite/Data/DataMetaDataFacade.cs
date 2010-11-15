using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataMetaDataFacade
    {
        private static Dictionary<Guid, DataTypeDescriptor> _dataTypeDescriptorCache = null;
        private static Dictionary<Guid, string> _dataTypeDescriptorFilesnamesCache = null;
        private static readonly object _lock = new object();

        private static string _metaDataPath;



        static DataMetaDataFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);

            _metaDataPath = PathUtil.Resolve(GlobalSettingsFacade.DataMetaDataDirectory);
            if (C1Directory.Exists(_metaDataPath) == false)
            {
                C1Directory.CreateDirectory(_metaDataPath);
            }

            UpdateFilenames();            
        }



        private static void Initialize()
        {
            if (_dataTypeDescriptorCache != null) return;

            lock (_lock)
            {
                _dataTypeDescriptorCache = new Dictionary<Guid, DataTypeDescriptor>();
                _dataTypeDescriptorFilesnamesCache = new Dictionary<Guid, string>();


                List<string> filepaths = C1Directory.GetFiles(_metaDataPath).ToList();

                foreach (string filepath in filepaths)
                {
                    XDocument doc = XDocumentUtils.Load(filepath);

                    DataTypeDescriptor dataTypeDescriptor = DataTypeDescriptor.FromXml(doc.Root);
                    _dataTypeDescriptorCache.Add(dataTypeDescriptor.DataTypeId, dataTypeDescriptor);
                    _dataTypeDescriptorFilesnamesCache.Add(dataTypeDescriptor.DataTypeId, filepath);
                }
            }
        }



        private static void UpdateFilenames()
        {
            List<string> filepaths = C1Directory.GetFiles(_metaDataPath).ToList();

            Dictionary<Guid, string> ids = new Dictionary<Guid,string>();
            foreach (string filepath in filepaths)
            {
                Guid id = GetGuidFromFilename(filepath);
                if (ids.ContainsKey(id) == false)
                {
                    ids.Add(id, filepath);
                }
                else // This should never happen, but is here to be robust
                {
                    if (filepath.Contains('_') == false) // Old version of the file, delete it
                    {
                        FileUtils.Delete(filepath);
                    }
                    else // Old version is stored in ids, delete it and change the value to new version
                    {
                        FileUtils.Delete(ids[id]);
                        ids[id] = filepath;
                    }                    
                }
            }

            foreach (var kvp in ids)
            {
                string filepath = kvp.Value;
                if (Path.GetFileNameWithoutExtension(filepath).Contains('_') == false)
                {
                    XDocument doc = XDocumentUtils.Load(filepath);

                    DataTypeDescriptor dataTypeDescriptor = DataTypeDescriptor.FromXml(doc.Root);

                    string newFilepath = CreateFilename(dataTypeDescriptor);

                    FileUtils.RemoveReadOnly(filepath);
                    C1File.Move(filepath, newFilepath);
                }
            }
        }



        public static IEnumerable<DataTypeDescriptor> AllDataTypeDescriptors
        {
            get
            {
                Initialize();

                return _dataTypeDescriptorCache.Values;
            }
        }



        public static IEnumerable<DataTypeDescriptor> GeneratedTypeDataTypeDescriptors
        {
            get
            {
                foreach (DataTypeDescriptor dataTypeDescriptor in AllDataTypeDescriptors)
                {
                    if (dataTypeDescriptor.IsCodeGenerated == true)
                    {
                        yield return dataTypeDescriptor;
                    }
                }
            }
        }



        public static DataTypeDescriptor GetDataTypeDescriptor(Guid id)
        {
            Initialize();

            DataTypeDescriptor dataTypeDescriptor;

            _dataTypeDescriptorCache.TryGetValue(id, out dataTypeDescriptor);            

            return dataTypeDescriptor;
        }



        public static void PersistMetaData(DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_lock)
            {
                Initialize();

                string filepath = CreateFilename(dataTypeDescriptor);

                XElement rootElement = dataTypeDescriptor.ToXml();
                XDocument doc = new XDocument(rootElement);
                XDocumentUtils.Save(doc, filepath);

                _dataTypeDescriptorCache[dataTypeDescriptor.DataTypeId] = dataTypeDescriptor;

                if ((_dataTypeDescriptorFilesnamesCache.ContainsKey(dataTypeDescriptor.DataTypeId) == true) && 
                    (_dataTypeDescriptorFilesnamesCache[dataTypeDescriptor.DataTypeId] != filepath))
                {
                    FileUtils.Delete(_dataTypeDescriptorFilesnamesCache[dataTypeDescriptor.DataTypeId]);
                    _dataTypeDescriptorFilesnamesCache[dataTypeDescriptor.DataTypeId] = filepath;
                }                
            }
        }



        public static void DeleteMetaData(Guid dataTypeId)
        {
            lock (_lock)
            {
                Initialize();

                if (_dataTypeDescriptorFilesnamesCache.ContainsKey(dataTypeId) == true)
                {
                    FileUtils.Delete(_dataTypeDescriptorFilesnamesCache[dataTypeId]);

                    _dataTypeDescriptorCache.Remove(dataTypeId);
                    _dataTypeDescriptorFilesnamesCache.Remove(dataTypeId);
                }
            }
        }       



        private static string CreateFilename(DataTypeDescriptor dataTypeDescriptor)
        {
            return Path.Combine(_metaDataPath, string.Format("{0}_{1}.xml", dataTypeDescriptor.Name, dataTypeDescriptor.DataTypeId));
        }



        private static Guid GetGuidFromFilename(string filepath)
        {
            string tmp = Path.GetFileNameWithoutExtension(filepath);
            int index = tmp.LastIndexOf('_');

            if (index == -1)
            {
                return new Guid(tmp);
            }
            else
            {
                return new Guid(tmp.Substring(index + 1));
            }
        }



        private static void Flush()
        {
            _dataTypeDescriptorCache = null;
            _dataTypeDescriptorFilesnamesCache = null;
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
