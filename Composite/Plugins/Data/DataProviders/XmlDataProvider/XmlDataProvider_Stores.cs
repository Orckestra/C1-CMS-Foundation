using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal partial class XmlDataProvider
    {
        public void CreateStores(IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptors)
        {
            var dataTypes = DataTypeTypesManager.GetDataTypes(dataTypeDescriptors);

            var storesToCreate = new List<GeneratedTypesInfo>();

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                Type interfaceType = dataTypes[dataTypeDescriptor.DataTypeId];

                storesToCreate.Add(BuildGeneratedTypesInfo(dataTypeDescriptor, interfaceType));
            }

            CompileMissingTypes(storesToCreate);

            foreach (var storeToCreate in storesToCreate)
            {
                var dataTypeDescriptor = storeToCreate.DataTypeDescriptor;

                InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);

                var xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

                XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(
                    dataTypeDescriptor, 
                    storeToCreate.DataProviderHelperClass, 
                    storeToCreate.DataIdClass, null);

                Type interfaceType = storeToCreate.InterfaceType;

                AddDataTypeStore(dataTypeDescriptor, interfaceType, xmlDateTypeStore);
            }
        }


        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceCompile)
        {
            XmlDataProviderDocumentCache.ClearCache();

            XmlProviderInterfaceConfigurationElement element = InterfaceConfigurationManipulator.Change(updateDataTypeDescriptor);

            if (forceCompile)
            {
                DataTypeDescriptor dataTypeDescriptor = updateDataTypeDescriptor.NewDataTypeDescriptor;

                Type dataProviderHelperType;
                Type dataIdClassType;
                bool typesExists = EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType, true);
                Verify.That(typesExists, "Could not find or code generated the type '{0}' or one of the needed helper types", dataTypeDescriptor.GetFullInterfaceName());

                var xmlDataTypeStoreDataScopes = new List<XmlDataTypeStoreDataScope>();
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in element.ConfigurationStores)
                {
                    var xmlDataTypeStoreDataScope = new XmlDataTypeStoreDataScope
                    {
                        DataScopeName = dataScopeConfigurationElement.DataScope,
                        CultureName = dataScopeConfigurationElement.CultureName,
                        ElementName = dataScopeConfigurationElement.ElementName,
                        Filename = Path.Combine(_fileStoreDirectory, dataScopeConfigurationElement.Filename)
                    };

                    xmlDataTypeStoreDataScopes.Add(xmlDataTypeStoreDataScope);
                }

                var xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);
                
                XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(dataTypeDescriptor, dataProviderHelperType, dataIdClassType, xmlDataTypeStoreDataScopes);

                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                UpdateDataTypeStore(dataTypeDescriptor, interfaceType, xmlDateTypeStore);
            }
        }



        public void DropStore(DataTypeDescriptor typeDescriptor)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.Remove(_dataProviderContext.ProviderName, typeDescriptor);

            _dataTypeConfigurationElements = _dataTypeConfigurationElements.Where(s => s.DataTypeId != typeDescriptor.DataTypeId).Evaluate();
        }



        public void AddLocale(CultureInfo cultureInfo)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.AddLocale(_dataProviderContext.ProviderName, this.GetSupportedInterfaces(), cultureInfo);
        }



        public void RemoveLocale(CultureInfo cultureInfo)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.RemoveLocale(_dataProviderContext.ProviderName, this.GetSupportedInterfaces(), cultureInfo);
        }


        private static Exception NewConfigurationException(ConfigurationElement element, string message)
        {
            return new ConfigurationErrorsException(message, element.ElementInformation.Source, element.ElementInformation.LineNumber);
        }

        private void InitializeExistingStores()
        {
            var xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);
            _xmlDataTypeStoresContainer = new XmlDataTypeStoresContainer(_dataProviderContext.ProviderName);

            var dataTypes = LoadDataTypes(_dataTypeConfigurationElements);

            var storesToLoad = new List<GeneratedTypesInfo>();

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                var dataTypeDescriptor = GetDataTypeDescriptorNotNull(element);

                Type interfaceType = null;

                try
                {
                    interfaceType = dataTypes[dataTypeDescriptor.DataTypeId];
                    if (interfaceType == null)
                    {
                        Log.LogError(LogTitle, "The data interface type '{0}' does not exists and is not code generated. It will not be usable", dataTypeDescriptor.TypeManagerTypeName);
                        continue;
                    }

                    storesToLoad.Add(BuildGeneratedTypesInfo(dataTypeDescriptor, interfaceType, element));
                }
                catch (Exception ex)
                {
                    if (interfaceType != null)
                    {
                        DataProviderRegistry.AddKnownDataType(interfaceType, _dataProviderContext.ProviderName);
                    }
                    Log.LogError(LogTitle, "Failed initialization for the datatype {{{0}}}, {1}", dataTypeDescriptor.DataTypeId, dataTypeDescriptor.TypeManagerTypeName);
                    Log.LogError(LogTitle, ex);
                }
            }

            CompileMissingTypes(storesToLoad);

            foreach (var storeToLoad in storesToLoad)
            {
                try
                {
                    var xmlDataTypeStoreDataScopes = new List<XmlDataTypeStoreDataScope>();
                    foreach (DataScopeConfigurationElement dataScopeConfigurationElement in storeToLoad.Element.ConfigurationStores)
                    {
                        var xmlDataTypeStoreDataScope = new XmlDataTypeStoreDataScope
                        {
                            DataScopeName = dataScopeConfigurationElement.DataScope,
                            CultureName = dataScopeConfigurationElement.CultureName,
                            ElementName = dataScopeConfigurationElement.ElementName,
                            Filename = Path.Combine(_fileStoreDirectory, dataScopeConfigurationElement.Filename)
                        };

                        xmlDataTypeStoreDataScopes.Add(xmlDataTypeStoreDataScope);
                    }

                    XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(storeToLoad.DataTypeDescriptor,
                        storeToLoad.DataProviderHelperClass, storeToLoad.DataIdClass, xmlDataTypeStoreDataScopes);

                    AddDataTypeStore(storeToLoad.DataTypeDescriptor, storeToLoad.InterfaceType, xmlDateTypeStore);

                }
                catch (Exception ex)
                {
                    DataProviderRegistry.AddKnownDataType(storeToLoad.InterfaceType, _dataProviderContext.ProviderName);

                    Log.LogError(LogTitle, "Failed initialization for the datatype {{{0}}}, {1}", storeToLoad.DataTypeDescriptor.DataTypeId, storeToLoad.DataTypeDescriptor.TypeManagerTypeName);
                    Log.LogError(LogTitle, ex);
                }
            }
        }


        /// <summary>
        /// Loads all the data types referenced in the provider's configuration file.
        /// </summary>
        private static Dictionary<Guid, Type> LoadDataTypes(IEnumerable<XmlProviderInterfaceConfigurationElement> configurationElements)
        {
            var dataTypeDescriptors = new List<DataTypeDescriptor>();

            foreach (XmlProviderInterfaceConfigurationElement element in configurationElements)
            {
                var dataTypeDescriptor = GetDataTypeDescriptorNotNull(element);

                dataTypeDescriptors.Add(dataTypeDescriptor);
            }

            return DataTypeTypesManager.GetDataTypes(dataTypeDescriptors);
        }


        private static DataTypeDescriptor GetDataTypeDescriptorNotNull(XmlProviderInterfaceConfigurationElement element)
        {
            Guid dataTypeId = element.DataTypeId;

            var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
            if (dataTypeDescriptor == null)
            {
                throw NewConfigurationException(element, "Failed to get a DataTypeDescriptor by id '{0}'".FormatWith(dataTypeId));
            }

            return dataTypeDescriptor;
        }

        private void AddDataTypeStore(DataTypeDescriptor dataTypeDescriptor, Type interfaceType, XmlDataTypeStore xmlDateTypeStore)
        {
            bool interfaceValidated = DataTypeValidationRegistry.Validate(interfaceType, dataTypeDescriptor);

            if (xmlDateTypeStore != null && interfaceValidated)
            {
                _xmlDataTypeStoresContainer.AddSupportedDataTypeStore(interfaceType, xmlDateTypeStore);
                DataProviderRegistry.AddNewDataType(interfaceType, _dataProviderContext.ProviderName);
            }
            else
            {
                _xmlDataTypeStoresContainer.AddKnownInterface(interfaceType);
            }
        }



        private void UpdateDataTypeStore(DataTypeDescriptor dataTypeDescriptor, Type interfaceType, XmlDataTypeStore xmlDateTypeStore)
        {
            _xmlDataTypeStoresContainer.UpdateSupportedDataTypeStore(interfaceType, xmlDateTypeStore);
        }



        private bool EnsureNeededTypes(DataTypeDescriptor dataTypeDescriptor, out Type dataProviderHelperType, out Type dataIdClassType, bool forceCompile = false)
        {
            lock (_lock)
            {
                // Getting the interface (ensuring that it exists)
                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
                if (interfaceType == null)
                {
                    dataProviderHelperType = null;
                    dataIdClassType = null;
                    return false;
                }

                string dataProviderHelperClassFullName, dataIdClassFullName;

                GetGeneratedClassNames(dataTypeDescriptor, out dataProviderHelperClassFullName, out dataIdClassFullName);

                dataProviderHelperType = TypeManager.TryGetType(dataProviderHelperClassFullName);
                dataIdClassType = TypeManager.TryGetType(dataIdClassFullName);

                if (!forceCompile)
                {
                    forceCompile = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { dataProviderHelperType, dataIdClassType });
                }

                if (forceCompile)
                {
                    var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

                    // XmlDataProvider types                
                    var codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
                    codeBuilder.AddDataType(dataTypeDescriptor);

                    DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);

                    IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false);

                    dataProviderHelperType = types.Single(f => f.FullName == dataProviderHelperClassFullName);
                    dataIdClassType = types.Single(f => f.FullName == dataIdClassFullName);
                }

                return true;
            }
        }

        private void GetGeneratedClassNames(DataTypeDescriptor dataTypeDescriptor, out string dataProviderHelperClassFullName, out string dataIdClassFullName)
        {
            string namespaceName = NamesCreator.MakeNamespaceName(_dataProviderContext.ProviderName);

            dataProviderHelperClassFullName = namespaceName + "." + NamesCreator.MakeDataProviderHelperClassName(dataTypeDescriptor);
            dataIdClassFullName = namespaceName + "." + NamesCreator.MakeDataIdClassName(dataTypeDescriptor);
        }

        /// <summary>
        /// Builds a <see cref="GeneratedTypesInfo"/> object that describes information about helper types generation
        /// </summary>
        private GeneratedTypesInfo BuildGeneratedTypesInfo(DataTypeDescriptor dataTypeDescriptor, Type interfaceType, XmlProviderInterfaceConfigurationElement element = null)
        {
            string dataProviderHelperClassFullName, dataIdClassFullName;

            GetGeneratedClassNames(dataTypeDescriptor, out dataProviderHelperClassFullName, out dataIdClassFullName);

            Type dataProviderHelperClass = TypeManager.TryGetType(dataProviderHelperClassFullName);
            Type dataIdClass = TypeManager.TryGetType(dataIdClassFullName);

            bool compilationNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { dataProviderHelperClass, dataIdClass });

            return new GeneratedTypesInfo
            {
                Element = element,
                DataTypeDescriptor = dataTypeDescriptor,
                InterfaceType = interfaceType,
                DataIdClass = dataIdClass,
                DataIdClassName = dataIdClassFullName,
                DataProviderHelperClass = dataProviderHelperClass,
                DataProviderHelperClassName = dataProviderHelperClassFullName,
                CompilationNeeded = compilationNeeded
            };
        }

        private void CompileMissingTypes(IList<GeneratedTypesInfo> typesInfo)
        {
            // Compiling missing classes
            if (typesInfo.Any(s => s.CompilationNeeded))
            {
                var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":DataId and helper classes");
                var codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);

                foreach (var storeToLoad in typesInfo.Where(s => s.CompilationNeeded))
                {
                    codeBuilder.AddDataType(storeToLoad.DataTypeDescriptor);

                    // Compiling some other classes for optimization
                    DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, storeToLoad.DataTypeDescriptor);
                    EmptyDataClassCodeGenerator.AddEmptyDataClassTypeCode(codeGenerationBuilder, storeToLoad.DataTypeDescriptor);
                }

                var types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false).ToDictionary(type => type.FullName);

                foreach (var storeToLoad in typesInfo.Where(s => s.CompilationNeeded))
                {
                    storeToLoad.DataIdClass = types[storeToLoad.DataIdClassName];
                    storeToLoad.DataProviderHelperClass = types[storeToLoad.DataProviderHelperClassName];
                }
            }
        }
        
        private class GeneratedTypesInfo
        {
            public XmlProviderInterfaceConfigurationElement Element;
            public DataTypeDescriptor DataTypeDescriptor;
            public Type InterfaceType;
            public Type DataProviderHelperClass;
            public Type DataIdClass;

            public string DataProviderHelperClassName;
            public string DataIdClassName;

            public bool CompilationNeeded;
        }
    }
}
