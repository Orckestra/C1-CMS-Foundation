using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
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


        internal delegate void DataStoreEventHandler(DataTypeDescriptor dataTypeDescriptor);
        internal delegate void DataStoreChangedEventHandler(UpdateDataTypeDescriptor updateDataTypeDescriptor);
        internal delegate void LocalizationEventHandler(CultureInfo culture);

        /// <summary>
        /// Raised after data stores are created for a data type.
        /// </summary>
        internal static event DataStoreEventHandler OnStoreCreated;

        /// <summary>
        /// Raised after a data type is removed from the system.
        /// </summary>
        internal static event DataStoreEventHandler OnStoreDropped;

        /// <summary>
        /// Raised after a data type is updated.
        /// </summary>
        internal static event DataStoreChangedEventHandler OnStoreUpdated;

        /// <summary>
        /// Raised after the data stores created for a new locale.
        /// </summary>
        internal static event LocalizationEventHandler OnLocaleAdded;
        /// <summary>
        /// Raised after the data stores related to a locale are removed.
        /// </summary>
        internal static event LocalizationEventHandler OnLocaleRemoved;


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

            OnStoreCreated?.Invoke(typeDescriptor);
        }

        /// <exclude />
        public static void CreateStores(string providerName, IReadOnlyCollection<DataTypeDescriptor> typeDescriptors, bool doFlush)
        {
            _dynamicTypeManager.CreateStores(providerName, typeDescriptors, doFlush);

            typeDescriptors.ForEach(td => OnStoreCreated?.Invoke(td));
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

            OnStoreUpdated?.Invoke(updateDataTypeDescriptor);
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

            OnStoreDropped?.Invoke(typeDescriptor);
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

            OnLocaleAdded?.Invoke(cultureInfo);
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

            OnLocaleRemoved?.Invoke(cultureInfo);
        }



        /// <summary>
        /// For internal use only!!!
        /// This method will create the store if the interfaceType has not been configured.
        /// </summary>
        /// <param name="interfaceType"></param>
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

            var possibleMatches = dynamicProviderNames
                .Select(DataProviderPluginFacade.GetDataProvider)
                .Cast<IDynamicDataProvider>()
                .SelectMany(dynamicDataProvider => dynamicDataProvider.GetKnownInterfaces())
                .Where(i => i.FullName == interfaceType.FullName);

            foreach(var match in possibleMatches)
            {
                if(match == interfaceType) return;

                if (match.GetImmutableTypeId() == interfaceType.GetImmutableTypeId())
                {
                    throw new InvalidOperationException($"The same type '{match.FullName}' is loaded in memory twice. Location 1: '{match.Assembly.Location}', location 2: {interfaceType.Assembly.Location}");
                }
            }

            var dataTypeDescriptor = BuildNewDataTypeDescriptor(interfaceType);

            CreateStore(providerName, dataTypeDescriptor, true);

            if (!SystemSetupFacade.SetupIsRunning)
            {
                CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
            }
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
                        var fieldDescriptor = newDataTypeDescriptor.Fields[field.Name];

                        if (fieldDescriptor != null)
                        {
                            newDataTypeDescriptor.Fields.Remove(fieldDescriptor);
                        }
                        else
                        {
                            Log.LogWarning(nameof(DynamicTypeManager), $"Property '{field.Name}' was missing in the generated interface type '{interfaceType.FullName}'");
                        }

                        newDataTypeDescriptor.Fields.Add(field);
                    }
                }

                if (oldDataTypeDescriptor == null)
                {
                    DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);
                    return false;
                }

                var dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor);

                if (!dataTypeChangeDescriptor.AlteredTypeHasChanges)
                {
                    if (dataTypeChangeDescriptor.TypeHasMetaDataChanges)
                    {
                        Log.LogInformation(nameof(DynamicTypeManager), $"Updating data type descriptor for type '{newDataTypeDescriptor.GetFullInterfaceName()}'");
                        DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);
                    }

                    return false;
                }

                Log.LogVerbose(nameof(DynamicTypeManager),
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
