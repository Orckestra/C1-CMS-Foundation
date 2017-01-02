using WampSharp.V2.Authentication;
using WampSharp.V2.Core.Contracts;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class UserNameBasedAuthorizer : IWampAuthorizer
    {
        public bool CanRegister(RegisterOptions options, string procedure)
        {
            return true;
        }

        public bool CanCall(CallOptions options, string procedure)
        {
            options.DiscloseMe = true;
            return true;
        }

        public bool CanPublish(PublishOptions options, string topicUri)
        {
            return true;
        }

        public bool CanSubscribe(SubscribeOptions options, string topicUri)
        {
            return true;
        }

    }
}