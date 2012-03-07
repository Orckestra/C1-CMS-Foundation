using System.Collections.Generic;
using System.ComponentModel;
using Composite.Core.Linq;


namespace Composite.C1Console.Security
{
    /// <summary>
    /// This class can be use to get allowed permissions for current user or given UserToken and an EntityToken.
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class PermissionsFacade
    {
        /// <summary>
        /// This method will return all allowed permission for the current logged in user given the <paramref name="entityToken"/>.
        /// </summary>
        /// <param name="entityToken">EntityToken to get permissions for.</param>
        /// <returns>Allowed permission types</returns>
        public static IEnumerable<PermissionType> GetPermissionsForCurrentUser(EntityToken entityToken)
        {
            UserToken userToken = UserValidationFacade.GetUserToken();

            return GetPermissions(userToken, entityToken);
        }


        /// <summary>
        /// This method will return all allowed permission for the given <paramref name="userToken"/> and given the <paramref name="entityToken"/>.
        /// </summary>
        /// <param name="userToken">UserToken to get permissions for.</param>
        /// <param name="entityToken">EntityToken to get permissions for.</param>
        /// <returns>Allowed permission types</returns>
        public static IEnumerable<PermissionType> GetPermissions(UserToken userToken, EntityToken entityToken)
        {
            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username);
            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username);

            IEnumerable<PermissionType> permissions = PermissionTypeFacade.GetCurrentPermissionTypes(userToken, entityToken, userPermissionDefinitions, userGroupPermissionDefinitions).Evaluate();

            return permissions;
        }
    }
}
