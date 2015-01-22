using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Cryptography;
using Composite.Core.Extensions;
using Composite.Core.Linq;
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
            Verify.ArgumentNotNullOrEmpty(password, "password");

            SavePasswordHistory(user);
            SetPasswordFieldsInt(user, password);

            user.LastPasswordChangeDate = DateTime.Now;

            DataFacade.Update(user);
        }

        private static void SavePasswordHistory(IUser user)
        {
            if (string.IsNullOrEmpty(user.EncryptedPassword) || PasswordPolicyFacade.PasswordHistoryLength <= 0)
            {
                return;
            }

            // Backwards compatibility - hashing old paswords on password change
            if (string.IsNullOrEmpty(user.PasswordHashSalt))
            {
                string oldPassword = user.EncryptedPassword.Decrypt();

                SetPasswordFieldsInt(user, oldPassword);
            }
            
            var passwordHistoryRecord = DataFacade.BuildNew<IUserPasswordHistory>();
            passwordHistoryRecord.Id = Guid.NewGuid();
            passwordHistoryRecord.UserId = user.Id;
            passwordHistoryRecord.SetDate = user.LastPasswordChangeDate;
            passwordHistoryRecord.PasswordSalt = user.PasswordHashSalt;
            passwordHistoryRecord.PasswordHash = user.EncryptedPassword;

            DataFacade.AddNew(passwordHistoryRecord);

            // Cleaning up old history records
            Guid userId = user.Id;
            var passwordDataToBeRemoved = DataFacade.GetData<IUserPasswordHistory>()
                .Where(uph => uph.UserId == userId)
                .OrderByDescending(uph => uph.SetDate).Skip(PasswordPolicyFacade.PasswordHistoryLength).ToList();

            if (passwordDataToBeRemoved.Any())
            {
                DataFacade.Delete((IEnumerable<IData>) passwordDataToBeRemoved);
            }
        }

        private static void SetPasswordFieldsInt(IUser user, string password)
        {
            var salt = GenerateHashSalt();

            user.EncryptedPassword = GeneratePasswordHash(password, salt);
            user.PasswordHashSalt = Convert.ToBase64String(salt);
        }


        /// <summary>
        /// Validates user's password.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static bool ValidatePassword(IUser user, string password)
        {
            if (user.EncryptedPassword.IsNullOrEmpty())
            {
                return false;
            }

            if (user.PasswordHashSalt.IsNullOrEmpty())
            {
                return LegacyPasswordMatch(user, password);
            }

            byte[] salt = Convert.FromBase64String(user.PasswordHashSalt);

            return user.EncryptedPassword == GeneratePasswordHash(password, salt);
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
        /// Note: In C1 4.2 and older the password was encrypted instead of being hashed.
        /// </summary>
        private static bool LegacyPasswordMatch(IUser user, string password)
        {
            return user.EncryptedPassword == password.Encrypt();
        }

        private static string GeneratePasswordHash(string password, byte[] salt)
        {
            using (HashAlgorithm algorithm = new SHA256Managed())
            {
                var plainText = Encoding.UTF8.GetBytes(password);
                byte[] plainTextWithSaltBytes = new byte[plainText.Length + salt.Length];

                plainText.CopyTo(plainTextWithSaltBytes, 0);
                salt.CopyTo(plainTextWithSaltBytes, plainText.Length);

                byte[] hash = algorithm.ComputeHash(plainTextWithSaltBytes);
                return Convert.ToBase64String(hash);
            }
        }

        private static byte[] GenerateHashSalt()
        {
            using (var csprng = new RNGCryptoServiceProvider())
            {
                var salt = new byte[24];
                csprng.GetBytes(salt);
                return salt;
            }
        }
    }
}
