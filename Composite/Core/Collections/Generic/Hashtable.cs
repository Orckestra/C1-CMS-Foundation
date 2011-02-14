using System.Collections;
using System.Collections.Generic;


namespace Composite.Core.Collections.Generic
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class Hashtable<TKey, TValue>//: Hashtable
	{
	    private readonly Hashtable _table = new Hashtable();

        private static readonly object NullValue = new object(); // A value which represents "null" value
	    private static readonly bool IsValueType = typeof (TValue).IsValueType;


        /// <exclude />
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


        /// <exclude />
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


        /// <exclude />
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


        /// <exclude />
        public bool ContainsKey(TKey key)
        {
            return _table.ContainsKey(key);
        }


        /// <exclude />
        public void Remove(TKey key)
        {
            _table.Remove(key);
        }


        /// <exclude />
        public void Clear()
        {
            _table.Clear();
        }


        /// <exclude />
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


        /// <exclude />
        public ICollection<TValue> GetValues()
        {
            var result = new List<TValue>();

            foreach (object value in _table.Values)
            {
                result.Add((TValue)value);
            }

            return result;
        }


        /// <exclude />
	    public int Count
	    {
            get { return _table.Count; }
	    }
	}
}
