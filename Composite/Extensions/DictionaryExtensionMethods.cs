using System;
using System.Collections.Generic;


namespace Composite.Extensions
{
    internal static class DictionaryExtensionMethods
    {
        public static TValue EnsureValue<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, Func<TValue> createValue)
        {
            TValue value;
            if (dictionary.TryGetValue(key, out value) == false)
            {
                value = createValue();
                dictionary.Add(key, value);
            }

            return value;
        }
    }
}
