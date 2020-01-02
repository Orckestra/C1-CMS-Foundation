using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Data.Foundation;
using Composite.Data.Types;
using Newtonsoft.Json;


namespace Composite.Data
{
    /// <summary>
    /// Uniquely identify a data element (table record in sql speak), its type and what provider it came from.
    /// </summary>
    public sealed class DataSourceId
    {
        private string _serializedData;
        private Dictionary<string, object> _tagInformation;

        /// <summary>
        /// This is for internal use only!
        /// </summary>
        public DataSourceId(IDataId dataId, string providerName, Type interfaceType)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException(nameof(providerName));
            this.DataId = dataId ?? throw new ArgumentNullException(nameof(dataId));
            ProviderName = providerName;
            InterfaceType = interfaceType ?? throw new ArgumentNullException(nameof(interfaceType));
            DataScopeIdentifier = DataScopeManager.MapByType(interfaceType);
            LocaleScope = LocalizationScopeManager.MapByType(interfaceType);
            this.ExistsInStore = true;
        }



        /// <summary>
        /// This is for internal use only!
        /// </summary>
        public DataSourceId(IDataId dataId, string providerName, Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo localeScope)
        {
            // This constructor has to be extremely fast, we have up to 100.000 objects related while some requests
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException(nameof(providerName));
            this.DataId = dataId ?? throw new ArgumentNullException(nameof(dataId));
            ProviderName = providerName;
            InterfaceType = interfaceType ?? throw new ArgumentNullException(nameof(interfaceType));
            DataScopeIdentifier = dataScopeIdentifier ?? throw new ArgumentNullException(nameof(dataScopeIdentifier));
            LocaleScope = localeScope ?? throw new ArgumentNullException(nameof(localeScope));
            this.ExistsInStore = true;
        }

        [JsonConstructor]
        private DataSourceId(IDataId dataId, string providerName, Type interfaceType, DataScopeIdentifier dataScopeIdentifier, string localeScope)
        {
            // This constructor has to be extremely fast, we have up to 100.000 objects related while some requests
            
            this.DataId = dataId ?? throw new ArgumentNullException(nameof(dataId));
            ProviderName = providerName ?? DataProviderRegistry.DefaultDynamicTypeDataProviderName;
            InterfaceType = interfaceType ?? throw new ArgumentNullException(nameof(interfaceType));
            DataScopeIdentifier = dataScopeIdentifier ?? throw new ArgumentNullException(nameof(dataScopeIdentifier));
            LocaleScope = CultureInfo.CreateSpecificCulture(localeScope);
            this.ExistsInStore = true;
        }


        /// <summary>
        /// This is for internal use only!
        /// </summary>
        internal DataSourceId(Type interfaceType)
        {
            this.InterfaceType = interfaceType;
            this.ExistsInStore = false;
        }



        /// <summary>
        /// Object which the data provider can use to uniquely identify the 'table record' in its own store matching a data element. 
        /// </summary>
        public IDataId DataId { get; }


        /// <summary>
        /// Name of the data provider responsible for the data element.
        /// </summary>
        public string ProviderName { get; }

        /// <exclude />
        public bool ShouldSerializeProviderName()
        {
            // don't serialize ProviderName if it is default 
            return ProviderName != DataProviderRegistry.DefaultDynamicTypeDataProviderName;
        }

        /// <summary>
        /// The interface used for the data element. This is expected to be implementing IData.
        /// </summary>
        public Type InterfaceType { get; }


        /// <summary>
        /// The data scope (language and published/unpublished) from which the data element originate.
        /// </summary>
        public DataScopeIdentifier DataScopeIdentifier { get; internal set; }

        /// <summary>
        /// The publication scope (published or unpublished) from which the data element originate.
        /// </summary>
        [JsonIgnore]
        public PublicationScope PublicationScope => DataScopeIdentifier.ToPublicationScope();


        /// <summary>
        /// The language from which the data element originate.
        /// </summary>
        [JsonIgnore]
        public CultureInfo LocaleScope { get; internal set; }

        [JsonProperty(PropertyName = "localeScope")]
        private string LocalScopeName => (LocaleScope !=null ? LocaleScope.Name : null);

        /// <summary>
        /// True when the data element represents a physically stored element
        /// </summary>
        [JsonIgnore]
        public bool ExistsInStore
        {
            get;
        }

        /// <summary>
        /// Serialize to string
        /// </summary>
        /// <returns>Serialized as string</returns>
        public string Serialize()
        {
            return _serializedData ?? (_serializedData = CompositeJsonSerializer.Serialize(this));
        }


        

        /// <summary>
        /// Recreate a DataSourceId based on a serialized string representation of it.
        /// </summary>
        /// <param name="serializedDataSourceId">A serialized DataSourceId</param>
        /// <returns>The DataSourceId deserialized</returns>
        public static DataSourceId Deserialize(string serializedDataSourceId)
        {
            DataSourceId dataSourceId;

            Deserialize(serializedDataSourceId, out dataSourceId, true);

            return dataSourceId;
        }



