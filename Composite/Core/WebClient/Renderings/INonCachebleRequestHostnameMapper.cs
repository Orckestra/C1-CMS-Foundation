namespace Composite.Core.WebClient.Renderings
{
    /// <summary>
    /// Enables redirecting hostnames for extranet protected media requests in reverse caching proxy configuration.
    /// </summary>
    public interface INonCachebleRequestHostnameMapper
    {
        /// <summary>
        /// Gets a hostname to redirect to.
        /// </summary>
        /// <param name="hostname"></param>
        /// <returns></returns>
        string GetRedirectToHostname(string hostname);
    }
}
