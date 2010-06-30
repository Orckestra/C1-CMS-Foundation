using System.Collections;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
	public class Hashtable<TKey, TValue>//: Hashtable
	{
	    private readonly Hashtable _table = new Hashtable();

        private static readonly object NullValue = new object(); // A value which represents "null" value
	    private static readonly bool IsValueType = typeof (TValue).IsValueType;

        public void Add(TKey key, TValue value) 
        {
            if (!IsValueType && (value == null))
            {
                _table.Add(key, NullValue);
            }
            else
            {
                _table.Add(key, value);
            }
        }

	    public TValue this[TKey key]
	    {
            get
            {
                object result = _table[key];
                if(result == null || result == NullValue)
                {
                    return default(TValue);
                }
                return (TValue)result;
            }
            set
            {
                _table[key] = value;
            }
	    }

        public bool TryGetValue(TKey key, out TValue value)
        {
            object result = _table[key];
            if(result == null)
            {
                value = default(TValue);
                return false;
            }

            if(result == NullValue)
            {
                value = default(TValue);
                return true;
            }

            value = (TValue)result;
            return true;
        }

        public bool ContainsKey(TKey key)
        {
            return _table.ContainsKey(key);
        }

        public void Remove(TKey key)
        {
            _table.Remove(key);
        }

        public void Clear()
        {
            _table.Clear();
        }

        public bool Any()
        {
            return _table.Count > 0;
        }

        /// <summary>
        /// Getting the case collection. This operation is not thread safe.
        /// </summary>
        /// <returns></returns>
        public ICollection<TKey> GetKeys()
        {
            var result = new List<TKey>();

            foreach(object key in _table.Keys)
            {
                result.Add((TKey)key);
            }
            return result;
        }

        public ICollection<TValue> GetValues()
        {
            var result = new List<TValue>();

            foreach (object value in _table.Values)
            {
                result.Add((TValue)value);
            }

            return result;
        }

	    public int Count
	    {
            get { return _table.Count; }
	    }
	}
}
