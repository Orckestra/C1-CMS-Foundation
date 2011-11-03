using System;
using System.Collections.Generic;
using System.IO;
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
using Composite.Data.Foundation.PluginFacades;



namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
#warning MRJ: BM: Move this class
    internal class XmlDataProviderCodeProvider : ICodeProvider
    {
        public string ProviderName { get; private set;  }

        public XmlDataProviderCodeProvider(string providerName)
        {
            ProviderName = providerName;
        }


        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            XmlDataProvider xmlDataProvider = (XmlDataProvider)DataProviderPluginFacade.GetDataProvider(ProviderName);

            xmlDataProvider.BuildAllCode(builder);
        }
    }


    [ConfigurationElementType(typeof(XmlDataProviderData))]
    internal partial class XmlDataProvider : IWritableDataProvider, IDynamicDataProvider, IGeneratedTypesDataProvider, ILocalizedDataProvider, ISupportCachingDataProvider
    {
#warning MRJ: This is used by XmlDataProviderCodeGenerator that is current hardcoded. Find fix
        public void BuildAllCode(CodeGenerationBuilder codeGenerationBuilder)
        {
            XmlDataProviderCodeBuilder codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                if(element.DataTypeId == null || element.DataTypeId.Value == Guid.Empty)
                {
                    continue;
                }

                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value);

                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("XmlDataProvider", string.Format("The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor.BuildNewHandlerTypeName));
                    continue;
                }
                
                codeBuilder.AddDataType(dataTypeDescriptor);
            }
        }

        /////////////////// 



        private readonly string _fileStoreDirectory;

        private readonly IEnumerable<XmlProviderInterfaceConfigurationElement> _dataTypeConfigurationElements;


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