        /// <summary>
        /// Tries to deserialize a string as a DataSourceId.
        /// </summary>
        /// <param name="serializedDataSourceId">A serialized DataSourceId</param>
        /// <param name="dataSourceId">DataSourceId reference to set, if deserialization succeeded</param>
        /// <returns>True if the deserialization succeeded, otherwise false</returns>
        public static bool TryDeserialize(string serializedDataSourceId, out DataSourceId dataSourceId)
        {
            return Deserialize(serializedDataSourceId, out dataSourceId, false);
        }



        private static bool Deserialize(string serializedDataSourceId, out DataSourceId dataSourceId, bool throwException)
        {
            if(CompositeJsonSerializer.IsJsonSerialized(serializedDataSourceId))
            {
                dataSourceId = CompositeJsonSerializer.Deserialize<DataSourceId>(serializedDataSourceId);
                return true;
            }

            return DeserializeLegacy(serializedDataSourceId, out dataSourceId, throwException);
        }

        private static bool DeserializeLegacy(string serializedDataSourceId, out DataSourceId dataSourceId, bool throwException)
        {
            dataSourceId = null;

            var dic = StringConversionServices.ParseKeyValueCollection(serializedDataSourceId);

            if (!dic.ContainsKey("_dataIdType_") ||
                !dic.ContainsKey("_dataId_") ||
                !dic.ContainsKey("_interfaceType_") ||
                !dic.ContainsKey("_dataScope_") ||
                !dic.ContainsKey("_localeScope_"))
            {
                if (throwException)
                {
                    throw new ArgumentException("The argument is not a serialized " + nameof(DataSourceId), nameof(serializedDataSourceId));
                }
                return false;
            }

            string serializedDataId = StringConversionServices.DeserializeValueString(dic["_dataId_"]);
            string dataIdTypeName = StringConversionServices.DeserializeValueString(dic["_dataIdType_"]);

            string providerName = dic.ContainsKey("_providerName_")
                ? StringConversionServices.DeserializeValueString(dic["_providerName_"])
                : DataProviderRegistry.DefaultDynamicTypeDataProviderName;

            string interfaceTypeName = StringConversionServices.DeserializeValueString(dic["_interfaceType_"]);
            string dataScope = StringConversionServices.DeserializeValueString(dic["_dataScope_"]);
            string localeScope = StringConversionServices.DeserializeValueString(dic["_localeScope_"]);

            Type interfaceType = TypeManager.TryGetType(interfaceTypeName);
            if (interfaceType == null)
            {
                if (throwException)
                {
                    throw new InvalidOperationException($"The type '{interfaceTypeName}' could not be found");
                }
                return false;
            }

            Type dataIdType = TypeManager.TryGetType(dataIdTypeName);
            if (dataIdType == null)
            {
                if (throwException)
                {
                    throw new InvalidOperationException($"The type '{dataIdTypeName}' could not be found");
                }
                return false;
            }

            serializedDataId = FixSerializedDataId(serializedDataId, interfaceType);

            IDataId dataId = SerializationFacade.Deserialize<IDataId>(dataIdType, serializedDataId);

            CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(localeScope);

            dataSourceId = new DataSourceId(dataId, providerName, interfaceType, DataScopeIdentifier.Deserialize(dataScope), cultureInfo);

            return true;
        }

        private static string FixSerializedDataId(string serializedDataId, Type interfaceType)
        {
            if (interfaceType == typeof(IPage) && !serializedDataId.Contains(nameof(IPage.VersionId)))
            {
                return serializedDataId + "," + serializedDataId.Replace(nameof(IPage.Id), nameof(IPage.VersionId));
            }

            return serializedDataId;
        }
        /// <exclude />
        public override string ToString() => Serialize();


        /// <exclude />
        public override bool Equals(object obj)
        {
            return obj is DataSourceId dataSourceId && Equals(dataSourceId);
        }



        /// <exclude />
        public bool Equals(DataSourceId dataSourceId)
        {
            return dataSourceId != null
                && dataSourceId.ProviderName == ProviderName
                && dataSourceId.DataId.Equals(DataId)
                && dataSourceId.InterfaceType == InterfaceType
                && dataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier)
                && dataSourceId.LocaleScope.Name.Equals(LocaleScope.Name);
        }



        /// <exclude />
        public override int GetHashCode()
            => DataId.GetHashCode() ^ InterfaceType.GetHashCode() ^ ProviderName.GetHashCode()
               ^ DataScopeIdentifier.GetHashCode() ^ LocaleScope.GetHashCode();



        internal void SetTag(string id, object value)
        {
            InitializeTagInformation();

            _tagInformation[id] = value;
        }



        internal void RemoveTag(string id)
        {
            if(_tagInformation == null) return;

            InitializeTagInformation();

            _tagInformation.Remove(id);
        }



        internal bool TryGetTag(string id, out object value)
        {
            if(_tagInformation == null)
            {
                value = null;
                return false;
            }

            InitializeTagInformation();

            return _tagInformation.TryGetValue(id, out value);
        }



        private void InitializeTagInformation()
        {
             if(_tagInformation == null)
             {
                 _tagInformation = new Dictionary<string, object>();
             }
        }
    }
}
