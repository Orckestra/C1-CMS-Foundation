using System;
using System.Web;
using System.Web.Caching;
using Composite.Data.Caching;

namespace Composite.Core.Caching.Design
{
    internal class MixedCache<TValue> : ICache<string, TValue> where TValue : class
    {
        private readonly WeakRefCache<string, TValue> _weakReferenceCache;
        private readonly CachePriority _defaultPriority;
        private readonly TimeSpan _slidingExpirationTime;
        private readonly bool _useAspNetCacheByDefault;

        private string _aspNetCachePrefix;

        public MixedCache(string name, CacheSettings settings)
        {
            _weakReferenceCache = new WeakRefCache<string, TValue>(name, settings.Size);
            _defaultPriority = settings.DefaultPriority;
            _slidingExpirationTime = settings.SlidingExpritationPeriod;

            _aspNetCachePrefix = "MixedCache" + Name;

            _useAspNetCacheByDefault = _defaultPriority != CachePriority.WeakReference
                                    && _defaultPriority != CachePriority.Undefined;
        }

        public TValue Get(string key)
        {
            TValue value = _weakReferenceCache.Get(key);

            // "Pinping" asp.net cache
            if(value != null)
            {
                var aspNetCachedValue = HttpRuntime.Cache.Get(GetAspNetKey(key)) as TValue;
                if(_useAspNetCacheByDefault && aspNetCachedValue == null)
                {
                    // Putting resurrected item back to ASP .NET cache as a "Low" priority
                    HttpRuntime.Cache.Add(key, value, null, DateTime.MaxValue, TimeSpan.Zero, CacheItemPriority.Low, null);
                }
            }

            return value;
        }

        public bool TryGet(string key, out TValue value)
        {
            value = Get(key);
            return value != null;
        }

        public void Add(string key, TValue value)
        {
            Add(key, value, _defaultPriority);
        }

        public void Add(string key, TValue value, CachePriority cachePriority)
        {
            _weakReferenceCache.Add(key, value);

            if(cachePriority == CachePriority.WeakReference 
                || cachePriority == CachePriority.Undefined)
            {
                return;
            }

            CacheItemPriority aspNetCachePriority;

            switch (cachePriority)
            {
                case CachePriority.Low:
                    aspNetCachePriority = CacheItemPriority.Low;
                    break;
                case CachePriority.High:
                    aspNetCachePriority = CacheItemPriority.High;
                    break;
                case CachePriority.NeverExpires:
                    aspNetCachePriority = CacheItemPriority.NotRemovable;
                    break;
                default:
                    aspNetCachePriority = CacheItemPriority.Default;
                    break;
            }


            string aspNetKey = GetAspNetKey(key);

            HttpRuntime.Cache.Add(aspNetKey,
                                  value,
                                  null,
                                  DateTime.MaxValue, 
                                  _slidingExpirationTime,
                                  aspNetCachePriority,
                                  null);
        }

        private string GetAspNetKey(string key)
        {
            return _aspNetCachePrefix + key;
        }

        public void Remove(string key)
        {
            _weakReferenceCache.Remove(key);
            HttpRuntime.Cache.Remove(GetAspNetKey(key));
        }

        public void Clear()
        {
            _weakReferenceCache.Clear();
        }

        public string Name
        {
            get { return _weakReferenceCache.Name; }
        }

        public CacheStatistic GetStatistic()
        {
            throw new NotImplementedException();
        }
    }
}