#warning MRJ: BM: Remove this code
        /*        private XmlDataTypeStoresContainer GenerateResult(IEnumerable<XmlProviderInterfaceConfigurationElement> storeElementsToGenerated, bool staticOnly)
        {
            throw  new NotImplementedException();*/
        /* XmlDataTypeStoresContainer result = new XmlDataTypeStoresContainer();

#warning MRJ: All this is very stupid done. Major refac is needed
         List<Type> interfaceTypes = new List<Type>();
         foreach (var element in _dataTypeConfigurationElements)
         {




#warning MRJ: BM: Redundant code, refac!
             DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId, true);
             string interfaceTypeName = dataTypeDescriptor.TypeManagerTypeName;
             if (interfaceTypeName.StartsWith("DynamicType:")) interfaceTypeName = interfaceTypeName.Remove(0, "DynamicType:".Length);


             string classNamePrefrix = interfaceTypeName.Replace('.', '_').Replace('+', '_');
             if (classNamePrefrix.IndexOf(",") >= 0) classNamePrefrix = classNamePrefrix.Remove(classNamePrefrix.IndexOf(","));


             string wrapperClassName = string.Format("{0}Wrapper", classNamePrefrix);
             string dataIdClassName = string.Format("{0}DataId", classNamePrefrix);
             string dataProviderHelperClassName = string.Format("{0}DataProviderHelper", classNamePrefrix);

             string namespaceName = "GeneratedTypes." + _dataProviderContext.ProviderName;

#warning MRJ: BM: Nasty hack here!
             Type interfaceType = DataTypeTypesManager.GetDataType(element.DataTypeId);



             interfaceTypes.Add(interfaceType);

#warning MRJ: BM: FIX THIS NOW! - by calling general method

             /*XmlDataTypeStore storeResult = new XmlDataTypeStore();
             storeResult.DataProviderHelperType = TypeManager.TryGetType(namespaceName + "." + dataProviderHelperClassName);
             storeResult.DataIdClassType = TypeManager.TryGetType(namespaceName + "." + dataIdClassName);

             if (storeResult.DataProviderHelperType == null || storeResult.DataIdClassType == null)
             {
#warning MRJ: BM: If the type is not there we need to make a mini compile
                 //throw new NotImplementedException();
                 continue;
             }

             storeResult.DataScopesNames = new List<string>();
             storeResult.DataScope = new Dictionary<string, Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement>>();
             foreach (DataScopeConfigurationElement storeElement in element.ConfigurationStores)
             {
                 if (!storeResult.DataScopesNames.Contains(storeElement.DataScope))
                 {
                     storeResult.DataScopesNames.Add(storeElement.DataScope);
                 }

                 string filename = PathUtil.Resolve(Path.Combine(_storeDirectory, storeElement.Filename));

                 if (C1File.Exists(filename) == false)
                 {
                     XDocument document = new XDocument();
                     document.Add(new XElement(string.Format("{0}s", storeElement.DataScope)));
                     XDocumentUtils.Save(document, filename);

                 }


                 Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement> dic;
                 if (storeResult.DataScope.TryGetValue(storeElement.DataScope, out dic) == false)
                 {
                     dic = new Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement>();
                     storeResult.DataScope.Add(storeElement.DataScope, dic);
                 }

                 dic.Add(
                     storeElement.CultureName,
                     new XmlDataTypeStore.XmlDateTypeStoreDataScopeElement { ElementName = storeElement.ElementName, Filename = filename }
                 );
             }

             result.AddStoreResult(interfaceType, storeResult);*/
        /*   }

           result.SupportedInterface = interfaceTypes;
           result.KnownInterfaces = interfaceTypes;

           return result;

           /*
           List<XmlDataProviderCodeGeneratorStore> stores = new List<XmlDataProviderCodeGeneratorStore>();

           foreach (XmlProviderInterfaceConfigurationElement element in storeElementsToGenerated)
           {
               string interfaceTypeName = element.InterfaceType;
               Type interfaceType = TypeManager.TryGetType(interfaceTypeName);

               if(interfaceType == null)
               {
                   LoggingService.LogWarning("XmlDataProvider", "Cannot load type '{0}', related data storage will not be loaded.".FormatWith(interfaceTypeName));
                   continue;
               }

               XmlDataProviderCodeGeneratorStore store = new XmlDataProviderCodeGeneratorStore
               {
                   InterfaceType = interfaceType,
                   InterfaceTypeName = element.InterfaceType,
                   DataIdProperties = element.DataIdProperties,
                   PropertyNameMapping = element.PropertyNameMappings,
                   PropertyInitializers = element.PropertyInitializers
               };

               store.DataScopes = new List<string>();
               store.Stores = new Dictionary<string, Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion>>();

               string resolvedDirectoryPath = PathUtil.Resolve(_storeDirectory);
               if (C1Directory.Exists(resolvedDirectoryPath) == false)
               {
                   C1Directory.CreateDirectory(resolvedDirectoryPath);
               }

               foreach (DataScopeConfigurationElement storeElement in element.ConfigurationStores)
               {
                   if (store.DataScopes.Contains(storeElement.DataScope) == false)
                   {
                       store.DataScopes.Add(storeElement.DataScope);
                   }

                   string filename = PathUtil.Resolve(Path.Combine(_storeDirectory, storeElement.Filename));

                   if (C1File.Exists(filename) == false)
                   {
                       XDocument document = new XDocument();
                       document.Add(new XElement(string.Format("{0}s", storeElement.DataScope)));
                       XDocumentUtils.Save(document, filename);

                   }

                   Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion> dic;
                   if (store.Stores.TryGetValue(storeElement.DataScope, out dic) == false)
                   {
                       dic = new Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion>();
                       store.Stores.Add(storeElement.DataScope, dic);
                   }

                   dic.Add(
                       storeElement.CultureName,
                       new XmlDataProviderCodeGeneratorStore.StoreInformaion { ElementName = storeElement.ElementName, Filename = filename }
                       );
               }

               stores.Add(store);
           }

           XmlDataProviderHelperGenerator generator = new XmlDataProviderHelperGenerator(_dataProviderContext.ProviderName, stores);

           XmlDataProviderCodeGeneratorResult result = generator.Generate(staticOnly);

           return result;*/
        //   }




        public bool AllowResultsWrapping
        {
            get { return false; }
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

            XmlDataProvider provider = new XmlDataProvider(PathUtil.Resolve(data.StoreDirectory), dataTypeConfigurationElements);

            return provider;
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
            Guid? key = ((XmlProviderInterfaceConfigurationElement) element).DataTypeId;

            if (key != null) return key.Value.ToString();

#pragma warning disable 612,618

            string interfaceTypeName = ((XmlProviderInterfaceConfigurationElement) element).InterfaceType;

#pragma warning restore 612,618

            Verify.IsNotNull(interfaceTypeName, "Missing attribute @dataTypeId");

            return interfaceTypeName;
        }

        internal object GetKey(Guid dataTypeId)
        {
            string dataTypeIdStr = dataTypeId.ToString();

            object[] allKeys = BaseGetAllKeys();

            foreach (string key in allKeys)
            {
                if (key == dataTypeIdStr) return key;
            }

            return null;
        }

        internal XmlProviderInterfaceConfigurationElement Get(object key)
        {
            return (XmlProviderInterfaceConfigurationElement)BaseGet(key);
        }
    }




    internal sealed class XmlProviderInterfaceConfigurationElement : System.Configuration.ConfigurationElement
    {
        public Dictionary<string, Dictionary<string, DataScopeConfigurationElement>> DataScopes
        {
            get
            {
                Dictionary<string, Dictionary<string, DataScopeConfigurationElement>> scopes = new Dictionary<string, Dictionary<string, DataScopeConfigurationElement>>();

                foreach (DataScopeConfigurationElement scopeElement in this.ConfigurationStores)
                {
                    Dictionary<string, DataScopeConfigurationElement> dic;
                    if (scopes.TryGetValue(scopeElement.DataScope, out dic) == false)
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
                Dictionary<string, Type> dic = new Dictionary<string, Type>();

                foreach (SimpleNameTypeConfigurationElement element in ConfigurationDataIdProperties)
                {
                    dic.Add(element.Name, element.Type);
                }

                return dic;
            }
        }



        public Dictionary<string, string> PropertyNameMappings
        {
            get
            {
                Dictionary<string, string> dic = new Dictionary<string, string>();

                foreach (PropertyNameMappingConfigurationElement element in ConfigurationPropertyNameMappings)
                {
                    dic.Add(element.PropertyName, element.SourcePropertyName);
                }

                return dic;
            }
        }



        public Dictionary<string, Type> PropertyInitializers
        {
            get
            {
                Dictionary<string, Type> dic = new Dictionary<string, Type>();

                foreach (SimpleNameTypeConfigurationElement element in ConfigurationPropertyInitializers)
                {
                    dic.Add(element.Name, element.Type);
                }

                return dic;
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
        [System.Configuration.ConfigurationProperty(_storesPropertyName, IsRequired = true)]
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




    internal sealed class DataScopeConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
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
    }
}
