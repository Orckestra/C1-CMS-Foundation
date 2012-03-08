using System;
using System.Transactions;
using Composite.Core;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Linq;
using Composite.Data.Transactions;
using Composite.Core.Types;


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

            Type type = InterfaceCodeManager.GetType(dataTypeDescriptor);

            dataTypeDescriptor.TypeManagerTypeName = TypeManager.SerializeType(type);

            DynamicTypeManager.CreateStore(providerName, dataTypeDescriptor, makeAFlush);

            if (makeAFlush && dataTypeDescriptor.IsCodeGenerated)
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

            UpdateDataTypeDescriptor updateDataTypeDescriptor = new UpdateDataTypeDescriptor(oldDataTypeDescriptor, dataTypeDescriptor);

            DynamicTypeManager.AlterStore(updateDataTypeDescriptor, false);
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

                    Log.LogVerbose("GeneratedTypesFacade", string.Format("Removing foreign on the property {0} on the type {1}.{2}", dataFieldDescriptor.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));
                }
            }
        }
    }
}
