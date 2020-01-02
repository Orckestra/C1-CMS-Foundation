using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Composite.Core.Extensions;

namespace Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime
{
    internal class LoginSessionStoreResolver : ILoginSessionStore, ILoginSessionStoreRedirectedLogout
    {
        private readonly IEnumerable<ILoginSessionStore> _loginSessionStores;

        public LoginSessionStoreResolver(IEnumerable<ILoginSessionStore> loginSessionStores)
        {
            _loginSessionStores = loginSessionStores;
        }

        private ILoginSessionStore PreferredLoginSessionStore()
        {
            return _loginSessionStores.FirstOrDefault(f => f.StoredUsername != null);
        }

        public bool CanPersistAcrossSessions => Convert.ToBoolean(
            PreferredLoginSessionStore()?.CanPersistAcrossSessions);

        public void StoreUsername(string username, bool persistAcrossSessions)
        {
            _loginSessionStores.ForEach(f => f.StoreUsername(username, persistAcrossSessions));
        }

        public string StoredUsername => PreferredLoginSessionStore()?.StoredUsername;

        public void FlushUsername()
        {
            _loginSessionStores.ForEach(f => f.FlushUsername());
        }

        public IPAddress UserIpAddress => PreferredLoginSessionStore()?.UserIpAddress;

        public string LogoutUrl => _loginSessionStores
            .OfType<ILoginSessionStoreRedirectedLogout>()
            .Select(_ => _.LogoutUrl)
            .FirstOrDefault(url => !string.IsNullOrEmpty(url));
    }
}