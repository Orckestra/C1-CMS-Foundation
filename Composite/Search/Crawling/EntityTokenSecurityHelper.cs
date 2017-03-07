using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Search.Crawling
{
    internal static class EntityTokenSecurityHelper
    {
        static EntityTokenSecurityHelper()
        {
            DataEvents<IUserPermissionDefinition>.OnStoreChanged += (a,b) => _allUserAccessDefinitions = null;
            DataEvents<IUserPermissionDefinitionPermissionType>.OnStoreChanged += (a, b) => _allUserAccessDefinitions = null;

            DataEvents<IUserGroupPermissionDefinition>.OnStoreChanged += (a, b) => _allUserGroupAccessDefinitions = null;
            DataEvents<IUserGroupPermissionDefinitionPermissionType>.OnStoreChanged += (a, b) => _allUserGroupAccessDefinitions = null;
        }

        class UserAccess
        {
            public string UserName;
            public bool HasAccess;
        }

        class GroupAccess
        {
            public Guid UserGroupId;
            public bool HasAccess;
        }


        private static Dictionary<EntityToken, List<UserAccess>> _allUserAccessDefinitions;
        private static Dictionary<EntityToken, List<GroupAccess>> _allUserGroupAccessDefinitions;

        public static void GetUsersAndGroupsWithReadAccess(EntityToken entityToken,
            out IEnumerable<string> users,
            out IEnumerable<Guid> userGroups)
        {
            var userSet = new HashSet<string>();
            var userGroupSet = new HashSet<Guid>();

            using (ThreadDataManager.EnsureInitialize())
            {
                CollectUsersAndGroupsRec(entityToken,
                    GetUserAccessDefinitions(), GetUserGroupAccessDefinitions(), 
                    ImmutableHashSet<string>.Empty,
                    ImmutableHashSet<Guid>.Empty,
                    userSet, 
                    userGroupSet, 
                    new HashSet<EntityToken>(),
                    20);
            }

            users = userSet;
            userGroups = userGroupSet;
        }


        private static void CollectUsersAndGroupsRec(
            EntityToken entityToken,
            Dictionary<EntityToken, List<UserAccess>> userAccessDefinitions,
            Dictionary<EntityToken, List<GroupAccess>> groupAccessDefinitions,
            ImmutableHashSet<string> usersWithoutAccess,
            ImmutableHashSet<Guid> groupsWithoutAccess,
            HashSet<string> usersWithAccess,
            HashSet<Guid> groupsWithAccess,
            HashSet<EntityToken> alreadyVisited, 
            int depth)
        {
            if(depth < 1) return;

            List<UserAccess> users;
            if (userAccessDefinitions.TryGetValue(entityToken, out users))
            {
                foreach (var user in users)
                {
                    if (!user.HasAccess)
                    {
                        usersWithoutAccess = usersWithoutAccess.Add(user.UserName);
                    }
                    else if(!usersWithoutAccess.Contains(user.UserName))
                    {
                        usersWithAccess.Add(user.UserName);
                    }
                }
            }

            List<GroupAccess> userGroups;
            if (groupAccessDefinitions.TryGetValue(entityToken, out userGroups))
            {
                foreach (var userGroup in userGroups)
                {
                    if (!userGroup.HasAccess)
                    {
                        groupsWithoutAccess = groupsWithoutAccess.Add(userGroup.UserGroupId);
                    }
                    else if (!groupsWithoutAccess.Contains(userGroup.UserGroupId))
                    {
                        groupsWithAccess.Add(userGroup.UserGroupId);
                    }
                }
            }

            alreadyVisited.Add(entityToken);
            var parents = ParentsFacade.GetAllParents(entityToken);

            foreach (var parent in parents)
            {
                if(alreadyVisited.Contains(parent)) return;

                CollectUsersAndGroupsRec(parent, 
                    userAccessDefinitions, groupAccessDefinitions, 
                    usersWithoutAccess, groupsWithoutAccess,
                    usersWithAccess, groupsWithAccess,
                    alreadyVisited, depth - 1);
            }
        }

        private static Dictionary<EntityToken, List<UserAccess>> GetUserAccessDefinitions()
        {
            var result = _allUserAccessDefinitions;
            if (result != null)
            {
                return result;
            }

            result = UserPermissionDefinitionProviderPluginFacade.AllUserPermissionDefinitions
                .Select(pd => new 
                {
                    pd.EntityToken, pd.Username,
                    HasAccess = pd.PermissionTypes.Contains(PermissionType.Read)
                })
                .Where(a => a.EntityToken != null && a.EntityToken.IsValid())
                .GroupBy(a => a.EntityToken)
                .ToDictionary(group => group.Key, 
                            group => group.Select(a => new UserAccess {UserName = a.Username, HasAccess = a.HasAccess })
                            .ToList());
            
            _allUserAccessDefinitions = result;

            return result;
        }

        private static Dictionary<EntityToken, List<GroupAccess>> GetUserGroupAccessDefinitions()
        {
            var result = _allUserGroupAccessDefinitions;
            if (result != null)
            {
                return result;
            }

            result = UserGroupPermissionDefinitionProviderPluginFacade.AllUserGroupPermissionDefinitions
                .Select(pd => new
                {
                    pd.EntityToken,
                    pd.UserGroupId,
                    HasAccess = pd.PermissionTypes.Contains(PermissionType.Read)
                })
                .Where(a => a.EntityToken != null && a.EntityToken.IsValid())
                .GroupBy(a => a.EntityToken)
                .ToDictionary(group => group.Key,
                            group => group.Select(a => new GroupAccess
                            {
                                UserGroupId = a.UserGroupId,
                                HasAccess = a.HasAccess
                            })
                            .ToList());

            _allUserGroupAccessDefinitions = result;

            return result;
        }
    }
}
