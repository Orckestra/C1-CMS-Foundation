<%@ WebService Language="C#" Class="Composite.Services.Login" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class Login : WebService
    {
        [WebMethod]
        public string ValidateAndLogin(string username, string password)
        {
            var result = UserValidationFacade.FormValidateUser(username, password);

            switch (result)
            {
                case LoginResult.Success:
                    return "success";
                case LoginResult.UserLockedAfterMaxLoginAttempts:
                    return "lockedAfterMaxAttempts";
                case LoginResult.UserLockedByAdministrator:
                    return "lockedByAnAdministrator";
                case LoginResult.PasswordUpdateRequired:
                    return "passwordUpdateRequired";
            }
            return "failed";
        }

        [WebMethod]
        public string[] ChangePassword(string username, string oldPassword, string newPassword)
        {
            var result = UserValidationFacade.FormValidateUser(username, oldPassword);
            if (result == LoginResult.IncorrectPassword)
            {
                return new[] {StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangePasswordForm.IncorrectOldPassword")};
            }

            Verify.That(result == LoginResult.PasswordUpdateRequired, "Password update has to be required.");

            if (newPassword == oldPassword)
            {
                return new[]{ "The old and the new passwords are the same."}; // Should be validated on client as well.
            }

            using (var c = new DataConnection())
            {
                var user = c.Get<IUser>().Single(u => string.Compare(u.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0);

                IList<string> errors;
                if (!PasswordPolicyFacade.ValidatePassword(user, newPassword, out errors))
                {
                    return errors.ToArray();
                }

                UserValidationFacade.FormSetUserPassword(user.Username, newPassword);

                var loginResult = UserValidationFacade.FormValidateUser(username, newPassword);
                Verify.That(loginResult == LoginResult.Success, "Unexpected login result value after a password change: " + loginResult);
            }

            return new string[0];
        }

        [WebMethod]
        public string Logout(bool dummy)
        {
            return UserValidationFacade.Logout();
        }

        [WebMethod]
        public bool IsLoggedIn(bool dummy)
        {
            if (UserValidationFacade.IsLoggedIn()
                && !UserValidationFacade.AllUsernames.Contains(UserValidationFacade.GetUsername()))
            {
                Log.LogInformation("Security", String.Format("Automatic logout executed. Username '{0}' not found in list of usernames", UserValidationFacade.GetUsername()));
                UserValidationFacade.Logout();

                return false;
            }

            return UserValidationFacade.IsLoggedIn();
        }

        [WebMethod]
        public string GetUserDisplayName(bool dummy)
        {
            string username = UserValidationFacade.GetUsername();
            if (string.IsNullOrEmpty(username))
            {
                return null;
            }

            using (var c = new DataConnection())
            {
                var user = c.Get<IUser>().FirstOrDefault(u => string.Compare(u.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0);

                if (user != null && !string.IsNullOrEmpty(user.Name))
                {
                    return user.Name;
                }
            }

            return username;
        }
    }
}
