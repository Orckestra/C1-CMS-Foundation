using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Extensions;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
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
        public bool TryGetDataTypeDescriptor(Guid immutableTypeId, out DataTypeDescriptor dataTypeDescriptor)
        {
            dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(immutableTypeId);

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
        public void CreateStores(string providerName, IReadOnlyCollection<DataTypeDescriptor> typeDescriptors, bool doFlush)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(typeDescriptors, "typeDescriptors");

            typeDescriptors.ForEach(d => d.Validate());

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                foreach (var typeDescriptor in typeDescriptors)
                {
                    DataMetaDataFacade.PersistMetaData(typeDescriptor);
                }

                DataProviderPluginFacade.CreateStores(providerName, typeDescriptors);

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

            using (var transactionScope = TransactionsFacade.CreateNewScope())
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
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(cultureInfo, nameof(cultureInfo));

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataProviderPluginFacade.AddLocale(providerName, cultureInfo);
                transactionScope.Complete();
            }

            if (!SystemSetupFacade.SetupIsRunning)
            {
                CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
            }
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
