using System;
using System.Web;
using Composite.Core.Logging;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.C1Console.Security.Plugins.LoginProvider;
using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class UserValidationFacade
    {
        private static readonly object _lock = new object();


        /// <exclude />
        public enum ValidationType 
        {
            /// <exclude />
            None = 0,

            /// <exclude />
            Form = 1,

            /// <exclude />
            Windows = 2
        };


        private static readonly Dictionary<LoginResult, string> LoginResultDescriptions = new Dictionary<LoginResult, string>
        {
            {LoginResult.IncorrectPassword, "Incorrect password."},
            {LoginResult.UserDoesNotExist, "User does not exist."},
            {LoginResult.PolicyViolated, "Login policy violated."},
            {LoginResult.UserLockedByAdministrator, "User is locked by an administrator."},
            {LoginResult.UserLockedAfterMaxLoginAttempts, "User locked after reaching maximum login attempts."}
        };


        /// <exclude />
        public static ValidationType GetValidationType()
        {
            if (LoginProviderPluginFacade.CheckType<IFormLoginProvider>())
            {
                return ValidationType.Form;
            }
            if (LoginProviderPluginFacade.CheckType<IWindowsLoginProvider>())
            {
                return ValidationType.Windows;
            }

            throw new InvalidOperationException($"Validation plugin '{LoginProviderPluginFacade.GetValidationPluginType()}' does not implement a known validation interface");
        }



        /// <exclude />
        public static IEnumerable<string> AllUsernames => LoginProviderPluginFacade.AllUsernames;


        /// <exclude />
        public static bool CanSetUserPassword => LoginProviderPluginFacade.CanSetUserPassword;


        /// <summary>
        /// Validates and persists a form based login. If no users exist and the user name matches the default administrator user, that user will be created.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns>True if the user was validated</returns>
        public static LoginResult FormValidateUser(string userName, string password)
        {
            LoginResult loginResult = LoginProviderPluginFacade.FormValidateUser(userName, password);

            if (loginResult == LoginResult.UserDoesNotExist && AdministratorAutoCreator.CanBeAutoCreated(userName))
            {
                lock (_lock)
                {
                    loginResult = LoginProviderPluginFacade.FormValidateUser(userName, password);

                    if (loginResult == LoginResult.UserDoesNotExist && AdministratorAutoCreator.CanBeAutoCreated(userName))
                    {
                        AdministratorAutoCreator.AutoCreateAdministrator(userName, password, "");

                        loginResult = LoginProviderPluginFacade.FormValidateUser(userName, password);
                    }
                }
            }

            if (loginResult == LoginResult.Success)
            {
                LoggingService.LogVerbose("UserValidation", $"The user: [{userName}], has been validated and accepted. {GetIpInformation()}", LoggingService.Category.Audit);
                PersistUsernameInSessionDataProvider(userName);
            }
            else if (LoginResultDescriptions.ContainsKey(loginResult))
            {
                LogLoginFailed(userName, LoginResultDescriptions[loginResult]);
            }

            return loginResult;
        }

        private static void LogLoginFailed(string userName, string message)
        {
            LoggingService.LogWarning("UserValidation", 
                                      $"Login as [{userName}] failed. {message} {GetIpInformation()}",
                                      LoggingService.Category.Audit);
        }


        private static string GetIpInformation()
        {
            var httpContext = HttpContext.Current;
            if(httpContext == null)
            {
                return string.Empty;
            }

            string ipaddress = httpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                  
            if (String.IsNullOrWhiteSpace(ipaddress))
            {
                ipaddress = httpContext.Request.ServerVariables["REMOTE_ADDR"]; 
            }

            if (String.IsNullOrWhiteSpace(ipaddress))
            {
                return string.Empty;
            }

            return "IP address: " + ipaddress;
        }


        /// <exclude />
        public static bool FormValidateUserWithoutLogin(string userName, string password)
        {
            return LoginProviderPluginFacade.FormValidateUser(userName, password) == LoginResult.Success;
        }



        /// <exclude />
        public static void FormSetUserPassword(string userName, string password)
        {
            LoginProviderPluginFacade.FormSetUserPassword(userName, password);
        }


        /// <summary>
        /// Validates and persists a windows based login. Actual Windows username / password validation should precede this call.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="domainName"></param>
        /// <returns>True if the user was validated</returns>
        public static bool WindowsValidateUser(string userName, string domainName)
        {
            bool userIsValidated = LoginProviderPluginFacade.WindowsValidateUser(userName, domainName);


            if (userIsValidated)
            {
                PersistUsernameInSessionDataProvider(userName);
            }

            return userIsValidated;
        }


        /// <summary>
        /// Flushes the username from the login session.
        /// </summary>
        [Obsolete("Use Logout() instead.")]
        public static void FlushUsername() => Logout();



        /// <summary>
        /// Flushes the username from the login session (if applicable) and returns a logout URL.
        /// </summary>
        public static string Logout() => LoginSessionStorePluginFacade.Logout();


        /// <exclude />
        public static bool IsLoggedIn() => !string.IsNullOrEmpty(LoginSessionStorePluginFacade.StoredUsername);



        /// <exclude />
        public static UserToken GetUserToken()
        {
            var userName = LoginSessionStorePluginFacade.StoredUsername;
            Verify.That(!string.IsNullOrEmpty(userName), "No user has been logged in");

            return new UserToken(userName);
        }



        /// <exclude />
        public static string GetUsername()
        {
            var userName = LoginSessionStorePluginFacade.StoredUsername;
            Verify.That(!string.IsNullOrEmpty(userName), "No user has been logged in");

            return userName;
        }



        private static void PersistUsernameInSessionDataProvider(string userName)
        {
            LoginSessionStorePluginFacade.StoreUsername(userName, false);
        }
    }
}