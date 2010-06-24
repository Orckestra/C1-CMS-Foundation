using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    public sealed class SelectMethodInfoCache
    {
        private static Dictionary<CacheEntry, MethodInfo> _methodInfoCache = new Dictionary<CacheEntry, MethodInfo>();

        
        public static MethodInfo GetSelectMethod(Type sourceType, Type targetType)
        {
            CacheEntry entry = new CacheEntry(sourceType, targetType);
            
            if ( false == _methodInfoCache.ContainsKey(entry))
            {
                MethodInfo genericSelectMethod = 
                    (from method in typeof(Queryable).GetMethods(BindingFlags.Static | BindingFlags.Public)
                     where method.Name == "Select" && 
                           method.IsGenericMethod && 
                           method.GetGenericArguments().Length == 2
                     select method).First();

                MethodInfo selectMethod = genericSelectMethod.MakeGenericMethod(new Type[] { sourceType, targetType });

                _methodInfoCache.Add(entry, selectMethod);
            }

            return _methodInfoCache[entry];
        }


        private sealed class CacheEntry
        {
            private Type _sourceType;
            private Type _targetType;

            public CacheEntry(Type sourceType, Type targetType)
            {
                _sourceType = sourceType;
                _targetType = targetType;
            }

            public override bool Equals(object obj)
            {
                CacheEntry entry = obj as CacheEntry;
                
                if (null == entry) return false;

                return entry._sourceType == _sourceType && entry._targetType == _targetType;
            }

            public override int GetHashCode()
            {
                return _sourceType.GetHashCode() ^ _targetType.GetHashCode();
            }
        }
    }
}
