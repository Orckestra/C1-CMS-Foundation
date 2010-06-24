using Composite.Configuration;

using Composite.ConfigurationSystem;
using Composite.Security.Plugins.LoginProvider;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderFactory : NameTypeFactoryBase<ILoginProvider>
    {        
        public LoginProviderFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {            
        }
    }
}
