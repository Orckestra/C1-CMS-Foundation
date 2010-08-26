using System;

namespace Composite.Core.Caching
{
    internal sealed class CacheSettings
    {
        public CacheType CacheType { get; private set; }
        public CachePriority DefaultPriority { get; private set; }

        public int Size { get; set; }                             // Has sense only for lightweight/mixed cache
        public TimeSpan SlidingExpritationPeriod { get; set; }    // Has sense for AspNet/Mixed cache

        public CacheSettings(CacheType cacheType)
        {
            CacheType = cacheType;
            SlidingExpritationPeriod = TimeSpan.Zero;
            DefaultPriority = CachePriority.Default;
            Size = -1; // Unlimited
        }

        public static CacheSettings AspNet
        {
            get { return new CacheSettings(CacheType.AspNet); }
        }

        public static CacheSettings Mixed
        {
            get { return new CacheSettings(CacheType.Mixed); }
        }

        public static CacheSettings WeakReferenceBased(int size)
        {
            return new CacheSettings(CacheType.Mixed) {Size = size, DefaultPriority = CachePriority.WeakReference};
        }

        public CacheSettings LightWeight(int size)
        {
            return new CacheSettings(CacheType.Lightweight) { Size = size };
        }
    }
}
