using System;
using System.Globalization;
using System.Transactions;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.EventSystem;
using Composite.Transactions;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicTypeManagerImpl : IDynamicTypeManager
    {
        public DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript)
        {
            if (typeToDescript == null) throw new ArgumentNullException("typeToDescript");

            return ReflectionBasedDescriptorBuilder.Build(typeToDescript);
        }



        public bool TryGetDataTypeDescriptor(Guid immuteableTypeId, out DataTypeDescriptor dataTypeDescriptor)
        {
            dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(immuteableTypeId);

            return dataTypeDescriptor != null;
        }



        public void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem)
        {
            dataTypeDescriptor.Validate();

            DataMetaDataFacade.PersistMetaData(dataTypeDescriptor);

            if (flushTheSystem == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }
       


        public void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (typeDescriptor == null) throw new ArgumentNullException("typeDescriptor");

            typeDescriptor.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.CreateStore(providerName, typeDescriptor);
                
                DataMetaDataFacade.PersistMetaData(typeDescriptor);
                
                transactionScope.Complete();
            }

            if (doFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        public void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor, bool makeAFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (changeDescriptor == null) throw new ArgumentNullException("changeDescriptor");

            changeDescriptor.AlteredType.Validate();

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (changeDescriptor.AlteredTypeHasChanges == true)
                {
                    DataProviderPluginFacade.AlterStore(providerName, changeDescriptor);
                }

                DataMetaDataFacade.PersistMetaData(changeDescriptor.AlteredType);

                transactionScope.Complete();
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



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



        public void AddLocale(string providerName, CultureInfo cultureInfo, bool makeAFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.AddLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }



        public void RemoveLocale(string providerName, CultureInfo cultureInfo, bool makeAFlush)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.RemoveLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            if (makeAFlush == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }
        }
    }
}
