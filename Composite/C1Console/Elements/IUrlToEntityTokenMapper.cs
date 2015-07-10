using Composite.C1Console.Security;

namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Allows associating C1 console tree elements with a url to be showing in the C1 console browser.
    /// </summary>
    public interface IUrlToEntityTokenMapper
    {
        /// <summary>
        /// Returns a url associated with an entity token, or null if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="entityToken">The entity token.</param>
        /// <returns></returns>
        string TryGetUrl(EntityToken entityToken);

        /// <summary>
        /// Returns an entity token associated with a url, or null if current <see cref="IUrlToEntityTokenMapper"/> does not support this kind of entity token.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <returns></returns>
        EntityToken TryGetEntityToken(string url);
    }
}
