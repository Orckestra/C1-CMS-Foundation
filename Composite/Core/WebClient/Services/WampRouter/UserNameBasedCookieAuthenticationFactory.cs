using Composite.C1Console.Security;
using WampSharp.V2.Authentication;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class UserNameBasedCookieAuthenticationFactory : ICookieAuthenticatorFactory
    {
        public IWampSessionAuthenticator CreateAuthenticator(ICookieProvider cookieProvider)
        {
            var userName = UserValidationFacade.GetUsername();

            return new UserNameBasedCookieAuthenticator(userName);
        }
    }
}