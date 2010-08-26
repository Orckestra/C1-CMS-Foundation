using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime;
using System.Net;

namespace Composite.C1Console.Security.Plugins.LoginSessionStore
{
    [CustomFactory(typeof(LoginSessionStoreCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginSessionStoreDefaultNameRetriever))]
    internal interface ILoginSessionStore
    {
        bool CanPersistAcrossSessions { get; }

        void StoreUsername(string username, bool persistAcrossSessions);
        string StoredUsername { get; }
        void FlushUsername();

        IPAddress UserIpAddress { get; }
    }
}
