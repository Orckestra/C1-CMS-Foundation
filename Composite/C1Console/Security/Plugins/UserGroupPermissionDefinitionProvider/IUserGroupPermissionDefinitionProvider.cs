using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.C1Console.Security.Plugins.UserGroupPermissionDefinitionProvider.Runtime;


namespace Composite.C1Console.Security.Plugins.UserGroupPermissionDefinitionProvider
{
    [CustomFactory(typeof(UserGroupPermissionDefinitionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(UserGroupPermissionDefinitionProviderDefaultNameRetriever))]
	internal interface IUserGroupPermissionDefinitionProvider
	{
        IEnumerable<UserGroupPermissionDefinition> AllUserGroupPermissionDefinitions { get; }
        bool CanAlterDefinitions { get; }

        IEnumerable<UserGroupPermissionDefinition> GetPermissionsByUserGroup(Guid userGroupId);
        void SetUserGroupPermissionDefinition(UserGroupPermissionDefinition userGroupPermissionDefinition);
        void RemoveUserGroupPermissionDefinition(Guid userGroupId, string serializedEntityToken);
	}
}
