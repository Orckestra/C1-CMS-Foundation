using System;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class DictionaryExtensionMethods
	{
        public static void AddDictionary<TKey, TValue>(this Dictionary<TKey, TValue> targetDictionary, Dictionary<TKey, TValue> sourceDictionary)
        {
            if (targetDictionary == null) throw new ArgumentNullException("targetDictionary");
            if (sourceDictionary == null) throw new ArgumentNullException("sourceDictionary");

            foreach (KeyValuePair<TKey, TValue> kvp in sourceDictionary)
            {
                targetDictionary.Add(kvp.Key, kvp.Value);
            }
        }

        public static TValue EnsureValue<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, Func<TValue> createValue)
        {
            // TODO: Syncronization logic here???
            TValue value;
            if (dictionary.TryGetValue(key, out value) == false)
            {
                value = createValue();
                dictionary.Add(key, value);
            }

            return value;
        }

        public static TValue EnsureValue<TKey, TValue>(this Hashtable<TKey, TValue> dictionary, TKey key, Func<TValue> createValue)
        {
            TValue value;
            if (!dictionary.TryGetValue(key, out value))
            {
                lock(dictionary)
                {
                    if (!dictionary.TryGetValue(key, out value))
                    {

                        value = createValue();
                        dictionary.Add(key, value);
                    }
                }
            }

            return value;
        }

	}
}
