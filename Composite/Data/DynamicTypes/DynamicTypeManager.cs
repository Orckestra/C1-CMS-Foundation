using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Instrumentation;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// This class is used for handling DataTypeDescriptors for all C1 data types. 
    /// Building new from reflection and getting already stored.
    /// 
    /// This class is also used for handling stores for a given data type. 
    /// Including creating/altering/dropping and locales. So through this class
    /// you can create/alter/drop stores in a specific data provider for a given
    /// data type.
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class DynamicTypeManager
    {
        private static IDynamicTypeManager _dynamicTypeManager = new DynamicTypeManagerImpl();

        /// <exclude />
        public static IDynamicTypeManager Implementation { get { return _dynamicTypeManager; } set { _dynamicTypeManager = value; } }



        /// <exclude />
        public static DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript)
        {
            return _dynamicTypeManager.BuildNewDataTypeDescriptor(typeToDescript);
        }



        // Overload
        /// <exclude />
        public static DataTypeDescriptor GetDataTypeDescriptor(Type typeToDescript)
        {
            DataTypeDescriptor dataTypeDescriptor;

            if (!TryGetDataTypeDescriptor(typeToDescript.GetImmutableTypeId(), out dataTypeDescriptor))
            {
                dataTypeDescriptor = BuildNewDataTypeDescriptor(typeToDescript);
            }

            return dataTypeDescriptor;
        }



        // Overload
        /// <exclude />
        public static DataTypeDescriptor GetDataTypeDescriptor(Guid immutableTypeId)
        {
            DataTypeDescriptor dataTypeDescriptor;
            TryGetDataTypeDescriptor(immutableTypeId, out dataTypeDescriptor);

            return dataTypeDescriptor;
        }



        // Overload
        /// <exclude />
        public static bool TryGetDataTypeDescriptor(Type interfaceType, out DataTypeDescriptor dataTypeDescriptor)
        {
            return _dynamicTypeManager.TryGetDataTypeDescriptor(interfaceType.GetImmutableTypeId(), out dataTypeDescriptor);
        }



        /// <exclude />
        public static bool TryGetDataTypeDescriptor(Guid immutableTypeId, out DataTypeDescriptor dataTypeDescriptor)
        {
            return _dynamicTypeManager.TryGetDataTypeDescriptor(immutableTypeId, out dataTypeDescriptor);
        }



        // Overload
        /// <exclude />
        public static void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor)
        {
            UpdateDataTypeDescriptor(dataTypeDescriptor, true);
        }



        /// <exclude />
        public static void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem)
        {
            _dynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, flushTheSystem);
        }



        // Overload
        /// <exclude />
        public static void CreateStore(DataTypeDescriptor typeDescriptor)
        {
            CreateStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptor, true);
        }



        // Overload
        /// <exclude />
        public static void CreateStore(DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            CreateStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptor, doFlush);
        }


        /// <exclude />
        public static void CreateStores(IReadOnlyCollection<DataTypeDescriptor> typeDescriptors, bool doFlush)
        {
            CreateStores(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptors, doFlush);
        }


        // Overload
        /// <exclude />
        public static void CreateStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            CreateStore(providerName, typeDescriptor, true);
        }



        /// <exclude />
        public static void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            _dynamicTypeManager.CreateStores(providerName, new[] { typeDescriptor }, doFlush);
        }

        /// <exclude />
        public static void CreateStores(string providerName, IReadOnlyCollection<DataTypeDescriptor> typeDescriptors, bool doFlush)
        {
            _dynamicTypeManager.CreateStores(providerName, typeDescriptors, doFlush);
        }



        // Overload
        /// <exclude />
        public static void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            AlterStore(updateDataTypeDescriptor, false);
        }        



        /// <exclude />
        public static void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceRecompile)
        {
            _dynamicTypeManager.AlterStore(updateDataTypeDescriptor, forceRecompile);
        }



        // Overload
        /// <exclude />
        public static void DropStore(DataTypeDescriptor typeDescriptor)
        {
            DropStore(null, typeDescriptor, true);
        }



        // Overload
        /// <exclude />
        public static void DropStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            DropStore(providerName, typeDescriptor, true);
        }



        internal static void DropStore(string providerName, DataTypeDescriptor typeDescriptor, bool makeAFlush)
        {
            if (providerName == null)
            {
                providerName = DataProviderRegistry.DefaultDynamicTypeDataProviderName;
            }

            _dynamicTypeManager.DropStore(providerName, typeDescriptor, makeAFlush);

            var interfaceType = typeDescriptor.GetInterfaceType();
            if (interfaceType != null)
            {
                DataProviderRegistry.UnregisterDataType(interfaceType, providerName);
            }
        }



        // Overload
        /// <exclude />
        public static void AddLocale(CultureInfo cultureInfo)
        {
            AddLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo);
        }
       


        /// <exclude />
        public static void AddLocale(string providerName, CultureInfo cultureInfo)
        {
            _dynamicTypeManager.AddLocale(providerName, cultureInfo);
        }



        // Overload
        /// <exclude />
        public static void RemoveLocale(CultureInfo cultureInfo)
        {
            RemoveLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo);
        }
       


        /// <exclude />
        public static void RemoveLocale(string providerName, CultureInfo cultureInfo)
        {
            _dynamicTypeManager.RemoveLocale(providerName, cultureInfo);
        }



        /// <summary>
        /// For internal use only!!!
        /// This method will create the store if the interfaceType has not been configured.
        /// </summary>
        /// <param name="interfaceType"></param>
        // Helper
        public static void EnsureCreateStore(Type interfaceType)
        {
            EnsureCreateStore(interfaceType, null);
        }



        /// <summary>
        /// For internal use only!!!
        /// This method will create the store if the interfaceType has not been configured.
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="providerName"></param>
        // Helper
        public static void EnsureCreateStore(Type interfaceType, string providerName)
        {
            IEnumerable<string> dynamicProviderNames;

            if (providerName == null)
            {
                // Checking if any of existing dynamic data providers already has a store for the specified interface type
                providerName = DataProviderRegistry.DefaultDynamicTypeDataProviderName;
                dynamicProviderNames = DataProviderRegistry.DynamicDataProviderNames;
            }
            else
            {
                dynamicProviderNames = new[] {providerName};
            }

            if (dynamicProviderNames
                .Select(DataProviderPluginFacade.GetDataProvider)
                .Cast<IDynamicDataProvider>()
                .Any(dynamicDataProvider => dynamicDataProvider.GetKnownInterfaces().Contains(interfaceType)))
            {
                return;
            }

            var dataTypeDescriptor = BuildNewDataTypeDescriptor(interfaceType);

            CreateStore(providerName, dataTypeDescriptor, true);
            CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
        }
        


        // Helper
        internal static bool IsEnsureUpdateStoreNeeded(Type interfaceType)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                DataTypeDescriptor newDataTypeDescriptor;
                if (!TryGetDataTypeDescriptor(interfaceType, out newDataTypeDescriptor))
                {
                    newDataTypeDescriptor = BuildNewDataTypeDescriptor(interfaceType);
                }

                var oldDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(newDataTypeDescriptor.DataTypeId);

                if (oldDataTypeDescriptor == null)
                {
                    DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);

                    return false;
                }

                var dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor);

                if (!dataTypeChangeDescriptor.AlteredTypeHasChanges)
                {
                    return false;
                }

                return dataTypeChangeDescriptor.AlteredTypeHasChanges;
            }
        }



        // Helper
        internal static bool EnsureUpdateStore(Type interfaceType, string providerName, bool makeAFlush)
        {
            using (TimerProfilerFacade.CreateTimerProfiler(interfaceType.ToString()))
            {
                var newDataTypeDescriptor = BuildNewDataTypeDescriptor(interfaceType);

                var oldDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(newDataTypeDescriptor.DataTypeId);

                if (interfaceType.IsGenerated())
                {
                    var customFields = oldDataTypeDescriptor.Fields.Where(f => !f.Inherited &&
                                                                               !oldDataTypeDescriptor.KeyPropertyNames
                                                                                   .Contains(f.Name));
                    foreach (var field in customFields)
                    {
                        newDataTypeDescriptor.Fields.Remove(newDataTypeDescriptor.Fields[field.Name]);
                        newDataTypeDescriptor.Fields.Add(field);
                    }
                }

                if (oldDataTypeDescriptor == null)
                {
                    DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);
                    return false;
                }

                var dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor);

                if (!dataTypeChangeDescriptor.AlteredTypeHasChanges) return false;

                Log.LogVerbose("DynamicTypeManager",
                    "Updating the store for interface type '{0}' on the '{1}' data provider", interfaceType,
                    providerName);

                var updateDataTypeDescriptor = new UpdateDataTypeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor,
                    providerName);

                AlterStore(updateDataTypeDescriptor, makeAFlush);

                return true;
            }
        }
    }
}
