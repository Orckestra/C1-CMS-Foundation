namespace Composite.C1Console.Security.Plugins.LoginSessionStore
{
    /// <summary>
    /// Allows specifying a logout URL.
    /// </summary>
    public interface ILoginSessionStoreRedirectedLogout
    {
        /// <exclude />
        string LogoutUrl { get; }
    }
}
