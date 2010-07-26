using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.UserPermissionDefinitionProvider.Runtime
{
    internal class UserPermissionDefinitionProviderFactory : NameTypeFactoryBase<IUserPermissionDefinitionProvider>
    {
        public UserPermissionDefinitionProviderFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}

