using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Data.DynamicTypes;
using Composite.EventSystem;
using Composite.GlobalSettings;
using Composite.IO;


namespace Composite.Data
{
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
            if (Directory.Exists(_metaDataPath) == false)
            {
                Directory.CreateDirectory(_metaDataPath);
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


                List<string> filepaths = Directory.GetFiles(_metaDataPath).ToList();

                foreach (string filepath in filepaths)
                {
                    XDocument doc = XDocument.Load(filepath);

                    DataTypeDescriptor dataTypeDescriptor = DataTypeDescriptor.FromXml(doc.Root);
                    _dataTypeDescriptorCache.Add(dataTypeDescriptor.DataTypeId, dataTypeDescriptor);
                    _dataTypeDescriptorFilesnamesCache.Add(dataTypeDescriptor.DataTypeId, filepath);
                }
            }
        }



        private static void UpdateFilenames()
        {
            List<string> filepaths = Directory.GetFiles(_metaDataPath).ToList();

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
                        FileEx.Delete(filepath);
                    }
                    else // Old version is stored in ids, delete it and change the value to new version
                    {
                        FileEx.Delete(ids[id]);
                        ids[id] = filepath;
                    }                    
                }
            }

            foreach (var kvp in ids)
            {
                string filepath = kvp.Value;
                if (Path.GetFileNameWithoutExtension(filepath).Contains('_') == false)
                {
                    XDocument doc = XDocument.Load(filepath);

                    DataTypeDescriptor dataTypeDescriptor = DataTypeDescriptor.FromXml(doc.Root);

                    string newFilepath = CreateFilename(dataTypeDescriptor);

                    FileEx.RemoveReadOnly(filepath);
                    File.Move(filepath, newFilepath);
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
                doc.Save(filepath);

                _dataTypeDescriptorCache[dataTypeDescriptor.DataTypeId] = dataTypeDescriptor;

                if ((_dataTypeDescriptorFilesnamesCache.ContainsKey(dataTypeDescriptor.DataTypeId) == true) && 
                    (_dataTypeDescriptorFilesnamesCache[dataTypeDescriptor.DataTypeId] != filepath))
                {
                    FileEx.Delete(_dataTypeDescriptorFilesnamesCache[dataTypeDescriptor.DataTypeId]);
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
                    FileEx.Delete(_dataTypeDescriptorFilesnamesCache[dataTypeId]);

                    _dataTypeDescriptorCache.Remove(dataTypeId);
                    _dataTypeDescriptorFilesnamesCache.Remove(dataTypeId);
                }
            }
        }       



        private static string CreateFilename(DataTypeDescriptor dataTypeDescriptor)
        {
            if (string.IsNullOrEmpty(dataTypeDescriptor.Namespace) == true)
            {
                return Path.Combine(_metaDataPath, string.Format("{0}_{1}.xml", dataTypeDescriptor.Name, dataTypeDescriptor.DataTypeId));
            }
            else 
            {
                return Path.Combine(_metaDataPath, string.Format("{0}.{1}_{2}.xml", dataTypeDescriptor.Namespace, dataTypeDescriptor.Name, dataTypeDescriptor.DataTypeId));
            }
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
