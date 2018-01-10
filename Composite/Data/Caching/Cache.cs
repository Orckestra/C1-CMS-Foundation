using System.Collections;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Configuration;


namespace Composite.Data.Caching
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Cache<K, V>: Cache where V: class
    {
        /// <exclude />
        public Cache(string name)
            : base(name)
        {
        }

        /// <exclude />
        public Cache(string name, int maximumSize)
            : base(name, maximumSize)
        {
        }

        /// <exclude />
        public V Get(K key)
        {
            return base.Get(key) as V;
        }

        /// <exclude />
        public void Remove(K key)
        {
            base.Remove(key);
        }

        /// <exclude />
        public void Add(K key, V value)
        {
            base.Add(key, value);
        }

        /// <exclude />
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

        /// <exclude />
        protected readonly Hashtable _table = new Hashtable();

        /// <exclude />
        protected readonly object _syncRoot = new object();

        private bool _enabled = true;
        private bool _clearOnFlush = true;
        private int _maxSize;
        private readonly int _defaultMaximumSize;


        /// <exclude />
        public Cache(string name): this(name, DefaultMaximumCacheSize)
        {
        }

        /// <exclude />
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


        /// <exclude />
        public bool Enabled => _enabled;


        /// <exclude />
        public string Name { get; }


        /// <exclude />
        protected object Get(object key) => _table[key];


        /// <exclude />
        protected void Add(object key, object value)
        {
            if(!_enabled)
            {
                return;
            }

            lock (_syncRoot)
            {
                if (_maxSize != -1 && _table.Count > _maxSize)
                {
                    Log.LogWarning("Cache", $"Clearing cache '{Name}' as it exceeded maximum size {_maxSize} elements. Edit configuration file /App_Data/Composite/Composite.config to increase the cache size.");
                    _table.Clear();
                }

                if (_table.Contains(key))
                {
                    _table.Remove(key);
                }

                _table.Add(key, value);
            }
        }


        /// <exclude />
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


        /// <exclude />
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


        /// <exclude />
        public bool ClearOnFlush
        {
            set { _clearOnFlush = value; }
        }


        /// <exclude />
        protected void ReadConfiguration()
        {
            CachingSettings cachingSettings = GlobalSettingsFacade.GetNamedCaching(this.Name);
            _enabled = cachingSettings.Enabled;
            _maxSize = cachingSettings.GetSize(_defaultMaximumSize);
        }
	}
}
