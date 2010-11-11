<%@ WebService Language="C#" Class="Composite.Services.Login" %>

using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite.C1Console.Security;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class Login : System.Web.Services.WebService
    {

        public Login()
        {
        }

        [WebMethod]
        public bool ValidateAndLogin(string username, string password)
        {
            return UserValidationFacade.FormValidateUser(username, password);
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
            if (UserValidationFacade.IsLoggedIn() == true
                && UserValidationFacade.AllUsernames.Contains(UserValidationFacade.GetUsername()) == false)
            {
                Composite.Core.Logging.LoggingService.LogInformation("Security", String.Format("Automatic logout executed. Username '{0}' not found in list of usernames", UserValidationFacade.GetUsername()));
                UserValidationFacade.Logout();

                return false;
            }

            return UserValidationFacade.IsLoggedIn();
        }



    }
}
