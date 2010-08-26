using Composite.Core.Configuration;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderFactory : NameTypeFactoryBase<ILoginProvider>
    {        
        public LoginProviderFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {            
        }
    }
}
