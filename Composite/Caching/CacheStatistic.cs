namespace Composite.Caching
{
    public abstract class CacheStatistic
    {
        public virtual string CacheName { get { return string.Empty; } }
        public virtual int Size { get { return -1; } }
        public virtual int Elements { get { return -1; } }
        public virtual int AmountOfFlushes { get { return -1; } }
        public virtual int Hits { get { return -1; } }
        public virtual int Misses { get { return -1; } }
        public virtual long ApproximatedMemoryUsage { get { return -1; } }
    }
}
