using System.Net;
using Composite.C1Console.Security.Plugins.LoginSessionStore;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using WampSharp.V2;

namespace Composite.Plugins.Security.LoginSessionStores.WampContextBasedLoginSessionStore
{
    
    [ApplicationStartup]
    internal class WampContextBasedLoginSessionStoreRegistrator
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(INoneConfigurationBasedLoginSessionStore),
                typeof(WampContextBasedBasedLoginSessionStore));
        }
    }

    internal class WampContextBasedBasedLoginSessionStore : INoneConfigurationBasedLoginSessionStore
    {
        public bool CanPersistAcrossSessions => false;

        public void StoreUsername(string username, bool persistAcrossSessions)
        {
        }

        public string StoredUsername
        {
            get
            {
                if (WampInvocationContext.Current != null)
                {
                    return WampInvocationContext.Current.InvocationDetails.CallerAuthenticationId;
                }

                return null;
            }
        }
        public void FlushUsername()
        {
        }

        public IPAddress UserIpAddress => null;

    }
}
