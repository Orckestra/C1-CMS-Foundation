using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Data.Foundation;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataSourceId
    {
        private IDataId _dataId;
        private string _providerName;
        private Type _interfaceType;
        private DataScopeIdentifier _dataScopeIdentifier;
        private CultureInfo _localeScope;
        private string _serializedData;
        private Dictionary<string, object> _tagInformation;        

        /// <summary>
        /// This is for internal use only!
        /// </summary>
        public DataSourceId(IDataId dataId, string providerName, Type interfaceType)
        {
            if (null == dataId) throw new ArgumentNullException("dataId");
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (null == interfaceType) throw new ArgumentNullException("interfaceType");


            this.DataId = dataId;
            _providerName = providerName;
            _interfaceType = interfaceType;
            _dataScopeIdentifier = DataScopeManager.MapByType(interfaceType);
            _localeScope = LocalizationScopeManager.MapByType(interfaceType);
            this.ExistsInStore = true;
        }



        /// <summary>
        /// This is for internal use only!
        /// </summary>
        public DataSourceId(IDataId dataId, string providerName, Type interfaceType, DataScopeIdentifier dataScope, CultureInfo localeScope)
        {
            // This constructor has to be extremely fast, we have up to 100.000 objects reated while some requests
            if (dataId == null) throw new ArgumentNullException("dataId");
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataScope == null) throw new ArgumentNullException("dataScope");
            if (localeScope == null) throw new ArgumentNullException("localeScope");

            this.DataId = dataId;
            _providerName = providerName;
            _interfaceType = interfaceType;
            _dataScopeIdentifier = dataScope;
            _localeScope = localeScope;
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



        /// <exclude />
        public IDataId DataId
        {
            get 
            {
                _dataId = EnsureDataIdType(_dataId);

                return _dataId; 
            }
            internal set 
            { 
                _dataId = value; 
            }
        }



        /// <exclude />
        public string ProviderName
        {
            get { return _providerName; }
            internal set { _providerName = value; }
        }



        /// <exclude />
        public Type InterfaceType
        {
            get { return _interfaceType; }
            internal set { _interfaceType = value; }
        }



        /// <exclude />
        public DataScopeIdentifier DataScopeIdentifier
        {
            get { return _dataScopeIdentifier; }
            internal set { _dataScopeIdentifier = value; }
        }



        /// <exclude />
        public PublicationScope PublicationScope
        {
            get { return _dataScopeIdentifier.Name == DataScopeIdentifier.PublicName ? Data.PublicationScope.Published : Data.PublicationScope.Unpublished; }
        }



        /// <exclude />
        public CultureInfo LocaleScope
        {
            get { return _localeScope;  }
            internal set { _localeScope = value; }
        }



        /// <exclude />
        public bool ExistsInStore
        {
            get;
            internal set;
        }



        /// <exclude />
        public string Serialize()
        {
            IDataId dataId = EnsureDataIdType(_dataId);

            if ((_serializedData == null) || (dataId != _dataId))
            {
                string s = SerializationFacade.Serialize(this.DataId);

                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                StringConversionServices.SerializeKeyValuePair(sb, "_dataId_", s);
                StringConversionServices.SerializeKeyValuePair(sb, "_dataIdType_", TypeManager.SerializeType(this.DataId.GetType()));
                
                if (_providerName != DataProviderRegistry.DefaultDynamicTypeDataProviderName)
                {
                    StringConversionServices.SerializeKeyValuePair(sb, "_providerName_", _providerName);
                }
                
                StringConversionServices.SerializeKeyValuePair(sb, "_interfaceType_", TypeManager.SerializeType(_interfaceType));
                StringConversionServices.SerializeKeyValuePair(sb, "_dataScope_", DataScopeIdentifier.Serialize());
                StringConversionServices.SerializeKeyValuePair(sb, "_localeScope_", LocaleScope.Name);

                _serializedData = sb.ToString();
            }

            return _serializedData;
        }



        /// <exclude />
        public static DataSourceId Deserialize(string serializedDataSourceId)
        {
            DataSourceId dataSourceId;

            Deserialize(serializedDataSourceId, out dataSourceId, true);

            return dataSourceId;
        }



        /// <exclude />
        public static bool TryDeserialize(string serializedDataSourceId, out DataSourceId dataSourceId)
        {
            return Deserialize(serializedDataSourceId, out dataSourceId, false);
        }



        private static bool Deserialize(string serializedDataSourceId, out DataSourceId dataSourceId, bool throwException)
        {
            dataSourceId = null;

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedDataSourceId);

            if ((dic.ContainsKey("_dataIdType_") == false) ||
                (dic.ContainsKey("_dataId_") == false) ||                
                (dic.ContainsKey("_interfaceType_") == false) ||
                (dic.ContainsKey("_dataScope_") == false) ||
                (dic.ContainsKey("_localeScope_") == false))
            {
                if (throwException == true)
                {
                    throw new ArgumentException("The serializedDataSourceId is not a serialized data source id", "serializedDataSourceId");
                }
                else
                {
                    return false;
                }
            }

            string serializedDataId = StringConversionServices.DeserializeValueString(dic["_dataId_"]);
            string dataIdType = StringConversionServices.DeserializeValueString(dic["_dataIdType_"]);

            string providerName;
            if (dic.ContainsKey("_providerName_") == true)
            {
                providerName = StringConversionServices.DeserializeValueString(dic["_providerName_"]);
            }
            else
            {
                providerName = DataProviderRegistry.DefaultDynamicTypeDataProviderName;
            }            
            
            string interfaceTypeName = StringConversionServices.DeserializeValueString(dic["_interfaceType_"]);
            string dataScope = StringConversionServices.DeserializeValueString(dic["_dataScope_"]);
            string localeScope = StringConversionServices.DeserializeValueString(dic["_localeScope_"]);

            Type type = TypeManager.TryGetType(dataIdType);
            if (type == null)
            {
                if (throwException)
                {
                    throw new InvalidOperationException(string.Format("The type {0} could not be found", dataIdType));
                }
                return false;
            }

            IDataId dataId = SerializationFacade.Deserialize<IDataId>(type, serializedDataId);

            Type interfaceType = TypeManager.TryGetType(interfaceTypeName);
            if (interfaceType == null)
            {
                if (throwException)
                {
                    throw new InvalidOperationException(string.Format("The type {0} could not be found", interfaceType));
                }
                return false;
            }

            CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(localeScope);

            dataSourceId = new DataSourceId(dataId, providerName, interfaceType, DataScopeIdentifier.Deserialize(dataScope), cultureInfo);

            return true;
        }



        /// <exclude />
        public override string ToString()
        {
            return Serialize();
        }



        /// <exclude />
        public bool EqualsModuloDataScope(DataSourceId dataSourceId)
        {            
            return 
                Compare.PropertyCompare(this.DataId, dataSourceId.DataId) &&
                this.ExistsInStore == dataSourceId.ExistsInStore &&
                this.InterfaceType == dataSourceId.InterfaceType &&
                this.ProviderName == dataSourceId.ProviderName;
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            if (obj == null) return false;

            DataSourceId dataSourceId = obj as DataSourceId;

            return Equals(dataSourceId);
        }



        /// <exclude />
        public bool Equals(DataSourceId dataSourceId)
        {
            if (dataSourceId == null) return false;

            return dataSourceId.ToString() == ToString();
        }



        /// <exclude />
        public override int GetHashCode()
        {
            return ToString().GetHashCode();
        }



        internal void SetTag(string id, object value)
        {
            InitializeTagInformation();

            if (_tagInformation.ContainsKey(id) == true)
            {
                _tagInformation[id] = value;
            }
            else
            {
                _tagInformation.Add(id, value);
            }
        }



        internal void RemoveTag(string id)
        {
            if(_tagInformation == null) return;

            InitializeTagInformation();

            if (_tagInformation.ContainsKey(id) == true)
            {
                _tagInformation.Remove(id);
            }
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



        private static IDataId EnsureDataIdType(IDataId dataId)
        {
            // After the new build manager this should always be the right type
            return dataId;
        }
    }
}
