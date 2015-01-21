<%@ WebService Language="C#" Class="Composite.Services.Login" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider;

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
            Verify.That(result == LoginResult.PasswordUpdateRequired, "Password update was to be required.");

            if (newPassword == oldPassword)
            {
                return new[]{ "The old and the new passwords are the same."}; // Should be validated on client as well.
            }

            IList<string> errors;
            if (!PasswordPolicyFacade.ValidatePassword(newPassword, out errors))
            {
                return errors.ToArray();
            }
             
            using (var c = new DataConnection())
            {
                var user = c.Get<IUser>().Single(u => string.Compare(u.Name, username, StringComparison.InvariantCultureIgnoreCase) == 0);
                
                UserPasswordManager.SetPassword(user, newPassword);
            }

            return new string[0];
        }
        
        
        public bool Logout(bool dummy)
        {
            UserValidationFacade.Logout();
            return true;
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
    }
}
