using Composite.C1Console.Security;

namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Allows Data Scope Services to Add or Clean their parameters to or from the URL and update a entity token with their associate properties
    /// </summary>
    public interface IServiceUrlToEntityTokenMapper
    {
        /// <summary>
        /// Gets a URL and Returns the url with parametres associated with an entity token, or original URL if current entity token does not support this kind of entity token.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <param name="entityToken">The entity token.</param>
        /// <returns>A URL that will display the data item - this can be an "internal" URL which is later transformed by a IInternalUrlConverter. Intended for public consumption.</returns>
        string ProcessUrl(string url, EntityToken entityToken);

        /// <summary>
        /// Updates an entity token according to a url.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <param name="entityToken">The entity token.</param>
        /// <returns></returns>
        EntityToken TryGetEntityToken(string url, ref EntityToken entityToken);

        /// <summary>
        /// Gets a url and cleans it up from its parameters.
        /// </summary>
        /// <param name="url">The url.</param>
        /// <returns></returns>
        string CleanUrl(ref string url);
    }
}
