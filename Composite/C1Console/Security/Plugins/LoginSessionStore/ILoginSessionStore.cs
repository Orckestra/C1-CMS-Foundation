using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime;
using System.Net;

namespace Composite.C1Console.Security.Plugins.LoginSessionStore
{
    /// <exclude />
    [CustomFactory(typeof(LoginSessionStoreCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginSessionStoreDefaultNameRetriever))]
    public interface ILoginSessionStore
    {   
        /// <exclude />
        bool CanPersistAcrossSessions { get; }

        /// <exclude />
        void StoreUsername(string username, bool persistAcrossSessions);

        /// <exclude />
        string StoredUsername { get; }

        /// <exclude />
        void FlushUsername();

        /// <exclude />
        IPAddress UserIpAddress { get; }
    }
}
