using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider
{
    /// <summary>
    /// User password update/validation.
    /// </summary>
    public static class UserFormLoginManager
    {
        /// <summary>
        /// Creates user's form login data.
        /// </summary>
        /// <param name="userId">The user id.</param>
        /// <param name="password">Password</param>
        /// <param name="userFolder">The name of the folder in which the user will be shown in c1 console.</param>
        public static void CreateUserFormLogin(Guid userId, string password, string userFolder)
        {
            var userFormLogin = DataFacade.BuildNew<IUserFormLogin>();
            userFormLogin.UserId = userId;
            userFormLogin.Folder = userFolder;

            SetPasswordFieldsInt(userFormLogin, password);
            DataFacade.AddNew(userFormLogin);
        }

        /// <summary>
        /// Sets a password for a user, preserving password history.
        /// </summary>
        /// <param name="userFormLogin">The user form login data.</param>
        /// <param name="password">The new password.</param>
        public static void SetPassword(IUserFormLogin userFormLogin, string password)
        {
            Verify.ArgumentNotNullOrEmpty(password, "password");

            SavePasswordHistory(userFormLogin);
            SetPasswordFieldsInt(userFormLogin, password);

            userFormLogin.LastPasswordChangeDate = DateTime.Now;

            DataFacade.Update(userFormLogin);
        }

        private static void SavePasswordHistory(IUserFormLogin userFormLogin)
        {
            if (string.IsNullOrEmpty(userFormLogin.PasswordHash) || PasswordPolicyFacade.PasswordHistoryLength <= 0)
            {
                return;
            }

            var passwordHistoryRecord = DataFacade.BuildNew<IUserPasswordHistory>();
            passwordHistoryRecord.Id = Guid.NewGuid();
            passwordHistoryRecord.UserId = userFormLogin.UserId;
            passwordHistoryRecord.SetDate = userFormLogin.LastPasswordChangeDate;
            passwordHistoryRecord.PasswordSalt = userFormLogin.PasswordHashSalt;
            passwordHistoryRecord.PasswordHash = userFormLogin.PasswordHash;

            DataFacade.AddNew(passwordHistoryRecord);

            // Cleaning up old history records
            Guid userId = userFormLogin.UserId;
            var passwordDataToBeRemoved = DataFacade.GetData<IUserPasswordHistory>()
                .Where(uph => uph.UserId == userId)
                .OrderByDescending(uph => uph.SetDate).Skip(PasswordPolicyFacade.PasswordHistoryLength).ToList();

            if (passwordDataToBeRemoved.Any())
            {
                DataFacade.Delete((IEnumerable<IData>) passwordDataToBeRemoved);
            }
        }

        private static void SetPasswordFieldsInt(IUserFormLogin user, string password)
        {
            var salt = GenerateHashSalt();

            user.PasswordHashSalt = Convert.ToBase64String(salt);
            user.PasswordHash = GeneratePasswordHash(password, salt);
        }


        /// <summary>
        /// Validates user's password.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static bool ValidatePassword(IUserFormLogin user, string password)
        {
            if (user.PasswordHash.IsNullOrEmpty())
            {
                return false;
            }

            if (user.PasswordHashSalt.IsNullOrEmpty())
            {
                return false;
            }

            byte[] salt = Convert.FromBase64String(user.PasswordHashSalt);

            return user.PasswordHash == GeneratePasswordHash(password, salt);
        }

        /// <summary>
        /// Checks whether the password appears in the user's password history.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public static bool PasswordFoundInHistory(IUser user, string password)
        {
            Guid userId = user.Id;

            var allOldPasswords = DataFacade.GetData<IUserPasswordHistory>().Where(uph => uph.UserId == userId).Evaluate();

            foreach (var pwdHistory in allOldPasswords)
            {
                byte[] salt = Convert.FromBase64String(pwdHistory.PasswordSalt);

                if (pwdHistory.PasswordHash == GeneratePasswordHash(password, salt))
                {
                    return true;
                }
            }

            return false;
        }


        /// <summary>
        /// Generates password hash.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <param name="salt">The salt.</param>
        /// <returns></returns>
        public static string GeneratePasswordHash(string password, byte[] salt)
        {
            using (HashAlgorithm algorithm = new SHA256Managed())
            {
                var plainText = Encoding.UTF8.GetBytes(password);
                byte[] plainTextWithSaltBytes = new byte[plainText.Length + salt.Length];

                plainText.CopyTo(plainTextWithSaltBytes, 0);
                salt.CopyTo(plainTextWithSaltBytes, plainText.Length);

                return Convert.ToBase64String(algorithm.ComputeHash(plainTextWithSaltBytes));
            }
        }

        /// <summary>
        /// Generates hash salt.
        /// </summary>
        public static byte[] GenerateHashSalt()
        {
            using (var csprng = new RNGCryptoServiceProvider())
            {
                var salt = new byte[24];
                csprng.GetBytes(salt);
                return salt;
            }
        }

        /// <exclude />
        public static IUserFormLogin GetUserFormLogin(this IUser user)
        {
            Guid userId = user.Id;
            return DataFacade.GetData<IUserFormLogin>().Where(ufl => ufl.UserId == userId)
                .FirstOrException("Missing user form login data for user id '{0}'", userId);
        }
    }
}
