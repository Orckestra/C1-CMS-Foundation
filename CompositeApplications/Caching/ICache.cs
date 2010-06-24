namespace Composite.Caching
{
    public interface ICache
    {
        string Name { get; }
        CacheStatistic GetStatistic();
    }

    public interface ICache<TKey, TValue> : ICache where TValue : class
    {
        TValue Get(TKey key);
        bool TryGet(TKey key, out TValue value);

        void Add(TKey key, TValue value);
        void Add(TKey key, TValue value, CachePriority cachePriority);

        void Remove(TKey key);
        void Clear();
    }
}
