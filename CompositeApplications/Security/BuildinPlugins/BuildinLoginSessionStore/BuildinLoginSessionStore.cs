using System.Net;
using Composite.Security.Plugins.LoginSessionStore;


namespace Composite.Security.BuildinPlugins.BuildinLoginSessionStore
{
    internal class BuildinLoginSessionStore : ILoginSessionStore
	{
        public static string Username { get { return "testUser"; } }

        string _username = Username;

        public bool CanPersistAcrossSessions
        {
            get { return true; }
        }

        public void StoreUsername(string username, bool persistAcrossSessions)
        {
            _username = username;
        }

        public void FlushUsername()
        {
            _username = Username;
        }

        public string StoredUsername
        {
            get { return _username; }
        }

        public IPAddress UserIpAddress
        {
            get { return IPAddress.Loopback; }
        }
    }
}
