using System;
using System.Collections.Generic;
using Composite.Caching.Design;

namespace Composite.Caching
{
    internal static class CacheManager
    {
        private static readonly Dictionary<string, ICache> _cacheCollection = new Dictionary<string, ICache>();

        /// <summary>
        /// Builds a cache instance from a configuration file.
        /// </summary>
        /// <typeparam name="TKey">Key type.</typeparam>
        /// <typeparam name="TValue">Value type.</typeparam>
        /// <param name="name">The name of the cache.</param>
        public static ICache<TKey, TValue> Get<TKey, TValue>(string name) where TValue : class
        {
            throw new NotImplementedException();
        }

        public static ICache<TKey, TValue> Get<TKey, TValue>(string name, CacheSettings cacheOptions) where TValue : class
        {
            name = name ?? string.Empty;
            bool isNamed = name != string.Empty;

            lock(_cacheCollection)
            {
                if(isNamed)
                {
                    if (_cacheCollection.ContainsKey(name))
                    {
                        return (ICache<TKey, TValue>)_cacheCollection[name];
                    }
                }

                ICache<TKey, TValue> result;
                switch (cacheOptions.CacheType)
                {
                    case CacheType.Lightweight:
                        result = new LightweightCache<TKey, TValue>(name, cacheOptions);
                        break;
                    case CacheType.Mixed:
                        Verify.That(typeof(TKey) == typeof(string), "In mixed cache the key can only bee of type 'System.String'");
                        result = new MixedCache<TValue>(name, cacheOptions) as ICache<TKey, TValue>;
                        break;
                    case CacheType.Undefined:
                        throw new InvalidOperationException("Cache type is undefined");
                    default:
                        throw new NotImplementedException();
                }

                Verify.That(result != null, "Failed to create a cache");

                _cacheCollection.Add(name != string.Empty ? name : "unnamed cache", result);

                return result;
            }
        }

        public static ICache[] GetAll()
        {
            lock(_cacheCollection)
            {
                ICollection<ICache> values = _cacheCollection.Values;

                ICache[] result = new ICache[values.Count];
                values.CopyTo(result, 0);
                return result;
            }
        }
    }
}
