using System.Collections;
using System.Collections.Generic;


namespace Composite.Core.Collections.Generic
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class Hashset<T>
	{
        private readonly Hashtable _table = new Hashtable();

        /// <exclude />
        public Hashset()
        {
        }

        /// <exclude />
        public Hashset(IEnumerable<T> enumerable)
        {
            foreach (T element in enumerable)
	        {
	            Add(element);
	        }
        }

        /// <exclude />
        public bool Contains(T key)
        {
            return _table.ContainsKey(key);
        }

        /// <exclude />
        public void Add(T key)
        {
           _table.Add(key, string.Empty);
        }

        /// <exclude />
        public void Remove(T key)
        {
           _table.Remove(key);
        }

        /// <exclude />
	    public ICollection<T> GetKeys()
	    {
            var result = new List<T>();

            foreach(object key in _table.Keys)
            {
                result.Add((T)key);
            }
            return result;
	    }
	}
}