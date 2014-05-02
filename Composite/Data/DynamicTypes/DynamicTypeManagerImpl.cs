using System;
using System.Globalization;
using System.Transactions;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.Data.Transactions;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicTypeManagerImpl : IDynamicTypeManager
    {
        /// <exclude />
        public DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript)
        {
            if (typeToDescript == null) throw new ArgumentNullException("typeToDescript");

            return ReflectionBasedDescriptorBuilder.Build(typeToDescript);
        }



        /// <exclude />
        public bool TryGetDataTypeDescriptor(Guid immuteableTypeId, out DataTypeDescriptor dataTypeDescriptor)
        {
            dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(immuteableTypeId);

            return dataTypeDescriptor != null;
        }



        /// <exclude />
        public void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem)
        {
            dataTypeDescriptor.Validate();

            DataMetaDataFacade.PersistMetaData(dataTypeDescriptor);

            if (flushTheSystem)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (typeDescriptor == null) throw new ArgumentNullException("typeDescriptor");

            typeDescriptor.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataMetaDataFacade.PersistMetaData(typeDescriptor);

                DataProviderPluginFacade.CreateStore(providerName, typeDescriptor);                                
                
                transactionScope.Complete();
            }

            if (doFlush)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceCompile)
        {
            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor(); 

            dataTypeChangeDescriptor.AlteredType.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataMetaDataFacade.PersistMetaData(dataTypeChangeDescriptor.AlteredType);

                if (dataTypeChangeDescriptor.AlteredTypeHasChanges)
                {
                    DataProviderPluginFacade.AlterStore(updateDataTypeDescriptor, forceCompile);
                }                

                transactionScope.Complete();
            }
        }



        /// <exclude />
        public void DropStore(string providerName, DataTypeDescriptor typeDescriptor, bool makeAFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(typeDescriptor, "typeDescriptor");

            typeDescriptor.Validate();

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.DropStore(providerName, typeDescriptor);
                DataMetaDataFacade.DeleteMetaData(typeDescriptor.DataTypeId);
                transactionScope.Complete();
            }

            if (makeAFlush)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void AddLocale(string providerName, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.AddLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);           
        }



        /// <exclude />
        public void RemoveLocale(string providerName, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.RemoveLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);            
        }
    }
}
