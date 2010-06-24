using System;
using Composite.EventSystem;


namespace Composite.Data
{
    public static class DataIdKeyFacade
    {
        private static IDataIdKeyFacade _implementation = new DataIdKeyFacadeImpl();

        static DataIdKeyFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


              
        // Overload
        public static T GetKeyValue<T>(this DataSourceId dataSourceId, string keyName = null)
        {           
            return (T)_implementation.GetKeyValue(dataSourceId.DataId, keyName);
        }



        // Overload
        public static T GetKeyValue<T>(IDataId dataId, string keyName = null)
        {
            return (T)_implementation.GetKeyValue(dataId, keyName);
        }


       
        // Overload
        public static object GetKeyValue(this DataSourceId dataSourceId, string keyName = null)
        {           
            return _implementation.GetKeyValue(dataSourceId.DataId, keyName);
        }



        public static object GetKeyValue(IDataId dataId, string keyName = null)
        {
            return _implementation.GetKeyValue(dataId, keyName);
        }




        // Overload
        public static string GetDefaultKeyName(IDataId dataId)
        {
            return _implementation.GetDefaultKeyName(dataId.GetType());
        }




        public static string GetDefaultKeyName(Type dataIdType)
        {
            return _implementation.GetDefaultKeyName(dataIdType);
        }



        private static void Flush()
        {
            _implementation.OnFlush();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
