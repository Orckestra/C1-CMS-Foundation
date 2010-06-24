namespace Composite.Security.Plugins.LoginProvider
{
    public interface IWindowsLoginProvider : ILoginProvider
    {
        bool Validate(string username, string domainName);
    }
}
