using WampSharp.V2.Authentication;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class UserNameBasedAuthenticationFactory : IWampSessionAuthenticatorFactory
    {
        public IWampSessionAuthenticator GetSessionAuthenticator(WampPendingClientDetails details,
            IWampSessionAuthenticator transportAuthenticator)
        {
            if (!transportAuthenticator.IsAuthenticated)
            {
                throw new WampAuthenticationException("Cookie wasn't present");
            }

            return transportAuthenticator;
        }
    }
}