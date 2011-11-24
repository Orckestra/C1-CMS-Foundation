

namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    internal interface IFormLoginProvider : ILoginProvider
    {
        LoginResult Validate(string username, string password);
        void SetUserPassword(string username, string password);
        void AddNewUser(string userName, string password, string group, string email);
    }
}
