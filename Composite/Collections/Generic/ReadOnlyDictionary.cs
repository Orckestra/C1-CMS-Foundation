using System;
using System.Collections;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
    public sealed class ReadOnlyDictionary<TKey, TValue> : IDictionary<TKey, TValue>
    {
        Dictionary<TKey, TValue> _dictionary;

        public ReadOnlyDictionary(Dictionary<TKey, TValue> dictionary)
        {
            if (dictionary == null) throw new ArgumentNullException("dictionary");

            _dictionary = dictionary;
        }

        public void Add(TKey key, TValue value)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
        }

        public bool ContainsKey(TKey key)
        {
            return _dictionary.ContainsKey(key);
        }

        public ICollection<TKey> Keys
        {
            get { return _dictionary.Keys; }
        }

        public bool Remove(TKey key)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
        }

        public bool TryGetValue(TKey key, out TValue value)
        {
            return _dictionary.TryGetValue(key, out value);
        }

        public ICollection<TValue> Values
        {
            get { return _dictionary.Values; }
        }

        public TValue this[TKey key]
        {
            get
            {
                return _dictionary[key];
            }
            set
            {
                throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
            }
        }

        public void Add(KeyValuePair<TKey, TValue> item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
        }

        public void Clear()
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
        }

        public bool Contains(KeyValuePair<TKey, TValue> item)
        {
            return ((IDictionary)_dictionary).Contains(item);
        }

        public void CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex)
        {

            ((IDictionary<TKey, TValue>)_dictionary).CopyTo(array, arrayIndex);
        }

        public int Count
        {
            get { return _dictionary.Count; }
        }

        public bool IsReadOnly
        {
            get { return true; }
        }

        public bool Remove(KeyValuePair<TKey, TValue> item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyDictionary");
        }

        public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
        {
            return _dictionary.GetEnumerator();
        }

        IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)_dictionary).GetEnumerator();
        }
    }
}
