using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.C1Console.Security.Plugins.LoginSessionStore
{
    /// <exclude />
    public class LoginSessionStoreData : NameTypeConfigurationElement
    {
        /// <exclude />
        public LoginSessionStoreData() : base("Unnamed", typeof(ILoginSessionStore)) { }

        /// <exclude />
        public LoginSessionStoreData(string name, Type type) : base(name, type) { }
    }
}
