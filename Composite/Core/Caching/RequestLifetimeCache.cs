using System;
using System.Collections.Generic;
using System.Web;
using System.Runtime.Remoting.Messaging;
using Composite.Core.Threading;


namespace Composite.Core.Caching
{
    // See http://piers7.blogspot.dk/2005/11/threadstatic-callcontext-and_02.html for details on HttpContext.Items vs. CallContext vs. ThreadStatic
    /// <summary>
    /// Cache for storing objects with a longevity limited to a single request. 
    /// Objects cached here are subject to garbage collection at some point after the request has completed.
    /// Uses HttpContext.Items when available, otherwise <see cref="System.Runtime.Remoting.Messaging.CallContext" />.
    /// </summary>
    public static class RequestLifetimeCache
    {
        /// <summary>
        /// Add an item to the cache.
        /// </summary>
        /// <param name="key">Key for item. Used when retrieving/clearing item later.</param>
        /// <param name="value">The item to store.</param>
        public static void Add(object key, object value)
        {
            Verify.ArgumentNotNull(key, "key");

            var httpContext = HttpContext.Current;

            if (httpContext != null)
            {
                httpContext.Items.Add(key, value);
            }
            else
            {
                FallbackCache.Add(key, value);
            }
        }



        /// <summary>
        /// Checks if the cache has the provided key.
        /// </summary>
        /// <param name="key">Key for item</param>
        /// <returns>True when item exist in cache. Otherwise false.</returns>
        public static bool HasKey(object key)
        {
            Verify.ArgumentNotNull(key, "key");

            var httpContext = HttpContext.Current;

            if (httpContext != null)
            {
                return httpContext.Items.Contains(key);
            }

            return FallbackCache.ContainsKey(key);
        }



        /// <summary>
        /// Returns cached item based on the provided key or null if item is not known.
        /// </summary>
        /// <param name="key">Key for item</param>
        /// <returns>Cached item or null if not found.</returns>
        public static object TryGet(object key)
        {
            Verify.ArgumentNotNull(key, "key");

            var context = HttpContext.Current;

            if (context != null)
            {
                return context.Items[key];
            }

            return (FallbackCache.ContainsKey(key) ? FallbackCache[key] : null);
        }



        /// <summary>
        /// Returns cached item based on the provided key or null if item is not known.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key">Key for item</param>
        /// <returns>Cached item or null if not found.</returns>
        public static T TryGet<T>(object key)
        {
            Verify.ArgumentNotNull(key, "key");

            object result = TryGet(key);

            if (result != null)
            {
                return (T)result;
            }

            return default(T);
        }



        /// <summary>
        /// Returns cached item based on the provided key or a new instance which gets added to the cache using the key. 
        /// The returned item is guaranteed to exist in the cache.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key">Key for item</param>
        /// <returns>Cached item or a new instance if not found.</returns>
        internal static T GetCachedOrNew<T>(object key) where T : new()
        {
            Verify.ArgumentNotNull(key, "key");

            T result = TryGet<T>(key);

            if (result == null)
            {
                result = new T();
                Add(key, result);
            }

            return result;
        }


        /// <summary>
        /// Remove a named item from the cache.
        /// </summary>
        /// <param name="key">Key for item to remove</param>
        public static void Remove(object key)
        {
            Verify.ArgumentNotNull(key, "key");

            var context = HttpContext.Current;

            if (context != null)
            {
                context.Items.Remove(key);
            }
            else
            {
                FallbackCache.Remove(key);
            }
        }


        private static Dictionary<object, object> FallbackCache
        {
            get
            {
                Dictionary<object, object> fallback = CallContext.GetData("RequestLifetimeCache:Fallback") as Dictionary<object, object>;

                if (fallback==null)
                {
                    fallback = new Dictionary<object, object>();
                    CallContext.SetData("RequestLifetimeCache:Fallback", fallback);
                }

                return fallback;
            }
        }

        [Obsolete("Should no longer be used", true)]
        public static void ClearAll()
        {
        }
    }
}
