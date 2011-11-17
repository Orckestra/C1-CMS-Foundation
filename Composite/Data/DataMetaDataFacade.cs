using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data.DynamicTypes;
using Composite.Core.Types;
using System.Reflection;
using Composite.Core;
using Composite.Data.DynamicTypes.Foundation;


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

            Dictionary<Guid, string> ids = new Dictionary<Guid, string>();
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



        /// <exclude />
        public static IEnumerable<DataTypeDescriptor> AllDataTypeDescriptors
        {
            get
            {
                Initialize();

                return _dataTypeDescriptorCache.Values;
            }
        }



        /// <exclude />
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



        /// <summary>
        /// This method will return the data type descriptor for the given data type id.
        /// If the data type descriptor has not yet been created (file not existing) and 
        /// the <paramref name="allowDataTypeCreation"/> is set to true,
        /// this method will try getting it through the <see cref="Composite.Data.DynamicTypes.Foundation.ReflectionBasedDescriptorBuilder"/> 
        /// that will try locating the type from the data type id using refelction 
        /// going through know assemblies.
        /// </summary>
        /// <param name="dataTypeId">The id of the data type.</param>
        /// <param name="allowDataTypeCreation">
        /// If this is true and the data type descriptor does not exists, it will try to
        /// be created.
        /// </param>
        /// <returns></returns>
        public static DataTypeDescriptor GetDataTypeDescriptor(Guid dataTypeId, bool allowDataTypeCreation = false)
        {
            Initialize();

            DataTypeDescriptor dataTypeDescriptor;

            _dataTypeDescriptorCache.TryGetValue(dataTypeId, out dataTypeDescriptor);

            if (dataTypeDescriptor != null) return dataTypeDescriptor;

#warning MRJ: Move this code!
            /////


            if (allowDataTypeCreation == false) return null;


            foreach (Assembly assembly in AssemblyFacade.GetAssembliesFromBin())
            {
                foreach (Type type in assembly.GetTypes())
                {
                    if (type.GetInterfaces().Contains(typeof(IData)))
                    {
                        ImmutableTypeIdAttribute attribute = type.GetCustomAttributes(false).OfType<ImmutableTypeIdAttribute>().SingleOrDefault();
                        if ((attribute == null) || (attribute.ImmutableTypeId != dataTypeId)) continue;

                        DataTypeDescriptor newDataTypeDescriptor = ReflectionBasedDescriptorBuilder.Build(type);
                        PersistMetaData(newDataTypeDescriptor);

                        return newDataTypeDescriptor;
                    }
                }
            }

            /////

            Log.LogError("DataMetaDataFacade", string.Format("No data type found with the given data type id '{0}'", dataTypeId));

            return null;
        }



        /// <exclude />
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



        /// <exclude />
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

            Guid result;
            string guidStr = tmp.Substring(index + 1);

            if (!Guid.TryParse(guidStr, out result))
            {
                throw new InvalidOperationException("Failed to extract ID from file '{0}'".FormatWith(filepath));
            }

            return result;
        }


        internal static Dictionary<string, Guid> GetTypeManagerTypeNameToTypeIdMap()
        {
            string metaDataFolderPath = PathUtil.Resolve(GlobalSettingsFacade.DataMetaDataDirectory);

            List<string> filepaths = C1Directory.GetFiles(metaDataFolderPath, "*.xml").ToList();

            var result = new Dictionary<string, Guid>();

            foreach (string filepath in filepaths)
            {
                try
                {
                    XDocument doc = XDocument.Load(filepath);

                    XAttribute dataTypeIdAttr = doc.Root.Attribute("dataTypeId");
                    XAttribute typeManagerTypeNameAttr = doc.Root.Attribute("typeManagerTypeName");

                    if (dataTypeIdAttr == null || typeManagerTypeNameAttr == null) continue;

                    string typeManagerTypeName = typeManagerTypeNameAttr.Value;
                    Guid dataTypeId = new Guid(dataTypeIdAttr.Value);

                    const string redundantSuffix = ",Composite.Generated";
                    if (typeManagerTypeName.EndsWith(redundantSuffix, StringComparison.OrdinalIgnoreCase))
                    {
                        typeManagerTypeName = typeManagerTypeName.Substring(0, typeManagerTypeName.Length - redundantSuffix.Length);
                    }

                    if (!result.ContainsKey(typeManagerTypeName))
                    {
                        result.Add(typeManagerTypeName, dataTypeId);
                    }

                    if(!typeManagerTypeName.Contains(",") && !typeManagerTypeName.StartsWith("DynamicType:"))
                    {
                        string fixedTypeManagerTypeName = "DynamicType:" + typeManagerTypeName;

                        if (!result.ContainsKey(fixedTypeManagerTypeName))
                        {
                            result.Add(fixedTypeManagerTypeName, dataTypeId);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Log.LogWarning("DataMetaDataFacade", "Error while parsing meta data file '{0}'".FormatWith(filepath));
                    Log.LogWarning("DataMetaDataFacade", ex);
                    continue;
                }
            }

            return result;
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
