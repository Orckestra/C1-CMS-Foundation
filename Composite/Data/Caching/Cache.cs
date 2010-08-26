using System.Collections;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Configuration;


namespace Composite.Data.Caching
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Cache<K, V>: Cache where V: class
    {
        public Cache(string name)
            : base(name)
        {
        }

        public Cache(string name, int maximumSize)
            : base(name, maximumSize)
        {
        }

        public V Get(K key)
        {
            return base.Get(key) as V;
        }

        public void Remove(K key)
        {
            base.Remove(key);
        }

        public void Add(K key, V value)
        {
            base.Add(key, value);
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


    /// <summary>
    /// Represents a cache.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Cache
    {
        private static readonly int DefaultMaximumCacheSize = 1000;

        protected readonly Hashtable _table = new Hashtable();
        protected readonly object _syncRoot = new object();
        private bool _enabled = true;
        private bool _clearOnFlush = true;
        private int _maxSize;
        private int _defaultMaximumSize;


        public Cache(string name): this(name, DefaultMaximumCacheSize)
        {
        }

        public Cache(string name, int defaultMaximumSize)
        {
            Verify.ArgumentCondition(defaultMaximumSize >= 10, "maximumSize", "Maximum cache size should be at least 10 element.");
            Verify.ArgumentNotNullOrEmpty(name, "name");

            Name = name;
            _defaultMaximumSize = defaultMaximumSize;
           
            ReadConfiguration();

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnPostFlush);
        }

        public bool Enabled
        {
            get { return _enabled; }
        }

        public string Name { get; private set; }

        protected object Get(object key)
        {
            return _table[key];
        }

        protected void Add(object key, object value)
        {
            if(!_enabled)
            {
                return;
            }

            lock (_syncRoot)
            {
                if(_table.Count > _maxSize)
                {
                    _table.Clear();
                }

                if (_table.Contains(key))
                {
                    _table.Remove(key);
                }

                _table.Add(key, value);
            }
        }

        protected void Remove(object key)
        {
            if (!_enabled)
            {
                return;
            }

            if(!_table.Contains(key))
                return;

            lock(_syncRoot)
            {
                if (!_table.Contains(key))
                    return;

                _table.Remove(key);
            }
        }

        public void Clear()
        {
            lock (_syncRoot)
            {
                _table.Clear();
            }
        }

        void OnFlush(FlushEventArgs args)
        {
            if (_clearOnFlush)
            {
                Clear();
            }
        }

        void OnPostFlush(FlushEventArgs args)
        {
            ReadConfiguration();
        }

        public bool ClearOnFlush
        {
            set { _clearOnFlush = value; }
        }

        protected void ReadConfiguration()
        {
            CachingSettings cachingSettings = GlobalSettingsFacade.GetNamedCaching(this.Name);
            _enabled = cachingSettings.Enabled;
            _maxSize = cachingSettings.GetSize(_defaultMaximumSize);
        }
	}
}
