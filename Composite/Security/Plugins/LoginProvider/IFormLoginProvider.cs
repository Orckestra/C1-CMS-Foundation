

namespace Composite.Security.Plugins.LoginProvider
{
    public interface IFormLoginProvider : ILoginProvider
    {
        bool Validate(string username, string password);
        void SetUserPassword(string username, string password);
        void AddNewUser(string userName, string password, string group);
    }
}
