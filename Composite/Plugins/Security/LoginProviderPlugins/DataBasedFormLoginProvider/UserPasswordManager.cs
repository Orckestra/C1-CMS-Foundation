using System;
using Composite.C1Console.Security.Cryptography;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider
{
    /// <summary>
    /// User password update/validation.
    /// </summary>
    public static class UserPasswordManager
    {
        /// <summary>
        /// Sets a password for a user, preserving password history.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The new password.</param>
        public static void SetPassword(IUser user, string password)
        {
            // TODO: implement password hashing

            user.EncryptedPassword = password.Encrypt();
            user.LastPasswordChangeDate = DateTime.Now;

            DataFacade.Update(user);
        }

        /// <summary>
        /// Validates user's password.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static bool ValidatePassword(IUser user, string password)
        {
            return PasswordMatch(user, password);
        }

        /// <summary>
        /// Note: In C1 4.2 and older the password was encrypted instead hashed.
        /// </summary>
        private static bool PasswordMatch(IUser user, string password)
        {
            return user.EncryptedPassword == password.Encrypt();
        }
    }
}
