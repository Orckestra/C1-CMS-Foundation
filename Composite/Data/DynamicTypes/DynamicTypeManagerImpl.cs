using System;
using System.Globalization;
using System.Transactions;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation;
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

            if (flushTheSystem == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (typeDescriptor == null) throw new ArgumentNullException("typeDescriptor");

            typeDescriptor.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataMetaDataFacade.PersistMetaData(typeDescriptor);

                DataProviderPluginFacade.CreateStore(providerName, typeDescriptor);                                
                
                transactionScope.Complete();
            }

            if (doFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool makeAFlush)
        {
            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor(); 

            dataTypeChangeDescriptor.AlteredType.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (dataTypeChangeDescriptor.AlteredTypeHasChanges == true)
                {
                    DataProviderPluginFacade.AlterStore(updateDataTypeDescriptor);
                }

                DataMetaDataFacade.PersistMetaData(dataTypeChangeDescriptor.AlteredType);

                transactionScope.Complete();
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void DropStore(string providerName, DataTypeDescriptor typeDescriptor, bool makeAFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (typeDescriptor == null) throw new ArgumentNullException("typeDescriptor");

            typeDescriptor.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.DropStore(providerName, typeDescriptor);
                DataMetaDataFacade.DeleteMetaData(typeDescriptor.DataTypeId);
                transactionScope.Complete();
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        /// <exclude />
        public void AddLocale(string providerName, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.AddLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);           
        }



        /// <exclude />
        public void RemoveLocale(string providerName, CultureInfo cultureInfo)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.RemoveLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);            
        }
    }
}
