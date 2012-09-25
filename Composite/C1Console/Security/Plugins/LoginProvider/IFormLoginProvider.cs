

namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    /// <summary>
    /// Interface for form login providers - providers able to validate logins (username/password) and manage basic login information. 
    /// The provider is as a minimum expected to provide Validate( username, password ), UsersExists { get; } and AllUsernames { get; }. 
    /// If the provider support adding new users and changing a users password, this is declared via CanAddNewUser and CanSetUserPassword.
    /// </summary>
    public interface IFormLoginProvider : ILoginProvider
    {
        /// <summary>
        /// Validate a login (username and password combination)
        /// </summary>
        /// <param name="username">User name to validate</param>
        /// <param name="password">Password to validate</param>
        /// <returns>Emun describing the result of the validation</returns>
        LoginResult Validate(string username, string password);

        /// <summary>
        /// Updates a user password
        /// </summary>
        /// <param name="username">Name of user to update password for</param>
        /// <param name="password">Desired password</param>
        void SetUserPassword(string username, string password);

        /// <summary>
        /// Create a new login
        /// </summary>
        /// <param name="username">Name of user to update password for</param>
        /// <param name="password">Desired password</param>
        /// <param name="group">Name of group (simple container) for user</param>
        /// <param name="email">User email address</param>
        void AddNewUser(string username, string password, string group, string email);
    }
}
