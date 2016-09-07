using System;
using System.Collections.Concurrent;
using System.Reflection;


namespace Composite.Data
{
    internal class DataIdKeyFacadeImpl : IDataIdKeyFacade
    {
        private ConcurrentDictionary<Type, string> _defaultKeyNameCache = new ConcurrentDictionary<Type, string>();
        private ConcurrentDictionary<Type, PropertyInfo> _keyPropertyInfoCache = new ConcurrentDictionary<Type, PropertyInfo>();



        public object GetKeyValue(IDataId dataId, string keyName)
        {
            if (keyName == null)
            {
                keyName = this.GetDefaultKeyName(dataId.GetType());
                if (keyName == null) throw new InvalidOperationException("Could not find default key for the type: " + dataId.GetType());
            }


            Func<Type, PropertyInfo> valueFactory = f => f.GetProperty(keyName);

            PropertyInfo keyPropertyInfo = _keyPropertyInfoCache.GetOrAdd(dataId.GetType(), valueFactory);

            object keyValue = keyPropertyInfo.GetValue(dataId, null);

            return keyValue;
        }



        public string GetDefaultKeyName(Type dataIdType)
        {
            Func<Type, string> valueFactory = f =>
            {
                PropertyInfo[] propertyInfoes = f.GetProperties();

                if (propertyInfoes.Length != 1) return null;

                return propertyInfoes[0].Name;
            };

            string defaultKeyName = _defaultKeyNameCache.GetOrAdd(dataIdType, valueFactory);

            return defaultKeyName;
        }



        public void OnFlush()
        {
            _defaultKeyNameCache = new ConcurrentDictionary<Type, string>();
            _keyPropertyInfoCache = new ConcurrentDictionary<Type, PropertyInfo>();
        }
    }
}
