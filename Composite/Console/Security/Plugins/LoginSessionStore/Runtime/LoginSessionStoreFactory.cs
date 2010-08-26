using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime
{
    internal class LoginSessionStoreFactory : NameTypeFactoryBase<ILoginSessionStore>
    {
        public LoginSessionStoreFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}

