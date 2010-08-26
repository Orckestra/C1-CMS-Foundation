namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    internal interface IWindowsLoginProvider : ILoginProvider
    {
        bool Validate(string username, string domainName);
    }
}
