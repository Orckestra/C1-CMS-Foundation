using System;
using System.Collections;
using System.Collections.Generic;

namespace Composite.Data.Caching
{
    public class WeakRefCache<K, V> : Cache where V : class
    {
        private int _counter;

        public WeakRefCache(string name)
            : base(name)
        {
        }

        public WeakRefCache(string name, int maximumSize)
            : base(name, maximumSize)
        {
        }

        public V Get(K key)
        {
            var weakReference = base.Get(key) as WeakReference;

            return (weakReference != null ? weakReference.Target : null) as V;
        }

        public void Remove(K key)
        {
            base.Remove(key);
        }

        public void Add(K key, V value)
        {
            base.Add(key, new WeakReference(value));

            // Cleaning-up "dead" references
            _counter++;
            if (_counter % 500 == 0)
            {
                foreach (K k in GetKeys())
                {
                    WeakReference weakRef = Get(k) as WeakReference;

                    if (weakRef != null && !weakRef.IsAlive)
                    {
                        Remove(k);
                    }
                }
            }
        }

        public IEnumerable<K> GetKeys()
        {
            lock(_syncRoot)
            {
                ICollection keys = _table.Keys;
                K[] result = new K[keys.Count];
                keys.CopyTo(result, 0);

                return result;
            }
        }
    }
}
