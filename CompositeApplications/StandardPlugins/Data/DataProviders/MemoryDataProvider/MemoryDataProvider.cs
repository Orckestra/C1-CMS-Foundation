using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.Configuration;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.CodeGeneration;
using Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider
{
    [ConfigurationElementType(typeof(MemoryDataProviderData))]
    internal sealed class MemoryDataProvider : IGeneratedTypesDataProvider
    {
        private DataProviderContext _context;
        private List<MemoryEntityData> _memoryDataEntities = new List<MemoryEntityData>();
        private bool _generatedTypesHasBeenGenerated = false;
        private object _lock = new object();

        private MemoryDatabase _database = new MemoryDatabase();


        public DataProviderContext Context
        {
            set
            {
                if(_context != null)
                {
                    return;
                }

                _context = value;
                CodeGeneratedSupportedInterfaces(false);
            }
        }



        public IEnumerable<Type> GetKnownInterfaces()
        {
            return
                from type in _memoryDataEntities
                where type.IsGenerated == false
                select type.InterfaceType;
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return
                from type in _memoryDataEntities
                where type.IsGenerated == false
                select type.InterfaceType;
        }



        public IEnumerable<Type> GetGeneratedInterfaces()
        {
            if (_generatedTypesHasBeenGenerated == false)
            {
                lock (_lock)
                {
                    if (_generatedTypesHasBeenGenerated == false)
                    {
                        CodeGeneratedSupportedInterfaces(true);

                        _generatedTypesHasBeenGenerated = true;
                    }
                }                
            }

            return
                from type in _memoryDataEntities
                where type.IsGenerated == true
                select type.InterfaceType;
        }



        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            return _database.GetData<T>();
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            return _database.GetData<T>(dataId);
        }



        public List<T> AddNew<T>(IEnumerable<T> datas) where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            List<T> newDatas = new List<T>();
            foreach (T data in datas)
            {
                if (data == null) throw new ArgumentException("datas contains nulls");

                T newData = (T)_database.AddNew(typeof(T), data, _context);

                newDatas.Add(newData);
            }

            return newDatas;
        }



        public void Update(IEnumerable<IData> datas)
        {
            if (datas == null) throw new ArgumentNullException("datas");

            foreach (IData data in datas)
            {
                if (data == null) throw new ArgumentException("datas contains nulls");

                _database.Update(data.DataSourceId.InterfaceType, data);
            }
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            if (dataSourceIds == null) throw new ArgumentNullException("dataSourceIds");

            foreach (DataSourceId dataSourceId in dataSourceIds)
            {
                if (dataSourceId == null) throw new ArgumentException("dataSourceIds contains nulls");

                _database.Delete(dataSourceId.InterfaceType, dataSourceId.DataId);
            }
        }



        public void CreateStore(DataTypeDescriptor typeDescriptor)
        {
            InterfaceConfigurationManipulator.AddNew(_context.ProviderName, typeDescriptor);
        }



        public void AlterStore(DataTypeChangeDescriptor changeDescriptor)
        {
            InterfaceConfigurationManipulator.Change(_context.ProviderName, changeDescriptor);
        }



        public void DropStore(DataTypeDescriptor typeDescriptor)
        {
            InterfaceConfigurationManipulator.Remove(_context.ProviderName, typeDescriptor);
        }



        internal void AddSupportedInterface(Type interfaceType, Dictionary<string, Type> dataIdProperties, List<string> dataScopes)
        {
            _memoryDataEntities.Add(
                new MemoryEntityData
                {
                    InterfaceType = interfaceType,
                    IsGenerated = false,
                    PropertyList = new PropertyList(interfaceType, dataIdProperties, new Dictionary<string, string>()),
                    DataScopes = dataScopes
                });
        }



        internal void AddGeneratedInterface(string interfaceType, Dictionary<string, Type> dataIdProperties, List<string> dataScopes)
        {
            _memoryDataEntities.Add(
                new MemoryEntityData
                {
                    InterfaceTypeName = interfaceType,
                    IsGenerated = true,                    
                    DataIdProperties = dataIdProperties,
                    DataScopes = dataScopes
                });
        }

        /// <summary>
        /// For unit tests only
        /// </summary>
        public void RegisterInterface(Type interfaceType)
        {
            DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            List<string> dataScopes = typeDescriptor.DataScopes.Select(scope => scope.Name).ToList();

            var dataIdProperties = new Dictionary<string, Type>();
            foreach (DataFieldDescriptor field in typeDescriptor.Fields)
            {
                if(!typeDescriptor.KeyPropertyNames.Contains(field.Name))
                {
                    continue;
                }

                dataIdProperties.Add(field.Name, field.InstanceType);
            }

            if(typeDescriptor.IsCodeGenerated)
            {
                AddGeneratedInterface(interfaceType.FullName, dataIdProperties, dataScopes);
            }
            else
            {
                AddSupportedInterface(interfaceType, dataIdProperties, dataScopes);
            }
        }


        private void CodeGeneratedSupportedInterfaces(bool addGenerated)
        {
            // TODO: Check why do we need the commented code
            string providerName = string.Format("{0}{1}", _context.ProviderName, addGenerated == false ? "Static" : "Generated");
            MemoryDataProviderCodeGenerator generator = new MemoryDataProviderCodeGenerator(providerName, _memoryDataEntities.Where(med => med.IsGenerated == addGenerated));

            generator.Generate();

            if (addGenerated == false)
            {
                foreach (MemoryEntityData memoryEntityData in _memoryDataEntities.Where(med => med.IsGenerated == false))
                {
                    _database.AddInterfaceType(memoryEntityData);
                }
            }
            else
            {
                foreach (MemoryEntityData memoryEntityData in _memoryDataEntities.Where(med => med.IsGenerated == true))
                {
                    _database.AddInterfaceType(memoryEntityData);
                }
            }
        }
    }




    internal sealed class MemoryDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            MemoryDataProviderData memoryDataProviderData = (MemoryDataProviderData)objectConfiguration;

            MemoryDataProvider memoryDataProvider = new MemoryDataProvider();

            foreach (MemoryDataProviderInterfaceTypeConfigurationElement element in memoryDataProviderData.InterfaceTypes)
            {
                if (element.IsGeneratedType == false)
                {
                    Type interfaceType = TypeManager.GetType(element.InterfaceType);

                    memoryDataProvider.AddSupportedInterface(interfaceType, element.DataIdProperties, element.Stores);
                }
                else
                {
                    memoryDataProvider.AddGeneratedInterface(element.InterfaceType, element.DataIdProperties, element.Stores);
                }
            }

            return memoryDataProvider;
        }
    }




    [Assembler(typeof(MemoryDataProviderAssembler))]
    internal sealed class MemoryDataProviderData : DataProviderData
    {
        private const string _interfaceTypesProperty = "Interfaces";
        [ConfigurationProperty(_interfaceTypesProperty)]
        public MemoryDataProviderInterfaceTypeConfigurationElementCollection InterfaceTypes
        {
            get { return (MemoryDataProviderInterfaceTypeConfigurationElementCollection)base[_interfaceTypesProperty]; }
            set { base[_interfaceTypesProperty] = value; }
        }
    }



    internal sealed class MemoryDataProviderInterfaceTypeConfigurationElement : ConfigurationElement
    {
        public List<string> Stores
        {
            get
            {
                List<string> dic = new List<string>();

                foreach (StoreConfigurationElement element in ConfigurationStores)
                {
                    dic.Add(element.DataScope);
                }

                return dic;
            }
        }



        public Dictionary<string, Type> DataIdProperties
        {
            get
            {
                Dictionary<string, Type> dic = new Dictionary<string, Type>();

                foreach (SimpleNameTypeConfigurationElement element in ConfigurationDataIdProperties)
                {
                    dic.Add(element.Name, element.Type);
                }

                return dic;
            }
        }



        private const string _interfaceTypeProperty = "interfaceType";
        [ConfigurationProperty(_interfaceTypeProperty, IsRequired = true, IsKey = true)]
        public string InterfaceType
        {
            get { return (string)base[_interfaceTypeProperty]; }
            set { base[_interfaceTypeProperty] = value; }
        }


        private const string _isGeneratedTypePropertyName = "isGeneratedType";
        [ConfigurationProperty(_isGeneratedTypePropertyName, IsRequired = true)]
        public bool IsGeneratedType
        {
            get { return (bool)base[_isGeneratedTypePropertyName]; }
            set { base[_isGeneratedTypePropertyName] = value; }
        }


        private const string _storesPropertyName = "Stores";
        [ConfigurationProperty(_storesPropertyName, IsRequired = true)]
        public StoreConfigurationElementCollection ConfigurationStores
        {
            get { return (StoreConfigurationElementCollection)base[_storesPropertyName]; }
            set { base[_storesPropertyName] = value; }
        }


        private const string _dataIdPropertiesPropertyName = "DataIdProperties";
        [ConfigurationProperty(_dataIdPropertiesPropertyName, IsRequired = true)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationDataIdProperties
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_dataIdPropertiesPropertyName]; }
            set { base[_dataIdPropertiesPropertyName] = value; }
        }

    }




    internal sealed class MemoryDataProviderInterfaceTypeConfigurationElementCollection : ConfigurationElementCollection
    {
        public void Add(MemoryDataProviderInterfaceTypeConfigurationElement element)
        {
            BaseAdd(element);
        }


        protected override ConfigurationElement CreateNewElement()
        {
            return new MemoryDataProviderInterfaceTypeConfigurationElement();
        }


        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((MemoryDataProviderInterfaceTypeConfigurationElement)element).InterfaceType;
        }


        internal bool ContainsInterfaceType(string interfaceType)
        {
            object[] allKeys = BaseGetAllKeys();
            return allKeys.Contains(interfaceType);
        }


        internal void Remove(string interfaceType)
        {
            BaseRemove(interfaceType);
        }
    }




    internal sealed class StoreConfigurationElement : ConfigurationElement
    {
        private const string _dataScopePropertyName = "dataScope";
        [ConfigurationProperty(_dataScopePropertyName, IsKey = true, IsRequired = true)]
        public string DataScope
        {
            get { return (string)base[_dataScopePropertyName]; }
            set { base[_dataScopePropertyName] = value; }
        }
    }



    internal sealed class StoreConfigurationElementCollection : ConfigurationElementCollection
    {
        public void Add(StoreConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new StoreConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((StoreConfigurationElement)element).DataScope;
        }
    }
}
