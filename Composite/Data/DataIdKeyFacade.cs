using System;
using Composite.C1Console.Events;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataIdKeyFacade
    {
        private static IDataIdKeyFacade _implementation = new DataIdKeyFacadeImpl();

        /// <exclude />
        static DataIdKeyFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


              
        // Overload
        /// <exclude />
        public static T GetKeyValue<T>(this DataSourceId dataSourceId, string keyName = null)
        {
            if (keyName == null)
            {
                keyName = dataSourceId.InterfaceType.GetSingleKeyProperty().Name;
            }

            return (T)_implementation.GetKeyValue(dataSourceId.DataId, keyName);
        }



        // Overload
        /// <exclude />
        public static T GetKeyValue<T>(IDataId dataId, string keyName = null)
        {
            return (T)_implementation.GetKeyValue(dataId, keyName);
        }


       
        // Overload
        /// <exclude />
        public static object GetKeyValue(this DataSourceId dataSourceId, string keyName = null)
        {
            Verify.ArgumentNotNull(dataSourceId, nameof(dataSourceId));

            if (keyName == null)
            {
                keyName = dataSourceId.InterfaceType.GetSingleKeyProperty().Name;
            }

            return _implementation.GetKeyValue(dataSourceId.DataId, keyName);
        }



        /// <exclude />
        public static object GetKeyValue(IDataId dataId, string keyName = null)
        {
            return _implementation.GetKeyValue(dataId, keyName);
        }




        // Overload
        /// <exclude />
        public static string GetDefaultKeyName(IDataId dataId)
        {
            return _implementation.GetDefaultKeyName(dataId.GetType());
        }



        /// <exclude />
        public static string GetDefaultKeyName(Type dataIdType)
        {
            return _implementation.GetDefaultKeyName(dataIdType);
        }



        private static void Flush()
        {
            _implementation.OnFlush();
        }
    }
}
