using Composite.C1Console.Security;
using WampSharp.V2.Authentication;
using WampSharp.V2.Core.Contracts;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class UserNameBasedCookieAuthenticator : WampSessionAuthenticator
    {
        public UserNameBasedCookieAuthenticator(string userName)
        {
            this.AuthenticationId = userName;
        }

        public override void Authenticate(string signature, AuthenticateExtraData extra)
        {
            throw new WampAuthenticationException("Cookie wasn't present");
        }

        public override bool IsAuthenticated => true;

        public override string AuthenticationId { get; }

        public override IWampAuthorizer Authorizer => new UserNameBasedAuthorizer();

        public override string AuthenticationMethod => nameof(UserValidationFacade);
    }
}