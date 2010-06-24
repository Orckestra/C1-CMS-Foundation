using System;
using System.Collections.Generic;
using Composite.Collections.Generic;


namespace Composite.Types
{
    public sealed class DynamicBuildManagetTypeCache<TValue>
    {
        private readonly Hashtable<string, CacheItem> _cache = new Hashtable<string, CacheItem>();


        public void RemoveOldVersion(Type key)
        {
            string cacheKey = GetCacheKey(key);

            CacheItem cacheItem;
            if (_cache.TryGetValue(cacheKey, out cacheItem))
            {
                if (cacheItem.Type != key)
                {
                    ValidateKeyVersions(cacheItem.Type, key);
                }

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

                ValidateKeyVersions(cacheItem.Type, key);

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


            if (cacheItem.Type != key)
            {
                int existingVersion, newVersion;

                ValidateKeyVersions(cacheItem.Type, key, out existingVersion, out newVersion);

                return existingVersion == newVersion;
            }
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

            if (cacheItem.Type != key)
            {
                int existingVersion, newVersion;

                ValidateKeyVersions(cacheItem.Type, key, out existingVersion, out newVersion);

                return existingVersion == newVersion;
            }

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

                if (cacheItem.Type != key)
                {
                    int existingVersion, newVersion;

                    ValidateKeyVersions(cacheItem.Type, key, out existingVersion, out newVersion);

                    if (existingVersion < newVersion) throw new ArgumentException("Key not found");
                }

                return cacheItem.Value;
            }
            set
            {
                string cacheKey = GetCacheKey(key);

                CacheItem cacheItem;
                if (!_cache.TryGetValue(cacheKey, out cacheItem)) throw new ArgumentException("Key not found");

                if (cacheItem.Type != key)
                {
                    ValidateKeyVersions(cacheItem.Type, key);
                }

                _cache[cacheKey] = new CacheItem { Type = key, Value = value };
            }
        }



        private void ValidateKeyVersions(Type existingKey, Type newKey)
        {
            int existingVersion, newVersion;

            ValidateKeyVersions(existingKey, newKey, out existingVersion, out newVersion);
        }



        private void ValidateKeyVersions(Type existingKey, Type newKey, out int existingVersion, out int newVersion)
        {
            existingVersion = BuildManager.GetAssemblyVersion(existingKey.Assembly);
            newVersion = BuildManager.GetAssemblyVersion(newKey.Assembly);

            if (existingVersion > newVersion)
            {
                throw new InvalidOperationException(string.Format("Trying to add a item with a key that is of older version than the existing key. Existing key version '{0}', new key version '{1}', existing key type '{2}', new key type '{3}'", existingVersion, newVersion, existingKey, newKey));
            }
        }



        private sealed class CacheItem
        {
            public Type Type { get; set; }
            public TValue Value { get; set; }
        }
    }
}
