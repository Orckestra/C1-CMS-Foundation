using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;


namespace Composite.Core.Extensions
{
    internal static class DictionaryExtensionMethods
    {
        public static TValue GetOrAdd<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, Func<TValue> createValue)
        {
            if (dictionary is ConcurrentDictionary<TKey, TValue>)
            {
                var concurrentDictionary = dictionary as ConcurrentDictionary<TKey, TValue>;
                return concurrentDictionary.GetOrAdd(key, k => createValue());
            }

            TValue value;
            if (dictionary.TryGetValue(key, out value))
            {
                return value;
            }

            lock (dictionary)
            {
                if (dictionary.TryGetValue(key, out value))
                {
                    return value;
                }

                value = createValue();
                dictionary.Add(key, value);
            }

            return value;
        }

        public static List<KeyValuePair<string, TValue>> SortByKeys<TValue>(this Dictionary<string, TValue> dictionary)
        {
            var result = dictionary.ToList();

            result.Sort((a, b) => string.CompareOrdinal(a.Key, b.Key));

            return result;
        }
    }
}
