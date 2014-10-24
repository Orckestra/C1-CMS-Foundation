<%@ WebService Language="C#" Class="Composite.Services.Login" %>

using System;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.C1Console.Security;
using Composite.Core;

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
            }
            return "failed";
        }


        [WebMethod]
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
