using System;
using System.Linq;
using System.Transactions;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.GeneratedTypes.Foundation;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Instrumentation;
using Composite.Linq;
using Composite.Logging;
using Composite.Transactions;
using Composite.Types;


namespace Composite.Data.GeneratedTypes
{
    internal sealed class GeneratedTypesFacadeImpl : IGeneratedTypesFacade
    {
        public void GenerateNewType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");
            
            UpdateWithNewMetaDataForeignKeySystem(dataTypeDescriptor);
            UpdateWithNewPageFolderForeignKeySystem(dataTypeDescriptor, false);

            Type type = InterfaceCodeGenerator.CreateType(dataTypeDescriptor);

            dataTypeDescriptor.TypeManagerTypeName = TypeManager.SerializeType(type);
            dataTypeDescriptor.Version = 1;

            DynamicTypeManager.CreateStore(providerName, dataTypeDescriptor, makeAFlush);
        }



        public void DeleteType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");

            Guid immutableTypeId = dataTypeDescriptor.GetInterfaceType().GetImmutableTypeId();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {                
                DynamicTypeManager.DropStore(providerName, dataTypeDescriptor, makeAFlush);

                transactionScope.Complete();
            }

            BuildManager.RemoveCompiledType(immutableTypeId);
        }



        public bool CanDeleteType(DataTypeDescriptor dataTypeDescriptor, out string errorMessage)
        {
            Guid typeId = dataTypeDescriptor.DataTypeId;

            CompatibilityCheckResult compatibilityCheckResult = BuildManager.CheckIfAppCodeDependsOnInterface(typeId);

            if (!compatibilityCheckResult.Successful)
            {
                errorMessage = "Cannot delete the type since it will cause a build error for App_Code files. " + compatibilityCheckResult.ErrorMessage;

                return false;
            }
            errorMessage = string.Empty;
            return true;
        }



        public void UpdateType(string providerName, DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(oldDataTypeDescriptor, "oldDataTypeDescriptor");
            Verify.ArgumentNotNull(newDataTypeDescriptor, "newDataTypeDescriptor");

            newDataTypeDescriptor.Version = oldDataTypeDescriptor.Version + 1;

            BuildManager.RemoveCompiledType(oldDataTypeDescriptor.DataTypeId);

            Type type = InterfaceCodeGenerator.CreateType(newDataTypeDescriptor);

            newDataTypeDescriptor.TypeManagerTypeName = TypeManager.SerializeType(type);

            DataTypeChangeDescriptor dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor, originalTypeHasData);

            DynamicTypeManager.AlterStore(providerName, dataTypeChangeDescriptor);

            if (newDataTypeDescriptor.IsCodeGenerated == true)
            {
                // Re create Composite.Genereted.dll to ensure that App_Code, compiled assemblies that is referring the 
                // the genereted type is referring the newst version - the newest version might only be in a temp assembly at this point
                LoggingService.LogVerbose("GeneratedTypesFacade", "Recreating Composite.Genereted.dll");
                Composite.Types.BuildManager.CreateCompositeGeneretedAssembly();
            }
        }



        public void GenerateTypes()
        {
            if (!DataProviderPluginFacade.HasConfiguration())
            {
                LoggingService.LogError("GeneratedTypesFacade", "Failed to load the configuration section '{0}' from the configuration".FormatWith(DataProviderSettings.SectionName));
                return;
            }
            
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                var dataTypeDescriptors = DataMetaDataFacade.GeneratedTypeDataTypeDescriptors.Evaluate();
                foreach (DataTypeDescriptor dataTypeDescriptor in dataTypeDescriptors)
                {
                    UpdateWithNewMetaDataForeignKeySystem(dataTypeDescriptor);
                    UpdateWithNewPageFolderForeignKeySystem(dataTypeDescriptor, true);

                    Type type = InterfaceCodeGenerator.CreateType(dataTypeDescriptor);

                    LoggingService.LogVerbose("GeneratedTypesFacade", "Type generated: {0}, serialized: {1}".FormatWith(type.FullName, TypeManager.SerializeType(type)));
                }
            }
        }


        /// <summary>
        /// This method will remove a foreign key (if any exists) that is no longer possible with the
        /// new meta data system (IPageMetaDataDefinition)
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        private void UpdateWithNewPageFolderForeignKeySystem(DataTypeDescriptor dataTypeDescriptor, bool dataStoreExists)
        {            
            if (dataTypeDescriptor.IsPageFolderDataType == false)
            {
                return;
            }

            DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields["IAggregationDescriptionIdForeignKey"];
            if (dataFieldDescriptor == null)
            {
                return;
            }

            LoggingService.LogVerbose("GeneratedTypesFacade", string.Format("Removing the property {0} on the type {1}.{2}", dataFieldDescriptor.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));

            if(!dataStoreExists)
            {
                dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);
                DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);
                return;
            }

            DataTypeDescriptor oldDataTypeDescriptor = dataTypeDescriptor.Clone();
            dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);

            var dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, dataTypeDescriptor);

            DynamicTypeManager.AlterStore(dataTypeChangeDescriptor, false);
        }



        /// <summary>
        /// This method will remove a foreign key (if any exists) that is no longer possible with the
        /// new meta data system (IPageMetaDataDefinition)
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        private void UpdateWithNewMetaDataForeignKeySystem(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor.IsPageMetaDataType == true)
            {
                DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields[PageMetaDataFacade.MetaDataType_MetaDataDefinitionFieldName];
                if ((dataFieldDescriptor != null) && (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)) // This should never fail, but want to be sure
                {
                    dataFieldDescriptor.ForeignKeyReferenceTypeName = null;
                    
                    DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);

                    LoggingService.LogVerbose("GeneratedTypesFacade", string.Format("Removing foreign on the property {0} on the type {1}.{2}", dataFieldDescriptor.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));
                }
            }
        }
    }
}
