using System;
using Composite.C1Console.Security;

namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Allows associating C1 console tree elements with a url for public consumption (TryGetURL) and for the C1 console browser (TryGetBrowserViewSettings)
    /// </summary>
    public interface IUrlToEntityTokenMapper
    {
        /// <summary>
        /// Returns a url associated with an entity token, or null if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="entityToken">The entity token.</param>
        /// <returns>A URL that will display the data item - this can be an "internal" URL which is later transformed by a IInternalUrlConverter. Intended for public consumption.</returns>
        string TryGetUrl(EntityToken entityToken);

        /// <summary>
        /// For use in the C1 Console explorer's browser - returns url and tooling options associated with an entity token,  or null if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="entityToken">The entity token.</param>
        /// <param name="showPublishedView">When true (and element has draft/published content) the published version is desired</param>
        /// <returns>BrowserViewSettings directing how the C1 Console Brorser should behave (what URL to show and if tooling should be available).</returns>
        BrowserViewSettings TryGetBrowserViewSettings(EntityToken entityToken, bool showPublishedView);

        /// <summary>
        /// Returns an entity token associated with a url, or null if current <see cref="IUrlToEntityTokenMapper"/> does not support this kind of entity token.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <returns></returns>
        EntityToken TryGetEntityToken(string url);
    }

    /// <summary>
    /// Describes a browser view - URL and if tooling should be active.
    /// </summary>
    public sealed class BrowserViewSettings
    {
        /// <summary>
        /// Constructs a new instance on the BrowserViewSettings class.
        /// </summary>
        public BrowserViewSettings()
        {
        }

        /// <summary>
        /// Constructs a new instance on the BrowserViewSettings class.
        /// </summary>
        /// <param name="url">Url to load in browser</param>
        /// <param name="toolingOn">True if tooling (view, SEO tools etc) should be active for URL</param>
        public BrowserViewSettings(string url, bool toolingOn)
        {
            if (string.IsNullOrEmpty(url)) throw new ArgumentException("URL not set", "url");

            Url = url;
            ToolingOn = toolingOn;
        }

        /// <summary>
        /// Url to load in browser
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// True if tooling (view, SEO tools etc) should be active for URL
        /// </summary>
        public bool ToolingOn { get; set; }
    }
}
