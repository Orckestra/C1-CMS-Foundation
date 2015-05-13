using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Cryptography;
using Composite.C1Console.Security.Plugins.LoginProvider.Runtime;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Composite.Data.Transactions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider
{
    [ConfigurationElementType(typeof(DataBasedFormLoginProviderData))]
    internal sealed class DataBasedFormLoginProvider : IFormLoginProvider
    {
        private static readonly string LogTitle = typeof (DataBasedFormLoginProvider).Name;

        static readonly TimeSpan MinimalTimeBetweenLoginAttempts = TimeSpan.FromMilliseconds(500);
        static readonly TimeSpan HalfAnHour = TimeSpan.FromMinutes(30);
        private const int BruteForcePrevention_MaximumLoginAttempts = 30;

        private readonly int _maxLoginAttemptsBeforeLockout;

        static DataBasedFormLoginProvider()
        {
            if (!DataFacade.GetData<IUserFormLogin>().Any())
            {
                UpgradeUserData();
            }
        }

        public DataBasedFormLoginProvider()
        {
            var settings = ConfigurationServices.ConfigurationSource.GetSection(LoginProviderSettings.SectionName) as LoginProviderSettings;
            Verify.IsNotNull(settings, "Failed to load section '{0}'", LoginProviderSettings.SectionName);

            _maxLoginAttemptsBeforeLockout = settings.MaxLoginAttempts;
        }

        private class FailedLoginInfo
        {
            public DateTime LastLoginAttempt;
            public int LoginAttemptCount;
        }

        static readonly ConcurrentDictionary<string, FailedLoginInfo> _loginHistory = new ConcurrentDictionary<string, FailedLoginInfo>();

        public IEnumerable<string> AllUsernames
        {
            get 
            {
                return
                (from u in DataFacade.GetData<IUser>()
                 select u.Username).ToList();
            }
        }



        public bool CanSetUserPassword
        {
            get { return true; }
        }



        public bool CanAddNewUser
        {
            get { return true; }
        }



        public LoginResult Validate(string username, string password)
        {
            username = username.ToLower(CultureInfo.InvariantCulture);

            FailedLoginInfo failedLoginInfo;
            _loginHistory.TryGetValue(username, out failedLoginInfo);

            if(!BruteForcePreventionCheck(username, failedLoginInfo))
            {
                return LoginResult.PolicyViolated;
            }

            IUser user =
                (from u in DataFacade.GetData<IUser>()
                 where string.Compare(u.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0
                 select u).FirstOrDefault();

            if(user == null)
            {
                return LoginResult.UserDoesNotExist;
            }

            var userFormLogin = DataFacade.GetData<IUserFormLogin>().FirstOrDefault(u => u.UserId == user.Id);
            if (userFormLogin == null)
            {
                if (!user.EncryptedPassword.IsNullOrEmpty())
                {
                    throw new InvalidOperationException("User form login data is missing or present in obsolete format.");
                }
                throw new InvalidOperationException("User form login data is missing.");
            }


            bool passwordIsCorrect = UserFormLoginManager.ValidatePassword(userFormLogin, password);

            if (passwordIsCorrect)
            {
                if (userFormLogin.IsLocked)
                {
                    if (userFormLogin.LockoutReason == (int)UserLockoutReason.LockedByAdministrator)
                    {
                        return LoginResult.UserLockedByAdministrator;
                    }

                    return LoginResult.UserLockedAfterMaxLoginAttempts;
                }

                int passwordExpirationDays = PasswordPolicyFacade.PasswordExpirationTimeInDays;
                if (passwordExpirationDays > 0 && DateTime.Now > userFormLogin.LastPasswordChangeDate + TimeSpan.FromDays(passwordExpirationDays))
                {
                    return LoginResult.PasswordUpdateRequired;
                }
            }

            UpdateLoginHistory(username, passwordIsCorrect, failedLoginInfo);

            if (!passwordIsCorrect && failedLoginInfo != null && failedLoginInfo.LoginAttemptCount >= _maxLoginAttemptsBeforeLockout)
            {
                LockUser(userFormLogin);
            }

            return passwordIsCorrect ? LoginResult.Success : LoginResult.IncorrectPassword;
        }

        private void LockUser(IUserFormLogin userFormLogin)
        {
            userFormLogin.IsLocked = true;
            userFormLogin.LockoutReason = (int) UserLockoutReason.TooManyFailedLoginAttempts;
            DataFacade.Update(userFormLogin);
        }

        private static void UpdateLoginHistory(string username, bool loginIsValid, FailedLoginInfo failedLoginInfo)
        {
            if(loginIsValid)
            {
                _loginHistory.TryRemove(username, out failedLoginInfo);
                return;
            }
            
            if(failedLoginInfo != null)
            {
                failedLoginInfo.LastLoginAttempt = DateTime.Now;

                lock(failedLoginInfo)
                {
                    failedLoginInfo.LoginAttemptCount++;
                }
                return;
            }

            _loginHistory[username] = new FailedLoginInfo {LastLoginAttempt = DateTime.Now, LoginAttemptCount = 1};
        }

        static bool BruteForcePreventionCheck(string username, FailedLoginInfo failedLoginInfo)
        {
            if (failedLoginInfo == null)
            {
                return true;
            }
            
            var now = DateTime.Now;

            /* If a user tries to login quicker that 500ms from previous attempt - it is failed automatically */
            lock (failedLoginInfo)
            {
                if (now - failedLoginInfo.LastLoginAttempt < MinimalTimeBetweenLoginAttempts)
                {
                    return false;
                }

                if (failedLoginInfo.LoginAttemptCount > BruteForcePrevention_MaximumLoginAttempts)
                {
                    if (now - failedLoginInfo.LastLoginAttempt < HalfAnHour)
                    {
                        // User is "locked" for 30 minutes after 30 failed logins in a row
                        return false;
                    }

                    // After half an hour - cleaning up the history
                    FailedLoginInfo temp;

                    _loginHistory.TryRemove(username, out temp);
                }
            }
            return true;                        
        }

        public void SetUserPassword(string username, string password)
        {
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUser user = DataFacade.GetData<IUser>().FirstOrDefault(u => u.Username == username);
                Verify.IsNotNull(user, "The userFormLogin '{0}' does not exists", username);

                var userFormLogin = user.GetUserFormLogin();

                UserFormLoginManager.SetPassword(userFormLogin, password);

                transactionScope.Complete();
            }
        }


        public void AddNewUser(string userName, string password, string folder, string email)
        {
            var user = DataFacade.BuildNew<IUser>();
            user.Id = Guid.NewGuid();
            user.Username = userName.Trim().ToLowerInvariant();
            user.Email = email;

            user = DataFacade.AddNew(user);
            UserFormLoginManager.CreateUserFormLogin(user.Id, password, folder);

            Log.LogVerbose(LogTitle, "Added new userFormLogin '{0}'", userName);
        }


        public bool UsersExists
        {
            get { return DataFacade.GetData<IUser>().Any(); }
        }


        static void UpgradeUserData()
        {
            // TODO: to be removed after upgrades will be performed from versions newer that C1 4.3 +
            ConvertOldPasswordFormat();
            MoveDataFromIUserToIUserFormLogin();
        }


        static void ConvertOldPasswordFormat()
        {
            int processed = 0;

            var toBeUpdated = new List<IUser>();

            foreach (var user in DataFacade.GetData<IUser>())
            {
                if (string.IsNullOrEmpty(user.EncryptedPassword) || !string.IsNullOrEmpty(user.PasswordHashSalt))
                {
                    continue;
                }

                string password = Cryptographer.Decrypt(user.EncryptedPassword);

                var salt = UserFormLoginManager.GenerateHashSalt();

                user.PasswordHashSalt = Convert.ToBase64String(salt);
                user.EncryptedPassword = UserFormLoginManager.GeneratePasswordHash(password, salt);

                toBeUpdated.Add(user);

                processed++;
            }

            if (toBeUpdated.Any())
            {
                DataFacade.Update(toBeUpdated);
            }

            if (processed > 0)
            {
                Log.LogInformation(LogTitle, "User passwords converted to a new format: " + processed);
            }
        }


        private static void MoveDataFromIUserToIUserFormLogin()
        {
            using (var conn = new DataConnection())
            {
                var users = conn.Get<IUser>().ToList();
                var existingUserLogins = new HashSet<Guid>(conn.Get<IUserFormLogin>().Select(l => l.UserId));

                foreach (var user in users.Where(u => !existingUserLogins.Contains(u.Id)))
                {
                    if (string.IsNullOrEmpty(user.PasswordHashSalt) && !string.IsNullOrEmpty(user.EncryptedPassword))
                    {
                        throw new InvalidOperationException("User password stored in old format");
                    }

                    var userFormLogin = DataConnection.New<IUserFormLogin>();
                    userFormLogin.UserId = user.Id;
                    userFormLogin.Folder = user.Group;
                    userFormLogin.IsLocked = user.IsLocked;
                    userFormLogin.LockoutReason = user.LockoutReason;
                    userFormLogin.PasswordHash = user.EncryptedPassword;
                    userFormLogin.PasswordHashSalt = user.PasswordHashSalt;

                    conn.Add(userFormLogin);

                    // Clear out old data
                    user.IsLocked = false;
                    user.LockoutReason = 0;
                    user.Group = null;
                    user.EncryptedPassword = null;
                    user.PasswordHashSalt = null;

                    conn.Update(user);
                }
            }
        }

    }



    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    internal sealed class DataBasedFormLoginProviderData : LoginProviderData
    {
    }
}
