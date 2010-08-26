using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    internal class UserPermissionDefinitionProviderFactory : NameTypeFactoryBase<IUserPermissionDefinitionProvider>
    {
        public UserPermissionDefinitionProviderFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}

