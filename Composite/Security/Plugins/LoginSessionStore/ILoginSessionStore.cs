using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.Security.Plugins.LoginSessionStore.Runtime;
using System.Net;

namespace Composite.Security.Plugins.LoginSessionStore
{
    [CustomFactory(typeof(LoginSessionStoreCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginSessionStoreDefaultNameRetriever))]
    public interface ILoginSessionStore
    {
        bool CanPersistAcrossSessions { get; }

        void StoreUsername(string username, bool persistAcrossSessions);
        string StoredUsername { get; }
        void FlushUsername();

        IPAddress UserIpAddress { get; }
    }
}
