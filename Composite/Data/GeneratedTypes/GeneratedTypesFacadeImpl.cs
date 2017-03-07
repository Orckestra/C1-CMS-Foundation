using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Composite.Core;
using Composite.Data.DynamicTypes;
using Composite.Data.Transactions;
using Composite.Core.Types;


namespace Composite.Data.GeneratedTypes
{
    internal sealed class GeneratedTypesFacadeImpl : IGeneratedTypesFacade
    {
        public void GenerateNewTypes(string providerName, IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptors, bool makeAFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(dataTypeDescriptors, "dataTypeDescriptors");

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                UpdateWithNewMetaDataForeignKeySystem(dataTypeDescriptor);
                UpdateWithNewPageFolderForeignKeySystem(dataTypeDescriptor, false);
            }

            var types = DataTypeTypesManager.GetDataTypes(dataTypeDescriptors);
            
            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                dataTypeDescriptor.TypeManagerTypeName = TypeManager.SerializeType(types[dataTypeDescriptor.DataTypeId]);
            }

            DynamicTypeManager.CreateStores(providerName, dataTypeDescriptors, makeAFlush);

            if (makeAFlush && dataTypeDescriptors.Any(d => d.IsCodeGenerated))
            {
                CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
            }
        }


        public void DeleteType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {                
                DynamicTypeManager.DropStore(providerName, dataTypeDescriptor, makeAFlush);

                transactionScope.Complete();
            }

            if (makeAFlush && dataTypeDescriptor.IsCodeGenerated)
            {
                CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
            }
        }



        public bool CanDeleteType(DataTypeDescriptor dataTypeDescriptor, out string errorMessage)
        {
            CompatibilityCheckResult compatibilityCheckResult = CodeCompatibilityChecker.CheckIfAppCodeDependsOnInterface(dataTypeDescriptor);

            if (!compatibilityCheckResult.Successful)
            {
                errorMessage = "Cannot delete the type since it will cause a build error for App_Code files. " + compatibilityCheckResult.ErrorMessage;

                return false;
            }
            errorMessage = string.Empty;
            return true;
        }



        
        public void UpdateType(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            Verify.ArgumentNotNullOrEmpty(updateDataTypeDescriptor.ProviderName, "providerName");
            Verify.ArgumentNotNull(updateDataTypeDescriptor.OldDataTypeDescriptor, "oldDataTypeDescriptor");
            Verify.ArgumentNotNull(updateDataTypeDescriptor.NewDataTypeDescriptor, "newDataTypeDescriptor");

            Type interfaceType = null;
            if (updateDataTypeDescriptor.OldDataTypeDescriptor.IsCodeGenerated)
            {
                interfaceType = InterfaceCodeManager.GetType(updateDataTypeDescriptor.NewDataTypeDescriptor, true);
            }
            else
            {
                interfaceType = DataTypeTypesManager.GetDataType(updateDataTypeDescriptor.NewDataTypeDescriptor);
            }

            updateDataTypeDescriptor.NewDataTypeDescriptor.TypeManagerTypeName = TypeManager.SerializeType(interfaceType);

            DynamicTypeManager.AlterStore(updateDataTypeDescriptor, false);

            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);            
        }



        /// <summary>
        /// This method will remove a foreign key (if any exists) that is no longer possible with the
        /// new meta data system (IPageMetaDataDefinition)
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <param name="dataStoreExists"></param>
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

            Log.LogVerbose("GeneratedTypesFacade", string.Format("Removing the property {0} on the type {1}.{2}", dataFieldDescriptor.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));

            if(!dataStoreExists)
            {
                dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);
                DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);
                return;
            }

            DataTypeDescriptor oldDataTypeDescriptor = dataTypeDescriptor.Clone();
            dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);

            var dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, dataTypeDescriptor);

            var updateDataTypeDescriptor = new UpdateDataTypeDescriptor(oldDataTypeDescriptor, dataTypeDescriptor);

            DynamicTypeManager.AlterStore(updateDataTypeDescriptor, false);
        }



        /// <summary>
        /// This method will remove a foreign key (if any exists) that is no longer possible with the
        /// new meta data system (IPageMetaDataDefinition)
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        private void UpdateWithNewMetaDataForeignKeySystem(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor.IsPageMetaDataType)
            {
                var dataFieldDescriptor = dataTypeDescriptor.Fields[nameof(IPageMetaData.FieldName)];
                if (dataFieldDescriptor?.ForeignKeyReferenceTypeName != null) // This should never fail, but want to be sure
                {
                    dataFieldDescriptor.ForeignKeyReferenceTypeName = null;
                    
                    DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);

                    Log.LogVerbose("GeneratedTypesFacade", string.Format("Removing foreign on the property {0} on the type {1}.{2}", dataFieldDescriptor.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));
                }
            }
        }
    }
}
