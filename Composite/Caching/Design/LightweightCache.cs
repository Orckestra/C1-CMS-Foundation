using System;

namespace Composite.Caching.Design
{
    public class LightweightCache<TKey, TValue> : ICache<TKey, TValue> where TValue : class
    {
        protected readonly Data.Caching.Cache<TKey, TValue> _innerCache;

        public LightweightCache(string name, CacheSettings cacheOptions)
        {
            _innerCache = new Data.Caching.Cache<TKey, TValue>(name, cacheOptions.Size);
        }

        public TValue Get(TKey key)
        {
            return _innerCache.Get(key);
        }

        public bool TryGet(TKey key, out TValue value)
        {
            value = _innerCache.Get(key);
            return value != null;
        }

        public void Add(TKey key, TValue value)
        {
            _innerCache.Add(key, value);
        }

        public void Add(TKey key, TValue value, CachePriority cachePriority)
        {
            Add(key, value);
        }

        public void Remove(TKey key)
        {
            _innerCache.Remove(key);
        }

        public void Clear()
        {
            _innerCache.Clear();
        }

        public string Name
        {
            get { return _innerCache.Name; }
        }

        public CacheStatistic GetStatistic()
        {
            throw new NotImplementedException();
        }
    }
}
