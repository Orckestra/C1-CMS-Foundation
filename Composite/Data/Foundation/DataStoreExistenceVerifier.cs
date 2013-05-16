using System;
using System.Collections.Generic;
using System.Diagnostics;


namespace Composite.Data.Foundation
{
    internal static class DataStoreExistenceVerifier
    {
        private static IDataStoreExistenceVerifier _dataStoreExistenceVerifier = new DataStoreExistenceVerifierImpl();


        internal static IDataStoreExistenceVerifier Implementation { get { return _dataStoreExistenceVerifier; } set { _dataStoreExistenceVerifier = value; } }



        public static IEnumerable<Type> InterfaceTypes
        {
            get
            {
                return _dataStoreExistenceVerifier.InterfaceTypes;
            }
        }



        public static bool EnsureDataStores()
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            return _dataStoreExistenceVerifier.EnsureDataStores();
        }
    }
}
