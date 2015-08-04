using System.Collections.Generic;

namespace Composite.Core.Routing
{
    /// <summary>
    /// An interface for internal url transformation.
    /// </summary>
    public interface IInternalUrlConverter
    {
        /// <summary>
        /// Contains an enumeration of url prefixes for urls current convert is handling
        /// </summary>
        IEnumerable<string> AcceptedUrlPrefixes { get; }

        /// <summary>
        /// Converts a url in an internal format (f.e. "~/page(guid)" or "~/media(guid)") to a public serveable url (f.e. "/page/subpage").
        /// </summary>
        /// <param name="internalUrl">An internal url.</param>
        /// <param name="urlSpace">The target url space.</param>
        /// <returns></returns>
        string Convert(string internalUrl, UrlSpace urlSpace);
    }
}