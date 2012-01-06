using System;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Types
{
    internal sealed class CompiledTypeCache<TValue>
    {
        private readonly Hashtable<string, CacheItem> _cache = new Hashtable<string, CacheItem>();


        public void RemoveOldVersion(Type key)
        {
            string cacheKey = GetCacheKey(key);

            CacheItem cacheItem;
            if (_cache.TryGetValue(cacheKey, out cacheItem))
            {               
                _cache.Remove(cacheKey);
            }
        }



        public void Add(Type key, TValue value)
        {
            string cacheKey = GetCacheKey(key);

            CacheItem cacheItem;
            if (_cache.TryGetValue(cacheKey, out cacheItem))
            {
                if (cacheItem.Type == key) throw new ArgumentException("Adding an item with duplicate key");

                _cache[cacheKey] = new CacheItem { Type = key, Value = value };
            }
            else
            {
                _cache.Add(cacheKey, new CacheItem { Type = key, Value = value });
            }
        }



        public bool ContainsKey(Type key)
        {
            CacheItem cacheItem;
            if (_cache.TryGetValue(GetCacheKey(key), out cacheItem) == false) return false;
           
            return true;
        }

        private static string GetCacheKey(Type key)
        {
            return TypeManager.SerializeType(key) + key.Assembly.FullName;
        }


        public bool TryGetValue(Type key, out TValue value)
        {
            CacheItem cacheItem;
            if (!_cache.TryGetValue(GetCacheKey(key), out cacheItem))
            {
                value = default(TValue);
                return false;
            }
           

            value = cacheItem.Value;            

            return true;
        }



        public IEnumerable<Type> Keys
        {
            get
            {
                foreach (CacheItem item in _cache.GetValues())
                {
                    yield return item.Type;
                }
            }
        }



        public TValue this[Type key]
        {
            get
            {
                CacheItem cacheItem;
                if (_cache.TryGetValue(GetCacheKey(key), out cacheItem) == false)
                {
                    throw new ArgumentException("Key not found");
                }                

                return cacheItem.Value;
            }
            set
            {
                string cacheKey = GetCacheKey(key);

                CacheItem cacheItem;
                if (!_cache.TryGetValue(cacheKey, out cacheItem)) throw new ArgumentException("Key not found");               

                _cache[cacheKey] = new CacheItem { Type = key, Value = value };
            }
        }



        


        private sealed class CacheItem
        {
            public Type Type { get; set; }
            public TValue Value { get; set; }
        }
    }
}
