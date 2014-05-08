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
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal partial class XmlDataProvider
    {
        public void CreateStore(DataTypeDescriptor dataTypeDescriptor)
        {
            InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);

            Type dataProviderHelperType;
            Type dataIdClassType;
            bool typesExists = EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType);
            if (!typesExists) throw new InvalidOperationException(string.Format("Could not find or code generated the type '{0}' or one of the needed helper types", dataTypeDescriptor.GetFullInterfaceName()));


            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

            XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(dataTypeDescriptor, dataProviderHelperType, dataIdClassType, null);

            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            AddDataTypeStore(dataTypeDescriptor, interfaceType, xmlDateTypeStore);
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
                if (!typesExists) throw new InvalidOperationException(string.Format("Could not find or code generated the type '{0}' or one of the needed helper types", dataTypeDescriptor.GetFullInterfaceName()));

                List<XmlDataTypeStoreDataScope> xmlDataTypeStoreDataScopes = new List<XmlDataTypeStoreDataScope>();
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in element.ConfigurationStores)
                {
                    XmlDataTypeStoreDataScope xmlDataTypeStoreDataScope = new XmlDataTypeStoreDataScope()
                    {
                        DataScopeName = dataScopeConfigurationElement.DataScope,
                        CultureName = dataScopeConfigurationElement.CultureName,
                        ElementName = dataScopeConfigurationElement.ElementName,
                        Filename = Path.Combine(_fileStoreDirectory, dataScopeConfigurationElement.Filename)
                    };

                    xmlDataTypeStoreDataScopes.Add(xmlDataTypeStoreDataScope);
                }

                XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

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
            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

            _xmlDataTypeStoresContainer = new XmlDataTypeStoresContainer(_dataProviderContext.ProviderName);

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                if (!element.DataTypeId.HasValue)
                {
                    throw NewConfigurationException(element, "Missing 'dataTypeId' attribute");
                }

                Guid dataTypeId = element.DataTypeId.Value;

                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
                if (dataTypeDescriptor == null)
                {
                    throw NewConfigurationException(element, "Failed to get a DataTypeDescriptor by id '{0}'".FormatWith(dataTypeId));
                }

                Type interfaceType = null;

                try
                {
                    interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                    Type dataProviderHelperType;
                    Type dataIdClassType;
                    bool typeOk = EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType);
                    if (!typeOk)
                    {
                        Log.LogError(LogTitle, string.Format("The data interface type '{0}' does not exists and is not code generated. It will not be usable", dataTypeDescriptor.TypeManagerTypeName));
                        continue;
                    }

                    List<XmlDataTypeStoreDataScope> xmlDataTypeStoreDataScopes = new List<XmlDataTypeStoreDataScope>();
                    foreach (DataScopeConfigurationElement dataScopeConfigurationElement in element.ConfigurationStores)
                    {
                        XmlDataTypeStoreDataScope xmlDataTypeStoreDataScope = new XmlDataTypeStoreDataScope()
                        {
                            DataScopeName = dataScopeConfigurationElement.DataScope,
                            CultureName = dataScopeConfigurationElement.CultureName,
                            ElementName = dataScopeConfigurationElement.ElementName,
                            Filename = Path.Combine(_fileStoreDirectory, dataScopeConfigurationElement.Filename)
                        };

                        xmlDataTypeStoreDataScopes.Add(xmlDataTypeStoreDataScope);
                    }

                    XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(dataTypeDescriptor, dataProviderHelperType, dataIdClassType, xmlDataTypeStoreDataScopes);

                    AddDataTypeStore(dataTypeDescriptor, interfaceType, xmlDateTypeStore);
                }
                catch (Exception)
                {
                    if (interfaceType != null)
                    {
                        DataProviderRegistry.AddKnownDataType(interfaceType, _dataProviderContext.ProviderName);
                    }
                    Log.LogError(LogTitle, "Failed initialization for the datatype {{{0}}}, {1}", dataTypeId, dataTypeDescriptor.TypeManagerTypeName);
                }
            }
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
                string namespaceName = NamesCreator.MakeNamespaceName(_dataProviderContext.ProviderName);

                string dataProviderHelperClassFullName = namespaceName + "." + NamesCreator.MakeDataProviderHelperClassName(dataTypeDescriptor);
                string dataIdClassFullName = namespaceName + "." + NamesCreator.MakeDataIdClassName(dataTypeDescriptor);

                // Getting the interface (ensuring that it exists)
                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
                if (interfaceType == null)
                {
                    dataProviderHelperType = null;
                    dataIdClassType = null;
                    return false;
                }

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


                    IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false);

                    dataProviderHelperType = types.Single(f => f.FullName == dataProviderHelperClassFullName);
                    dataIdClassType = types.Single(f => f.FullName == dataIdClassFullName);
                }

                return true;
            }
        }
    }
}
