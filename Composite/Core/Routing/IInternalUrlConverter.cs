using System.Collections.Generic;
using Composite.Data;

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
        string ToPublicUrl(string internalUrl, UrlSpace urlSpace);

        /// <summary>
        /// Converts an internal url in an internal format (f.e. "~/page(guid)" or "~/media(guid)") to a data reference.
        /// </summary>
        /// <param name="internalUrl">An internal url.</param>
        /// <returns></returns>
        IDataReference ToDataReference(string internalUrl);
    }
}