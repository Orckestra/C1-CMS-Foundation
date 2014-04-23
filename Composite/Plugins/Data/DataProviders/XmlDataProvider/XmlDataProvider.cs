using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.Common;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;



namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{

    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    [ConfigurationElementType(typeof(XmlDataProviderData))]
    internal partial class XmlDataProvider : IWritableDataProvider, IDynamicDataProvider, IGeneratedTypesDataProvider, ILocalizedDataProvider, ISupportCachingDataProvider
    {
        private static readonly string LogTitle = typeof(XmlDataProvider).Name;

        private readonly string _fileStoreDirectory;
        private IEnumerable<XmlProviderInterfaceConfigurationElement> _dataTypeConfigurationElements;
        private XmlDataTypeStoresContainer _xmlDataTypeStoresContainer;
        private DataProviderContext _dataProviderContext;        
        private readonly object _lock = new object();


        public XmlDataProvider(string storeDirectory, IEnumerable<XmlProviderInterfaceConfigurationElement> dataTypeConfigurationElements)
        {
            if (storeDirectory == null) throw new ArgumentNullException("storeDirectory");
            if (dataTypeConfigurationElements == null) throw new ArgumentNullException("dataTypeConfigurationElements");

            _fileStoreDirectory = storeDirectory;
            _dataTypeConfigurationElements = dataTypeConfigurationElements;            
        }



        public DataProviderContext Context
        {
            set
            {
                _dataProviderContext = value;

                CodeGenerationManager.AddAssemblyCodeProvider(new XmlDataProviderCodeProvider(_dataProviderContext.ProviderName));

                InitializeExistingStores();
            }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return _xmlDataTypeStoresContainer.SupportedInterface;
        }



        public IEnumerable<Type> GetKnownInterfaces()
        {
            return _xmlDataTypeStoresContainer.KnownInterfaces;
        }


        public IEnumerable<Type> GetGeneratedInterfaces()
        {
            return _xmlDataTypeStoresContainer.GeneratedInterfaces;
        }



        public bool AllowResultsWrapping
        {
            get { return false; }
        }



        internal void BuildAllCode(CodeGenerationBuilder codeGenerationBuilder)
        {
            XmlDataProviderCodeBuilder codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                if (element.DataTypeId == null || element.DataTypeId.Value == Guid.Empty)
                {
                    continue;
                }

                Guid dataTypeId = element.DataTypeId.Value;

                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId);

                if (dataTypeDescriptor == null)
                {
                    Log.LogError(LogTitle, "Failed to find interface by id '{0}'. Skipping code generation for that type", dataTypeId);
                    continue;
                }

                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError(LogTitle, "The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor);
                    continue;
                }

                codeBuilder.AddDataType(dataTypeDescriptor);
            }
        }
    }




    internal sealed class XmlDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        private static readonly string LogTitle = typeof (XmlDataProviderAssembler).Name;

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            string pathToConfigFile = PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory);
            return Assemble(context, objectConfiguration, configurationSource, reflectionCache, pathToConfigFile);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        internal IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache, string configurationFolderPath)
        {
            XmlDataProviderData data = (XmlDataProviderData)objectConfiguration;

            C1Configuration configuration = new C1Configuration(Path.Combine(configurationFolderPath, string.Format("{0}.config", data.Name)));

            XmlDataProviderConfigurationSection section = configuration.GetSection(XmlDataProviderConfigurationSection.SectionName) as XmlDataProviderConfigurationSection;
            if (section == null)
            {
                section = new XmlDataProviderConfigurationSection();
                configuration.Sections.Add(XmlDataProviderConfigurationSection.SectionName, section);
                configuration.Save();
            }


            List<XmlProviderInterfaceConfigurationElement> dataTypeConfigurationElements = new List<XmlProviderInterfaceConfigurationElement>();

            foreach (XmlProviderInterfaceConfigurationElement interfaceElement in section.Interfaces)
            {
                dataTypeConfigurationElements.Add(interfaceElement);
            }

            ReplaceTypeNamesWithTypeIDs(dataTypeConfigurationElements);

            return new XmlDataProvider(PathUtil.Resolve(data.StoreDirectory), dataTypeConfigurationElements);
        }


        #region Build manager upgrade C1 2.0 -> 3.0

        private static void ReplaceTypeNamesWithTypeIDs(IEnumerable<XmlProviderInterfaceConfigurationElement> configurationElements)
        {
#pragma warning disable 612,618

            Dictionary<string, Guid> typeNameToTypeIdMap = null;

            foreach (var interfaceConfigurationElement in configurationElements)
            {
                string interfaceTypeName = interfaceConfigurationElement.InterfaceType;

                if (interfaceTypeName.IsNullOrEmpty())
                {
                    continue;
                }

                typeNameToTypeIdMap = typeNameToTypeIdMap ?? DataMetaDataFacade.GetTypeManagerTypeNameToTypeIdMap();

                if (!typeNameToTypeIdMap.ContainsKey(interfaceTypeName))
                {
                    Log.LogWarning(LogTitle, "Failed to find DataTypeId for interface '{0}'".FormatWith(interfaceTypeName));
                    continue;
                }

                interfaceConfigurationElement.DataTypeId = typeNameToTypeIdMap[interfaceTypeName];
                interfaceConfigurationElement.InterfaceType = null;
            }

#pragma warning restore 612,618
        }

        #endregion Build manager upgrade C1 2.0 -> 3.0
    }




    [Assembler(typeof(XmlDataProviderAssembler))]
    internal sealed class XmlDataProviderData : DataProviderData
    {
        private const string _storeDirectoryPropertyName = "storeDirectory";
        [System.Configuration.ConfigurationProperty(_storeDirectoryPropertyName, IsRequired = true)]
        public string StoreDirectory
        {
            get { return (string)base[_storeDirectoryPropertyName]; }
            set { base[_storeDirectoryPropertyName] = value; }
        }
    }



    internal sealed class XmlDataProviderConfigurationSection : System.Configuration.ConfigurationSection
    {
        public const string SectionName = "Composite.Data.Plugins.XmlDataProviderConfiguration";


        private const string _interfacesPropertyName = "Interfaces";
        [System.Configuration.ConfigurationProperty(_interfacesPropertyName)]
        public XmlProviderInterfaceConfigurationElementCollection Interfaces
        {
            get { return (XmlProviderInterfaceConfigurationElementCollection)base[_interfacesPropertyName]; }
            set { base[_interfacesPropertyName] = value; }
        }
    }




    internal sealed class XmlProviderInterfaceConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        internal void Add(XmlProviderInterfaceConfigurationElement element)
        {
            BaseAdd(element);
        }


        internal void Remove(object key)
        {
            BaseRemove(key);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new XmlProviderInterfaceConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            Guid? dataTypeId = ((XmlProviderInterfaceConfigurationElement)element).DataTypeId;

#pragma warning disable 612,618
            string interfaceTypeName = ((XmlProviderInterfaceConfigurationElement) element).InterfaceType;
#pragma warning restore 612,618

            return GetKey(dataTypeId, interfaceTypeName);
        }

        internal object GetKey(DataTypeDescriptor dataTypeDescriptor)
        {
            object[] allKeys = BaseGetAllKeys();

            return GetKeys(dataTypeDescriptor.DataTypeId, dataTypeDescriptor.TypeManagerTypeName).FirstOrDefault(key => allKeys.Contains(key));
        }

        internal XmlProviderInterfaceConfigurationElement Get(object key)
        {
            return (XmlProviderInterfaceConfigurationElement)BaseGet(key);
        }



        private static IEnumerable<string> GetKeys(Guid? dataTypeId, string typeName)
        {
            var result = new List<string>();

            if (dataTypeId != null)
            {
                result.Add(GetKey(dataTypeId, null));
            }

            if (typeName != null)
            {
                result.Add(GetKey(null, typeName));
            }

            return result;
        }

        private static string GetKey(Guid? dataTypeId, string typeName)
        {
            if (dataTypeId != null) return dataTypeId.ToString();

            Verify.IsNotNull(typeName, "Both 'interfaceType' and 'dataTypeId' attributes are empty");

            string canonicTypeName = typeName;
            if (!typeName.StartsWith("DynamicType:") && !typeName.Contains(","))
            {
                canonicTypeName = "DynamicType:" + canonicTypeName;
            }

            return canonicTypeName;
        }
    }




    internal sealed class XmlProviderInterfaceConfigurationElement : System.Configuration.ConfigurationElement
    {
        public Dictionary<string, Dictionary<string, DataScopeConfigurationElement>> DataScopes
        {
            get
            {
                var scopes = new Dictionary<string, Dictionary<string, DataScopeConfigurationElement>>();

                foreach (DataScopeConfigurationElement scopeElement in this.ConfigurationStores)
                {
                    Dictionary<string, DataScopeConfigurationElement> dic;
                    if (!scopes.TryGetValue(scopeElement.DataScope, out dic))
                    {
                        dic = new Dictionary<string, DataScopeConfigurationElement>();
                        scopes.Add(scopeElement.DataScope, dic);
                    }

                    dic.Add(scopeElement.CultureName, scopeElement);
                }

                return scopes;
            }
        }



        public Dictionary<string, Type> DataIdProperties
        {
            get
            {
                return ConfigurationDataIdProperties.ToDictionary(e => e.Name, e => e.Type);
            }
        }



        public Dictionary<string, string> PropertyNameMappings
        {
            get
            {
                return ConfigurationPropertyNameMappings.ToDictionary(e => e.PropertyName, e => e.SourcePropertyName);
            }
        }



        public Dictionary<string, Type> PropertyInitializers
        {
            get
            {
                return ConfigurationPropertyInitializers.ToDictionary(e => e.Name, e => e.Type);
            }
        }



        public void AddPropertyInitializer(string name, Type type)
        {
            ConfigurationPropertyInitializers.Add(name, type);
        }


        private const string _dataTypeIdName = "dataTypeId";
        [System.Configuration.ConfigurationProperty(_dataTypeIdName, IsRequired = false)]
        public Guid? DataTypeId
        {
            get { return (Guid?)base[_dataTypeIdName]; }
            set { base[_dataTypeIdName] = value; }
        }


        private const string _interfaceTypePropertyName = "interfaceType";
        [System.Configuration.ConfigurationProperty(_interfaceTypePropertyName, IsRequired = false)]
        [Obsolete("Attribute 'dataTypeId' should be used instead, used for upgrade procedure")]
        public string InterfaceType
        {
            get { return (string)base[_interfaceTypePropertyName]; }
            set { base[_interfaceTypePropertyName] = value; }
        }


        private const string _isGeneratedTypePropertyName = "isGeneratedType";
        [System.Configuration.ConfigurationProperty(_isGeneratedTypePropertyName, IsRequired = true)]
        public bool IsGeneratedType
        {
            get { return (bool)base[_isGeneratedTypePropertyName]; }
            set { base[_isGeneratedTypePropertyName] = value; }
        }


        private const string _storesPropertyName = "Stores";
        [System.Configuration.ConfigurationProperty(_storesPropertyName, IsRequired = false)]
        public DataScopeConfigurationElementCollection ConfigurationStores
        {
            get { return (DataScopeConfigurationElementCollection)base[_storesPropertyName]; }
            set { base[_storesPropertyName] = value; }
        }


        private const string _dataIdPropertiesPropertyName = "DataIdProperties";
        [System.Configuration.ConfigurationProperty(_dataIdPropertiesPropertyName, IsRequired = true)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationDataIdProperties
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_dataIdPropertiesPropertyName]; }
            set { base[_dataIdPropertiesPropertyName] = value; }
        }


        private const string _propertyNameMappingsPropertyName = "PropertyNameMappings";
        [System.Configuration.ConfigurationProperty(_propertyNameMappingsPropertyName)]
        public PropertyNameMappingConfigurationElementCollection ConfigurationPropertyNameMappings
        {
            get { return (PropertyNameMappingConfigurationElementCollection)base[_propertyNameMappingsPropertyName]; }
            set { base[_propertyNameMappingsPropertyName] = value; }
        }


        private const string _propertyInitializersPropertyName = "PropertyInitializers";
        [System.Configuration.ConfigurationProperty(_propertyInitializersPropertyName)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationPropertyInitializers
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_propertyInitializersPropertyName]; }
            set { base[_propertyInitializersPropertyName] = value; }
        }
    }



    internal sealed class DataScopeConfigurationElement : System.Configuration.ConfigurationElement
    {
        private const string _dataScopePropertyName = "dataScope";
        [System.Configuration.ConfigurationProperty(_dataScopePropertyName, IsRequired = true)]
        public string DataScope
        {
            get { return (string)base[_dataScopePropertyName]; }
            set { base[_dataScopePropertyName] = value; }
        }


        private const string _cultureNamePropertyName = "cultureName";
        [System.Configuration.ConfigurationProperty(_cultureNamePropertyName, IsRequired = false, DefaultValue = "")]
        public string CultureName
        {
            get { return (string)base[_cultureNamePropertyName]; }
            set { base[_cultureNamePropertyName] = value; }
        }


        private const string _filenamePropertyName = "filename";
        [System.Configuration.ConfigurationProperty(_filenamePropertyName, IsRequired = true)]
        public string Filename
        {
            get { return (string)base[_filenamePropertyName]; }
            set { base[_filenamePropertyName] = value; }
        }


        private const string _elementNamePropertyName = "elementName";
        [System.Configuration.ConfigurationProperty(_elementNamePropertyName, IsRequired = true)]
        public string ElementName
        {
            get { return (string)base[_elementNamePropertyName]; }
            set { base[_elementNamePropertyName] = value; }
        }
    }




    internal sealed class DataScopeConfigurationElementCollection : System.Configuration.ConfigurationElementCollection, IEnumerable<DataScopeConfigurationElement>
    {
        internal void Add(DataScopeConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new DataScopeConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            DataScopeConfigurationElement castedElement = (DataScopeConfigurationElement)element;
            return string.Format("{0}.{1}", castedElement.DataScope, castedElement.CultureName);
        }

        IEnumerator<DataScopeConfigurationElement> IEnumerable<DataScopeConfigurationElement>.GetEnumerator()
        {
            return this.OfType<DataScopeConfigurationElement>().GetEnumerator();
        }
    }
}
