using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;
using System.IO;
using Composite.Data.Foundation;
using Composite.Core.Serialization.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal partial class XmlDataProvider
    {    
        public void CreateStore(DataTypeDescriptor dataTypeDescriptor)
        {            
            InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);

            Type dataProviderHelperType;
            Type dataIdClassType;
            EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType);

            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);            

            XmlDataTypeStore xmlDateTypeStore = xmlDataTypeStoreCreator.CreateStoreResult(dataTypeDescriptor, dataProviderHelperType, dataIdClassType, null);

            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            AddDataTypeStore(interfaceType, xmlDateTypeStore);
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


#warning MRJ: BM: Move these classes to something like XmlDataExistingStoresInitializer
        private void InitializeExistingStores()
        {
            XmlDataTypeStoreCreator xmlDataTypeStoreCreator = new XmlDataTypeStoreCreator(_fileStoreDirectory);

            _xmlDataTypeStoresContainer = new XmlDataTypeStoresContainer(_dataProviderContext.ProviderName, _fileStoreDirectory);            

            foreach (XmlProviderInterfaceConfigurationElement element in _dataTypeConfigurationElements)
            {
                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value, true);

                Type dataProviderHelperType;
                Type dataIdClassType;
                EnsureNeededTypes(dataTypeDescriptor, out dataProviderHelperType, out dataIdClassType);

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

                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                AddDataTypeStore(interfaceType, xmlDateTypeStore);
            }
        }



#warning MRJ: BM: Move these classes to something like XmlDataExistingStoresInitializer
        private void AddDataTypeStore(Type interfaceType, XmlDataTypeStore xmlDateTypeStore)
        {
            if (xmlDateTypeStore != null)
            {
                _xmlDataTypeStoresContainer.AddSupportedDataTypeStore(interfaceType, xmlDateTypeStore);
                DataProviderRegistry.AddNewDataType(interfaceType, _dataProviderContext.ProviderName);
            }
            else
            {
                _xmlDataTypeStoresContainer.AddKnownInterface(interfaceType);
            }
        }



#warning MRJ: BM: Move these classes to something like XmlDataExistingStoresInitializer
        private void EnsureNeededTypes(DataTypeDescriptor dataTypeDescriptor, out Type dataProviderHelperType, out Type dataIdClassType)
        {
            string namespaceName = NamesCreator.MakeNamespaceName(_dataProviderContext.ProviderName);

#warning MRJ: BM: Find a bette way of creating the full type name -> Use XmlDataProviderCodeBuilder
            string dataProviderHelperClassFullName = namespaceName + "." + NamesCreator.MakeDataProviderHelperClassName(dataTypeDescriptor);
            string dataIdClassFullName = namespaceName + "." + NamesCreator.MakeDataIdClassName(dataTypeDescriptor);

            // Getting the interface (ensuring that it exists)
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            

            dataProviderHelperType = TypeManager.TryGetType(dataProviderHelperClassFullName);
            dataIdClassType = TypeManager.TryGetType(dataIdClassFullName);

            bool isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new [] { dataProviderHelperType, dataIdClassType });            

            if (isRecompileNeeded)
            {
#warning MRJ: BM: Move this code?? Same as with CreateStore,... Runtime create the types needed
                CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

                // XmlDataProvider types                
                XmlDataProviderCodeBuilder codeBuilder = new XmlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
                codeBuilder.AddDataType(dataTypeDescriptor);

                //// Property serializer for entity tokens and more
                //Dictionary<string, Type> serializerProperties = dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)).ToDictionary(f => f.Name, f => f.InstanceType);
                //PropertySerializerTypeCodeGenerator.AddPropertySerializerTypeCode(codeGenerationBuilder, dataIdClassFullName, serializerProperties);

                //// Data wrapper for caching
                //DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);

                IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                dataProviderHelperType = types.Where(f => f.FullName == dataProviderHelperClassFullName).Single();
                dataIdClassType = types.Where(f => f.FullName == dataIdClassFullName).Single();
            }
        }
    }    
}
