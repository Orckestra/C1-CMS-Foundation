using System.Collections.Generic;
using Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider
{
    [CustomFactory(typeof(UserPermissionDefinitionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(UserPermissionDefinitionProviderDefaultNameRetriever))]
	internal interface IUserPermissionDefinitionProvider
	{
        IEnumerable<UserPermissionDefinition> AllUserPermissionDefinitions { get; }
        bool CanAlterDefinitions { get; }

        IEnumerable<UserPermissionDefinition> GetPermissionsByUser(string userName);
        void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition);
        void RemoveUserPermissionDefinition(UserToken userToken, string serializedEntityToken);
	}
}
