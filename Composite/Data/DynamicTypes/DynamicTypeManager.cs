using System;
using System.Globalization;
using System.Linq;
using Composite.Data.Foundation;
using Composite.Instrumentation;
using Composite.Logging;
using Composite.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DynamicTypeManager
    {
        private static IDynamicTypeManager _dynamicTypeManager = new DynamicTypeManagerImpl();

        internal static IDynamicTypeManager Implementation { get { return _dynamicTypeManager; } set { _dynamicTypeManager = value; } }



        public static DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript)
        {
            return _dynamicTypeManager.BuildNewDataTypeDescriptor(typeToDescript);
        }



        // Overload
        public static DataTypeDescriptor GetDataTypeDescriptor(Type typeToDescript)
        {
            DataTypeDescriptor dataTypeDescriptor;

            if (TryGetDataTypeDescriptor(typeToDescript.GetImmutableTypeId(), out dataTypeDescriptor) == false)
            {
                dataTypeDescriptor = BuildNewDataTypeDescriptor(typeToDescript); ;
            }

            return dataTypeDescriptor;
        }



        // Overload
        public static DataTypeDescriptor GetDataTypeDescriptor(Guid immuteableTypeId)
        {
            DataTypeDescriptor dataTypeDescriptor;
            TryGetDataTypeDescriptor(immuteableTypeId, out dataTypeDescriptor);

            return dataTypeDescriptor;
        }



        // Overload
        public static bool TryGetDataTypeDescriptor(Type interfaceType, out DataTypeDescriptor dataTypeDescriptor)
        {
            return _dynamicTypeManager.TryGetDataTypeDescriptor(interfaceType.GetImmutableTypeId(), out dataTypeDescriptor);
        }



        public static bool TryGetDataTypeDescriptor(Guid immuteableTypeId, out DataTypeDescriptor dataTypeDescriptor)
        {
            return _dynamicTypeManager.TryGetDataTypeDescriptor(immuteableTypeId, out dataTypeDescriptor);
        }



        // Overload
        public static void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor)
        {
            UpdateDataTypeDescriptor(dataTypeDescriptor, true);
        }



        public static void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem)
        {
            _dynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, flushTheSystem);
        }



        // Overload
        public static void CreateStore(DataTypeDescriptor typeDescriptor)
        {
            CreateStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptor, true);
        }



        // Overload
        public static void CreateStore(DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            CreateStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, typeDescriptor, doFlush);
        }



        // Overload
        public static void CreateStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            CreateStore(providerName, typeDescriptor, true);
        }



        public static void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush)
        {
            _dynamicTypeManager.CreateStore(providerName, typeDescriptor, doFlush);
        }



        // Overload
        public static void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor)
        {
            AlterStore(providerName, changeDescriptor, true);
        }



        // Overload
        public static void AlterStore(DataTypeChangeDescriptor changeDescriptor, bool makeAFlush)
        {
            _dynamicTypeManager.AlterStore(DataProviderRegistry.DefaultDynamicTypeDataProviderName, changeDescriptor, makeAFlush);
        }



        public static void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor, bool makeAFlush)
        {
            _dynamicTypeManager.AlterStore(providerName, changeDescriptor, makeAFlush);
        }



        // Overload
        public static void DropStore(DataTypeDescriptor typeDescriptor)
        {
            DropStore(null, typeDescriptor, true);
        }



        // Overload
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
        }



        // Overload
        public static void AddLocale(CultureInfo cultureInfo)
        {
            AddLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo, true);
        }



        // Overload
        public static void AddLocale(CultureInfo cultureInfo, bool makeFlush)
        {
            AddLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo, makeFlush);
        }



        public static void AddLocale(string providerName, CultureInfo cultureInfo, bool doFlush)
        {
            _dynamicTypeManager.AddLocale(providerName, cultureInfo, doFlush);
        }



        // Overload
        public static void RemoveLocale(CultureInfo cultureInfo)
        {
            RemoveLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo, true);
        }



        // Overload
        public static void RemoveLocale(CultureInfo cultureInfo, bool makeFlush)
        {
            RemoveLocale(DataProviderRegistry.DefaultDynamicTypeDataProviderName, cultureInfo, makeFlush);
        }



        public static void RemoveLocale(string providerName, CultureInfo cultureInfo, bool doFlush)
        {
            _dynamicTypeManager.RemoveLocale(providerName, cultureInfo, doFlush);
        }



        /// <summary>
        /// This method will create the store if the interfaceType has not been configured.
        /// </summary>
        /// <param name="interfaceType"></param>
        // Helper
        public static void EnsureCreateStore(Type interfaceType)
        {
            EnsureCreateStore(interfaceType, null);
        }



        /// <summary>
        /// This method will create the store if the interfaceType has not been configured.
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="providerName"></param>
        // Helper
        public static void EnsureCreateStore(Type interfaceType, string providerName)
        {
            DataTypeDescriptor dataTypeDescriptor;
            if (TryGetDataTypeDescriptor(interfaceType, out dataTypeDescriptor) == false)
            {
                dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
            }

            DataTypeDescriptor storedDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeDescriptor.DataTypeId);

            if (storedDataTypeDescriptor == null)
            {
                if (providerName == null)
                {
                    providerName = DataProviderRegistry.DefaultDynamicTypeDataProviderName;
                }

                CreateStore(providerName, dataTypeDescriptor, true);
            }
        }
        


        // Helper
        internal static bool IsEnsureUpdateStoreNeeded(Type interfaceType)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                DataTypeDescriptor newDataTypeDescriptor;
                if (DynamicTypeManager.TryGetDataTypeDescriptor(interfaceType, out newDataTypeDescriptor) == false)
                {
                    newDataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
                }

                DataTypeDescriptor oldDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(newDataTypeDescriptor.DataTypeId);

                if (oldDataTypeDescriptor == null)
                {
                    DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);

                    return false;
                }

                DataTypeChangeDescriptor dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor);

                if (dataTypeChangeDescriptor.AlteredTypeHasChanges == false) return false;

                if (interfaceType.GetCustomInterfaceAttributes<TypeVersionAttribute>().Count() != 0)
                {
                    if (newDataTypeDescriptor.Version < oldDataTypeDescriptor.Version) return false;
                }

                return dataTypeChangeDescriptor.AlteredTypeHasChanges;
            }
        }



        // Helper
        internal static bool EnsureUpdateStore(Type interfaceType, string providerName, bool makeAFlush)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler(interfaceType.ToString()))
            {
                DataTypeDescriptor newDataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
                DataTypeDescriptor oldDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(newDataTypeDescriptor.DataTypeId);

                if (oldDataTypeDescriptor == null)
                {
                    DataMetaDataFacade.PersistMetaData(newDataTypeDescriptor);

                    return false;
                }

                DataTypeChangeDescriptor dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, newDataTypeDescriptor);                

                if (dataTypeChangeDescriptor.AlteredTypeHasChanges == false) return false;


                if (interfaceType.GetCustomInterfaceAttributes<TypeVersionAttribute>().Count() != 0)
                {
                    if (newDataTypeDescriptor.Version == oldDataTypeDescriptor.Version) throw new TypeUpdateVersionException(string.Format("Pleace pump the version number of the type '{0}' by using the '{1}' attribute", interfaceType, typeof(TypeVersionAttribute)));
                    if (newDataTypeDescriptor.Version < oldDataTypeDescriptor.Version) LoggingService.LogError("DynamicTypeManager", string.Format("The version of the type '{0}' is not up to date, pleace update your code", interfaceType));
                }

                LoggingService.LogVerbose("DynamicTypeManager", string.Format("Updating the store for interface type '{0}' on the '{1}' data provider", interfaceType, providerName));

                AlterStore(providerName, dataTypeChangeDescriptor, makeAFlush);

                return true;
            }
        }
    }
}
