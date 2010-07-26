using Composite.Configuration;
using Composite.Security.Plugins.LoginSessionStore;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Security.Plugins.LoginSessionStore.Runtime
{
    internal class LoginSessionStoreFactory : NameTypeFactoryBase<ILoginSessionStore>
    {
        public LoginSessionStoreFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}

