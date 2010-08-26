using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime
{
    internal class UserGroupPermissionDefinitionProviderFactory : NameTypeFactoryBase<IUserGroupPermissionDefinitionProvider>
    {
        public UserGroupPermissionDefinitionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
