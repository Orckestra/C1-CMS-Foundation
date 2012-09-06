using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using Composite.C1Console.Elements;
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



        /// <summary>
        /// This method returns true if the given username <paramref name="username"/> has admin rights on the root element.
        /// This is normal way of creating a administrator in C1.
        /// </summary>
        /// <param name="username">Username to test</param>
        /// <returns>True if the given username has admin rights on the root element.</returns>
        public static bool IsAdministrator(string username)
        {
            UserToken userToken = new UserToken(username);

            EntityToken rootEntityToken = ElementFacade.GetRootsWithNoSecurity().First().ElementHandle.EntityToken;

            IEnumerable<PermissionType> permissions = GetPermissions(userToken, rootEntityToken);

            return permissions.Contains(PermissionType.Administrate);
        }
    }
}
