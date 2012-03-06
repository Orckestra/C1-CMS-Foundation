using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core;
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
            if (!typesExists) throw new InvalidOperationException(string.Format("Could not find og code generated the type '{0}' or one of the needed helper types", dataTypeDescriptor.GetFullInterfaceName()));
                

            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);            

            XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(dataTypeDescriptor, dataProviderHelperType, dataIdClassType, null);

            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            AddDataTypeStore(dataTypeDescriptor, interfaceType, xmlDateTypeStore);
        }



        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            XmlDataProviderDocumentCache.ClearCache();

            DataTypeChangeDescriptor changeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            InterfaceConfigurationManipulator.Change(updateDataTypeDescriptor);
        }



        public void DropStore(DataTypeDescriptor typeDescriptor)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.Remove(_dataProviderContext.ProviderName, typeDescriptor);
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



        private void InitializeExistingStores()
        {
            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

            _xmlDataTypeStoresContainer = new XmlDataTypeStoresContainer(_dataProviderContext.ProviderName);            

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value, true);
                Type interfaceType = null;

                try
                {
                    interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                    Type dataProviderHelperType;
                    Type dataIdClassType;
                    bool typeOk = EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType);
                    if (!typeOk)
                    {
                        Log.LogError("XmlDataProvider", string.Format("The data interface type '{0}' does not exists and is not code generated. It will not be usable", dataTypeDescriptor.TypeManagerTypeName));
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
                catch(Exception ex)
                {
                    if (interfaceType != null)
                    {
                        DataProviderRegistry.AddKnownDataType(interfaceType, _dataProviderContext.ProviderName);
                    }
                    Log.LogError("XmlDataProvider", string.Format("Failed initialization for the datatype {0}", dataTypeDescriptor.TypeManagerTypeName));
                }
            }
        }



        private void AddDataTypeStore(DataTypeDescriptor dataTypeDescriptor, Type interfaceType, XmlDataTypeStore xmlDateTypeStore)
        {
            bool interfaceValidated = DataTypeValidationRegistry.IsValidate(interfaceType, dataTypeDescriptor);

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



        private bool EnsureNeededTypes(DataTypeDescriptor dataTypeDescriptor, out Type dataProviderHelperType, out Type dataIdClassType)
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

                bool isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { dataProviderHelperType, dataIdClassType });

                if (isRecompileNeeded)
                {
                    CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

                    // XmlDataProvider types                
                    XmlDataProviderCodeBuilder codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
                    codeBuilder.AddDataType(dataTypeDescriptor);


                    IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false);

                    dataProviderHelperType = types.Where(f => f.FullName == dataProviderHelperClassFullName).Single();
                    dataIdClassType = types.Where(f => f.FullName == dataIdClassFullName).Single();
                }

                return true;
            }
        }
    }    
}
