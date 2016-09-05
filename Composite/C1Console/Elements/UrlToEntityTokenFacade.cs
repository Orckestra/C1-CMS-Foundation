using System.Collections.Concurrent;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;

namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Associates C1 console tree elements with a url to be used for public consumption or showing in the C1 console browser.
    /// </summary>
    public static class UrlToEntityTokenFacade
    {
        private const string LogTitle = nameof(UrlToEntityTokenFacade);

        private static readonly ConcurrentBag<IUrlToEntityTokenMapper> _mappers = new ConcurrentBag<IUrlToEntityTokenMapper>();
        private static readonly ConcurrentBag<IServiceUrlToEntityTokenMapper> _serviceMappers = new ConcurrentBag<IServiceUrlToEntityTokenMapper>();

        /// <summary>
        /// Returns a url associated with an entity token, or null if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="entityToken">The entity token.</param>
        /// <returns>URL for public consumption</returns>
        public static string TryGetUrl(EntityToken entityToken)
        {
            var theUrl = _mappers.Select(mapper => mapper.TryGetUrl(entityToken)).FirstOrDefault(url => url != null);

            return ProcessUrlWithServiceMappers(theUrl, entityToken);
        }


        /// <summary>
        /// Returns a url / tooling settings associated with an entity token to be used in the C1 Console browser, or null if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="entityToken">The entity token.</param>
        /// <param name="showPublishedView">When <value>true</value> will show a published version of the page/data item.</param>
        /// <returns>URL for public consumption</returns>
        public static BrowserViewSettings TryGetBrowserViewSettings(EntityToken entityToken, bool showPublishedView)
        {
            var theBrowserSetting = _mappers.Select(mapper => 
                mapper.TryGetBrowserViewSettings(entityToken, showPublishedView))
                      .FirstOrDefault(settings => settings?.Url != null);

            if (theBrowserSetting == null) return null;

            var originalUrl = theBrowserSetting.Url;
            theBrowserSetting.Url = ProcessUrlWithServiceMappers(originalUrl, entityToken);

            return theBrowserSetting;
        }


        private static string ProcessUrlWithServiceMappers(string url, EntityToken entityToken)
        {
            _serviceMappers.ForEach(service =>
            {
                url = service.ProcessUrl(url, entityToken);
            });

            return url;
        }

        /// <summary>
        /// Returns an entity token associated with a url, or null if current <see cref="IUrlToEntityTokenMapper"/> does not support this kind of entity token.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <returns></returns>
        public static EntityToken TryGetEntityToken(string url)
        {
            var originalUrl = url;
            _serviceMappers.Select(sm => sm.CleanUrl(ref url));
            var baseEntityToken = _mappers.Select(mapper => mapper.TryGetEntityToken(url)).FirstOrDefault(entityToken => entityToken != null);
            _serviceMappers.Select(sm => sm.TryGetEntityToken(originalUrl, ref baseEntityToken));
            return baseEntityToken;
        }

        /// <summary>
        /// Register an implementation of <see cref="IUrlToEntityTokenMapper" />
        /// </summary>
        /// <param name="mapper"></param>
        public static void Register(IUrlToEntityTokenMapper mapper)
        {
            Verify.ArgumentNotNull(mapper, nameof(mapper));

            if (_mappers.Count > 100)
            {
                Log.LogWarning(LogTitle, "More than 100 implementations of {0}-s registered: possible memory leak. Registered type: {1}",
                    nameof(IUrlToEntityTokenMapper), mapper.GetType().FullName);
                return;
            }

            _mappers.Add(mapper);
        }

        /// <summary>
        /// Register an implementation of <see cref="IUrlToEntityTokenMapper" />
        /// </summary>
        /// <param name="serviceMapper"></param>
        public static void Register(IServiceUrlToEntityTokenMapper serviceMapper)
        {
            Verify.ArgumentNotNull(serviceMapper, nameof(serviceMapper));

            if (_serviceMappers.Count > 100)
            {
                Log.LogWarning(LogTitle, "More than 100 implementations of {0}-s registered: possible memory leak. Registered type: {1}",
                    nameof(IServiceUrlToEntityTokenMapper), serviceMapper.GetType().FullName);
                return;
            }

            _serviceMappers.Add(serviceMapper);
        }
    }
}
