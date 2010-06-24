using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime
{
    internal class UserGroupPermissionDefinitionProviderFactory : NameTypeFactoryBase<IUserGroupPermissionDefinitionProvider>
    {
        public UserGroupPermissionDefinitionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
