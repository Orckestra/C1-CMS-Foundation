using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using Composite.C1Console.Security;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Logging;
using Composite.C1Console.Security.Cryptography;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Composite.Data.Transactions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider
{
    [ConfigurationElementType(typeof(DataBasedFormLoginProviderData))]
    internal sealed class DataBasedFormLoginProvider : IFormLoginProvider
	{
        static readonly TimeSpan HalfASecond = TimeSpan.FromMilliseconds(500);
        static readonly TimeSpan HalfAnHour = TimeSpan.FromMinutes(30);

        private class FailedLoginInfo
        {
            public DateTime LastLoginAttempt;
            public int LoginAttemptCount;
        }

        static readonly Hashtable<string, FailedLoginInfo> _loginHistory = new Hashtable<string, FailedLoginInfo>();

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

            FailedLoginInfo failedLoginInfo = _loginHistory[username];
            if(!BruteFourcePreventionCheck(username, failedLoginInfo))
            {
                return LoginResult.PolicyViolated;
            }

            string encryptedPasswrod = password.Encrypt();

            IUser user =
                (from u in DataFacade.GetData<IUser>()
                 where string.Compare(u.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0
                 select u).FirstOrDefault();

            if(user == null)
            {
                return LoginResult.UserDoesNotExist;
            }

            bool loginIsValid = user.EncryptedPassword == encryptedPasswrod;
            UpdateLoginHistory(username, loginIsValid, failedLoginInfo);

            return loginIsValid ? LoginResult.Success : LoginResult.IncorrectPassword;
        }

        private static void UpdateLoginHistory(string username, bool loginIsValid, FailedLoginInfo failedLoginInfo)
        {
            if(loginIsValid)
            {
                lock(_loginHistory)
                {
                    _loginHistory.Remove(username);
                }
                return;
            }
            
            if(failedLoginInfo != null)
            {
                lock(failedLoginInfo)
                {
                    failedLoginInfo.LastLoginAttempt = DateTime.Now;
                    failedLoginInfo.LoginAttemptCount++;
                }
                return;
            }

            lock(_loginHistory)
            {
                _loginHistory[username] = new FailedLoginInfo{ LastLoginAttempt =  DateTime.Now, LoginAttemptCount = 1};
            }
        }

        static bool BruteFourcePreventionCheck(string username, FailedLoginInfo failedLoginInfo)
        {
            if (failedLoginInfo == null)
            {
                return true;
            }
            
            var now = DateTime.Now;

            /* If user tries to login quicker that 500ms from previous attempt - it is failed automatically */
            lock (failedLoginInfo)
            {
                if (now - failedLoginInfo.LastLoginAttempt < HalfASecond)
                {
                    return false;
                }

                if (failedLoginInfo.LoginAttemptCount > 30)
                {
                    if (now - failedLoginInfo.LastLoginAttempt < HalfAnHour)
                    {
                        // User is "locked" for 30 minutes after 30 failed logins in a row
                        return false;
                    }

                    // After half an hour - cleaning up the history
                    _loginHistory.Remove(username);
                }
            }
            return true;                        
        }

        public void SetUserPassword(string username, string password)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUser user =
                    (from u in DataFacade.GetData<IUser>()
                     where u.Username == username
                     select u).FirstOrDefault();

                if (user == null) throw new InvalidOperationException(string.Format("The user '{0}' does not exists", username));

                user.EncryptedPassword = password.Encrypt();

                DataFacade.Update(user);

                transactionScope.Complete();
            }
        }


        public void AddNewUser(string userName, string password, string group, string email)
        {
            IUser user = DataFacade.BuildNew<IUser>();

            user.Id = Guid.NewGuid();
            user.Username = userName.Trim().ToLowerInvariant();
            user.EncryptedPassword = password.Encrypt();
            user.Group = group;
            user.Email = email;

            DataFacade.AddNew<IUser>(user);

            LoggingService.LogVerbose("DataBasedFormLoginProvider", string.Format("Added new user '{0}'", userName));
        }


        public bool UsersExists
        {
            get { return DataFacade.GetData<IUser>().Any(); }
        }
    }



    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    internal sealed class DataBasedFormLoginProviderData : LoginProviderData
    {
    }
}
