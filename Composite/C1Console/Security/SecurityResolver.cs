using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Core.Linq;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SecurityResolver
    {
        /// <exclude />
        public static SecurityResult Resolve(UserToken userToken, ActionToken actionToken, EntityToken entityToken, IEnumerable<UserPermissionDefinition> userPermissionDefinitions, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition)
        {
            if (userToken == null) throw new ArgumentNullException("userToken");
            if (actionToken == null) throw new ArgumentNullException("actionToken");


            return Resolve(userToken, actionToken.PermissionTypes, entityToken, userPermissionDefinitions, userGroupPermissionDefinition);
        }


        /// <exclude />
        public static SecurityResult Resolve(UserToken userToken, IEnumerable<PermissionType> requiredPermissions, EntityToken entityToken, IEnumerable<UserPermissionDefinition> userPermissionDefinitions, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition)
        {
            if (userToken == null) throw new ArgumentNullException("userToken");
            if (requiredPermissions == null) throw new ArgumentNullException("requiredPermissions");

            if ((entityToken is NoSecurityEntityToken) == true) return SecurityResult.Allowed;

            requiredPermissions = requiredPermissions.Evaluate();

            if (!requiredPermissions.Any())
            {
                return SecurityResult.Allowed;
            }

            IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(userToken, entityToken, userPermissionDefinitions, userGroupPermissionDefinition);

            if (!currentPermissionTypes.Any())
            {
                return SecurityResult.Disallowed;
            }

            // At least one of the permissions should be allowed
            foreach (PermissionType permissionType in currentPermissionTypes)
            {
                if (requiredPermissions.Contains(permissionType) == true)
                {
                    return SecurityResult.Allowed;
                }
            }

            return SecurityResult.Disallowed;
        }



        /// <exclude />
        public static SecurityResult Resolve(SecurityToken securityToken)
        {
            if (securityToken == null) throw new ArgumentNullException("securityToken");

            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(securityToken.UserToken.Username);
            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(securityToken.UserToken.Username);

            return Resolve(securityToken.UserToken, securityToken.ActionToken, securityToken.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition);
        }
    }
}
