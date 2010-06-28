using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Security.Plugins.LoginSessionStore
{
    internal class LoginSessionStoreData : NameTypeConfigurationElement
    {
        public LoginSessionStoreData() : base("Unnamed", typeof(ILoginSessionStore)) { }

        public LoginSessionStoreData(string name, Type type) : base(name, type) { }
    }
}
