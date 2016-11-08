using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;


namespace Composite.Data
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class DataMetaDataFacade
    {
        private static readonly string LogTitle = "DataMetaDataFacade";

        private static Dictionary<Guid, DataTypeDescriptor> _dataTypeDescriptorCache;
        private static Dictionary<Guid, string> _dataTypeDescriptorFilesnamesCache;
        private static readonly object _lock = new object();

        private static readonly string _metaDataPath;



        static DataMetaDataFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());

            _metaDataPath = PathUtil.Resolve(GlobalSettingsFacade.DataMetaDataDirectory);
            if (!C1Directory.Exists(_metaDataPath))
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


                string[] filepaths = C1Directory.GetFiles(_metaDataPath, "*.xml");

                foreach (string filepath in filepaths)
                {
                    var dataTypeDescriptor = LoadFromFile(filepath);

                    Verify.That(!_dataTypeDescriptorCache.ContainsKey(dataTypeDescriptor.DataTypeId),
                        "Data type with id '{0}' is already added. File: '{1}'", dataTypeDescriptor.DataTypeId, filepath);

                    _dataTypeDescriptorCache.Add(dataTypeDescriptor.DataTypeId, dataTypeDescriptor);
                    _dataTypeDescriptorFilesnamesCache.Add(dataTypeDescriptor.DataTypeId, filepath);
                }
            }
        }


        private static DataTypeDescriptor LoadFromFile(string filePath)
        {
            XDocument doc;

            try
            {
                doc = XDocumentUtils.Load(filePath, LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);
            }
            catch (XmlException e)
            {
                throw new ConfigurationErrorsException("Error loading meta data file '{0}': {1}".FormatWith(filePath, e.Message), e, filePath, e.LineNumber);
            }

            return DataTypeDescriptor.FromXml(doc.Root);
        }

        private static void UpdateFilenames()
        {
            List<string> filepaths = C1Directory.GetFiles(_metaDataPath, "*.xml").ToList();

            var ids = new Dictionary<Guid, string>();
            foreach (string filepath in filepaths)
            {
                Guid id = GetGuidFromFilename(filepath);
                if (!ids.ContainsKey(id))
                {
                    ids.Add(id, filepath);
                }
                else // This should never happen, but is here to be robust
                {
                    if (!IsMetaDataFileName(Path.GetFileNameWithoutExtension(filepath))) // Old version of the file, delete it
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
                if (!IsMetaDataFileName(Path.GetFileNameWithoutExtension(filepath)))
                {
                    continue;
                }

                var dataTypeDescriptor = LoadFromFile(filepath);
                string newFilepath = CreateFilename(dataTypeDescriptor);

                FileUtils.RemoveReadOnly(filepath);

                Func<string, string> normalizeFileName = f => f.Replace('_', ' ').ToLowerInvariant();
                if (normalizeFileName(filepath) != normalizeFileName(newFilepath))
                {
                    C1File.Move(filepath, newFilepath);
                }
            }
        }

        private static bool IsMetaDataFileName(string fileNameWithoutExtension)
        {
            return fileNameWithoutExtension.Contains("_") || fileNameWithoutExtension.Contains(" ");
        }

        /// <exclude />
        public static IEnumerable<DataTypeDescriptor> AllDataTypeDescriptors
        {
            get
            {
                Initialize();

                return _dataTypeDescriptorCache.Values.Evaluate();
            }
        }



        /// <exclude />
        public static IEnumerable<DataTypeDescriptor> GeneratedTypeDataTypeDescriptors
        {
            get
            {
                return AllDataTypeDescriptors.Where(d => d.IsCodeGenerated);
            }
        }



        /// <summary>
        /// This method will return the data type descriptor for the given data type id.
        /// If the data type descriptor has not yet been created (file not existing) and
        /// the <paramref name="allowTypeMetaDataCreation"/> is set to true,
        /// this method will try getting it through the <see cref="Composite.Data.DynamicTypes.Foundation.ReflectionBasedDescriptorBuilder"/>
        /// that will try locating the type from the data type id using refelection
        /// going through know assemblies.
        /// </summary>
        /// <param name="dataTypeId">The id of the data type.</param>
        /// <param name="allowTypeMetaDataCreation">
        /// If this is <value>true</value> and the data type descriptor does not exists, the method will try to create it.
        /// </param>
        /// <returns></returns>
        public static DataTypeDescriptor GetDataTypeDescriptor(Guid dataTypeId, bool allowTypeMetaDataCreation = false)
        {
            Initialize();

            DataTypeDescriptor dataTypeDescriptor;

            _dataTypeDescriptorCache.TryGetValue(dataTypeId, out dataTypeDescriptor);

            if (dataTypeDescriptor != null) return dataTypeDescriptor;


            if (!allowTypeMetaDataCreation) return null;

            foreach (Assembly assembly in AssemblyFacade.GetLoadedAssembliesFromBin())
            {
                if (!AssemblyFacade.AssemblyPotentiallyUsesType(assembly, typeof(IData)))
                {
                    // Ignoring assemblies that aren't referencing Composite.dll
                    continue;
                }

                Type[] types;
                try
                {
                    types = assembly.GetTypes();
                }
                catch(ReflectionTypeLoadException ex)
                {
                    Log.LogWarning($"Failed to get types from assembly '{assembly.FullName}'", ex);
                    continue;
                }

                foreach (Type type in types)
                {
                    if (type.GetInterfaces().Contains(typeof(IData)))
                    {
                        ImmutableTypeIdAttribute attribute = type.GetCustomAttributes(false).OfType<ImmutableTypeIdAttribute>().SingleOrDefault();
                        if (attribute == null || attribute.ImmutableTypeId != dataTypeId) continue;

                        DataTypeDescriptor newDataTypeDescriptor = ReflectionBasedDescriptorBuilder.Build(type);
                        PersistMetaData(newDataTypeDescriptor);

                        return newDataTypeDescriptor;
                    }
                }
            }


            Log.LogError(LogTitle, $"No data type found with the given data type id '{dataTypeId}'");

            return null;
        }


        /// <summary>
        /// This method will return the data type descriptor for the given data type id.
        /// If the data type descriptor has not yet been created (file not existing) and
        /// the <paramref name="allowTypeMetaDataCreation"/> is set to true,
        /// this method will try getting it through the <see cref="Composite.Data.DynamicTypes.Foundation.ReflectionBasedDescriptorBuilder"/>
        /// based on <paramref name="interfaceType"/>.
        /// </summary>
        /// <param name="interfaceType">The data type.</param>
        /// <param name="allowTypeMetaDataCreation">
        /// If this is true and the data type descriptor does not exists, it will be created.
        /// </param>
        /// <returns></returns>
        public static DataTypeDescriptor GetDataTypeDescriptor(Type interfaceType, bool allowTypeMetaDataCreation = false)
        {
            Verify.ArgumentNotNull(interfaceType, nameof(interfaceType));

            Initialize();

            DataTypeDescriptor dataTypeDescriptor;

            Guid dataTypeId = interfaceType.GetImmutableTypeId();

            _dataTypeDescriptorCache.TryGetValue(dataTypeId, out dataTypeDescriptor);

            if (dataTypeDescriptor != null) return dataTypeDescriptor;

            if (!allowTypeMetaDataCreation) return null;

            var newDataTypeDescriptor = ReflectionBasedDescriptorBuilder.Build(interfaceType);
            PersistMetaData(newDataTypeDescriptor);

            return newDataTypeDescriptor;
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

                if ((_dataTypeDescriptorFilesnamesCache.ContainsKey(dataTypeDescriptor.DataTypeId)) &&
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

                if (_dataTypeDescriptorFilesnamesCache.ContainsKey(dataTypeId))
                {
                    FileUtils.Delete(_dataTypeDescriptorFilesnamesCache[dataTypeId]);

                    _dataTypeDescriptorCache.Remove(dataTypeId);
                    _dataTypeDescriptorFilesnamesCache.Remove(dataTypeId);
                }
            }
        }



        private static string CreateFilename(DataTypeDescriptor dataTypeDescriptor)
        {
            return Path.Combine(_metaDataPath, string.Format("{0} {1}.xml", dataTypeDescriptor.Name, dataTypeDescriptor.DataTypeId));
        }



        private static Guid GetGuidFromFilename(string filepath)
        {
            string tmp = Path.GetFileNameWithoutExtension(filepath);
            int index = Math.Max(tmp.LastIndexOf('_'), tmp.LastIndexOf(' '));

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


        /// <summary>
        /// Used for processing xml/sql data providers configuration build by C1 vesrion older than 3.0
        /// </summary>
        internal static Dictionary<string, Guid> GetTypeManagerTypeNameToTypeIdMap()
        {
            string metaDataFolderPath = PathUtil.Resolve(GlobalSettingsFacade.DataMetaDataDirectory);

            List<string> filepaths = C1Directory.GetFiles(metaDataFolderPath, "*.xml").ToList();

            var result = new Dictionary<string, Guid>();

            foreach (string filepath in filepaths)
            {
                try
                {
                    XDocument doc = XDocumentUtils.Load(filepath);

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
                    Log.LogWarning(LogTitle, "Error while parsing meta data file '{0}'".FormatWith(filepath));
                    Log.LogWarning(LogTitle, ex);
                }
            }

            // Backward compatibility for configuraiton files. (Breaking change C1 3.2 -> C1 4.0)
            result["Composite.Data.Types.IPageTemplate,Composite"] = new Guid("7b54d7d2-6be6-48a6-9ae1-2e0373073d1d");

            return result;
        }


        private static void Flush()
        {
            _dataTypeDescriptorCache = null;
            _dataTypeDescriptorFilesnamesCache = null;
        }
    }
}
