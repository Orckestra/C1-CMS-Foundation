using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.C1Console.Events;


namespace Composite.Data.Foundation
{
    /// <summary>
    /// This should only be used intern in the Composite.Data namespace!
    /// </summary>
    internal sealed class DataProviderRegistry
    {
        private static IDataProviderRegistry _dataProviderRegistry = new DataProviderRegistryImpl();



        static DataProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        internal static IDataProviderRegistry Implementation { get { return _dataProviderRegistry; } set { _dataProviderRegistry = value; } }



        public static string DefaultDynamicTypeDataProviderName
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.DefaultDynamicTypeDataProviderName;
                }
            }
        }



        public static IEnumerable<Type> AllInterfaces
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.AllInterfaces;
                }
            }
        }



        /// <summary>
        /// This will include currently non-supported interfaces.
        /// That is, interfaces that exists, but for some reason
        /// does nok work as a data type.
        /// </summary>
        public static IEnumerable<Type> AllKnownInterfaces
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.AllKnownInterfaces;
                }
            }
        }



        public static IEnumerable<Type> GeneratedInterfaces
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.GeneratedInterfaces;
                }
            }
        }



        public static IEnumerable<string> DataProviderNames
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.DataProviderNames;
                }
            }
        }



        public static IEnumerable<string> DynamicDataProviderNames
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _dataProviderRegistry.DynamicDataProviderNames;
                }
            }
        }


        public static List<string> GetDataProviderNamesByInterfaceType(Type interfaceType)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                return _dataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType);
            }
        }



        public static List<string> GetWriteableDataProviderNamesByInterfaceType(Type interfaceType)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                return _dataProviderRegistry.GetWriteableDataProviderNamesByInterfaceType(interfaceType);
            }
        }


        /// <summary>
        /// This method adds a new supported data type to the regitry.
        /// This should be used if a data provider has extended the
        /// number of supported interfaces at runtime.
        /// </summary>
        /// <param name="interaceType"></param>
        /// <param name="providerName"></param>
        /// <param name="isWritableProvider"></param>
        public static void AddNewDataType(Type interaceType, string providerName, bool isWritableProvider = true)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _dataProviderRegistry.AddNewDataType(interaceType, providerName);
            }
        }



        internal static void InitializeDataTypes()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _dataProviderRegistry.InitializeDataTypes();
        }



        private static void Flush()
        {
            _dataProviderRegistry.Flush();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
