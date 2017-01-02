using System.Linq;
using Composite.Core;
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

        public new ILoginSessionStore CreateDefault()
        {
            var loginSessionstores =
                (ServiceLocator.GetServices<INoneConfigurationBasedLoginSessionStore>()??
                Enumerable.Empty<ILoginSessionStore>())
                .Union(new[] { base.CreateDefault() });

            return new LoginSessionStoreResolver(loginSessionstores);
        }
    }
}

