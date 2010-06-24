using System.Collections;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
	public class Hashset<T>
	{
        private readonly Hashtable _table = new Hashtable();

        public Hashset()
        {
        }

        public Hashset(IEnumerable<T> enumerable)
        {
            foreach (T element in enumerable)
	        {
	            Add(element);
	        }
        }

        public bool Contains(T key)
        {
            return _table.ContainsKey(key);
        }

        public void Add(T key)
        {
           _table.Add(key, string.Empty);
        }

        public void Remove(T key)
        {
           _table.Remove(key);
        }

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