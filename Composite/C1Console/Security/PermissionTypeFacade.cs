using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.C1Console.Security.Foundation;
using Composite.Core;
using Composite.Core.Linq;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PermissionTypeFacade
    {
        private static readonly IReadOnlyCollection<PermissionType> EmptyPermissionTypeCollection = new PermissionType[0];

        /// <exclude />
        public static IEnumerable<PermissionType> GetLocallyDefinedUserPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            Verify.ArgumentNotNull(userToken, "userToken");
            Verify.ArgumentNotNull(entityToken, "entityToken");

            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = GetUserPermissionDefinitions(userToken.Username);

            var result = new List<PermissionType>();

            foreach (UserPermissionDefinition userPermissionDefinition in userPermissionDefinitions)
            {
                if (userPermissionDefinition.EntityToken.EqualsWithVersionIgnore(entityToken))
                {
                    result.AddRange(userPermissionDefinition.PermissionTypes);
                }
            }

            return result.Distinct();
        }



        /// <exclude />
        public static IEnumerable<PermissionType> GetLocallyDefinedUserGroupPermissionTypes(Guid userGroupId, EntityToken entityToken)
        {
            Verify.ArgumentNotNull(userGroupId, "userGroupId");
            Verify.ArgumentNotNull(entityToken, "entityToken");

            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions = GetUserGroupPermissionDefinitions(userGroupId);

            var result = new List<PermissionType>();

            foreach (UserGroupPermissionDefinition userGroupPermissionDefinition in userGroupPermissionDefinitions)
            {
                if (userGroupPermissionDefinition.EntityToken.EqualsWithVersionIgnore(entityToken))
                {
                    result.AddRange(userGroupPermissionDefinition.PermissionTypes);
                }
            }

            return result.Distinct();
        }


        /// <exclude />
        public static IEnumerable<PermissionType> GetLocallyDefinedUserGroupPermissionTypes(string username, EntityToken entityToken)
        {
            List<Guid> userGroupIds = UserGroupFacade.GetUserGroupIds(username);

            IEnumerable<PermissionType> permissionTypes = new List<PermissionType>();
            foreach (Guid userGroupId in userGroupIds)
            {
                IEnumerable<PermissionType> localPermissionTypes = GetLocallyDefinedUserGroupPermissionTypes(userGroupId, entityToken);
                permissionTypes = permissionTypes.Concat(localPermissionTypes);
            }

            return permissionTypes.Distinct();
        }


        /// <summary>
        /// This returns a merged result of user permissions and user group permissions
        /// </summary>
        /// <param name="userToken"></param>
        /// <param name="entityToken"></param>
        /// <param name="userPermissionDefinitions"></param>
        /// <param name="userGroupPermissionDefinitions"></param>
        /// <returns></returns>
        public static IEnumerable<PermissionType> GetCurrentPermissionTypes(UserToken userToken, EntityToken entityToken, IEnumerable<UserPermissionDefinition> userPermissionDefinitions, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions)
        {
            Verify.ArgumentNotNull(userToken, "userToken");
            Verify.ArgumentNotNull(entityToken, "entityToken");

            IReadOnlyCollection<PermissionType> resultPermissionTypes = PermissionTypeFacadeCaching.GetCurrentPermissionTypes(userToken, entityToken);
            if (resultPermissionTypes != null)
            {
                return resultPermissionTypes;
            }

            IReadOnlyCollection<PermissionType> userPermissionTypes = PermissionTypeFacadeCaching.GetUserPermissionTypes(userToken, entityToken);
            if (userPermissionTypes == null)
            {
                userPermissionTypes = RecursiveUpdateCurrentUserPermissionTypes(userToken, entityToken, userPermissionDefinitions, new HashSet<EntityTokenPair>());

                PermissionTypeFacadeCaching.SetUserPermissionTypes(userToken, entityToken, userPermissionTypes);
            }

            IReadOnlyCollection<PermissionType> userGroupPermissionTypes = PermissionTypeFacadeCaching.GetUserGroupPermissionTypes(userToken, entityToken);
            if (userGroupPermissionTypes == null)
            {
                userGroupPermissionTypes = RecursiveUpdateCurrentUserGroupPermissionTypes(userToken, entityToken, userGroupPermissionDefinitions, new HashSet<EntityTokenPair>());

                PermissionTypeFacadeCaching.SetUserGroupPermissionTypes(userToken, entityToken, userGroupPermissionTypes);
            }

            resultPermissionTypes = new List<PermissionType>(userPermissionTypes.Concat(userGroupPermissionTypes).Distinct());

            if (resultPermissionTypes.Contains(PermissionType.ClearPermissions))
            {
                resultPermissionTypes = EmptyPermissionTypeCollection;
            }

            PermissionTypeFacadeCaching.SetCurrentPermissionTypes(userToken, entityToken, resultPermissionTypes);

            return resultPermissionTypes;
        }



        /// <summary>
        /// This returns a merged result of user permissions and user group permissions
        /// </summary>
        /// <param name="userToken"></param>
        /// <param name="entityToken"></param>
        /// <returns></returns>
        public static IEnumerable<PermissionType> GetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetInheritedPermissionsTypes(userToken, entityToken, null);
        }



        /// <summary>
        /// This returns a merged result of user permissions and user group permissions
        /// </summary>
        /// <param name="userToken"></param>
        /// <param name="entityToken"></param>
        /// <param name="presetUserGroupPermissions">
        /// This is used for simulating that local defined user group permissions has been set
        /// </param>
        /// <returns></returns>
        public static IEnumerable<PermissionType> GetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken, Dictionary<Guid, IEnumerable<PermissionType>> presetUserGroupPermissions)
        {
            if (userToken == null) throw new ArgumentNullException("userToken");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            IEnumerable<PermissionType> permissionTypes = PermissionTypeFacadeCaching.GetInheritedPermissionsTypes(userToken, entityToken);
            if (permissionTypes != null)
            {
                return permissionTypes;
            }

            if (presetUserGroupPermissions == null || presetUserGroupPermissions.Count == 0)
            {
                ICollection<PermissionType> localDefinedUserGroupPermissionTypes = GetLocallyDefinedUserGroupPermissionTypes(userToken.Username, entityToken).Evaluate();
                if (localDefinedUserGroupPermissionTypes.Count > 0)
                {
                    PermissionTypeFacadeCaching.SetInheritedPermissionsTypes(userToken, entityToken, localDefinedUserGroupPermissionTypes.ToList());
                    return localDefinedUserGroupPermissionTypes;
                }
            }
            else
            {
                List<Guid> userGroupIds = UserGroupFacade.GetUserGroupIds(userToken.Username);

                var localDefinedUserGroupPermissionTypes = new List<PermissionType>();
                foreach (Guid userGroupId in userGroupIds)
                {
                    IEnumerable<PermissionType> groupPermissionTypes;
                    if (presetUserGroupPermissions.TryGetValue(userGroupId, out groupPermissionTypes))
                    {
                        localDefinedUserGroupPermissionTypes.AddRange(groupPermissionTypes);
                    }
                }

                if (localDefinedUserGroupPermissionTypes.Contains(PermissionType.ClearPermissions))
                {
                    return new PermissionType[0];
                }
                
                return localDefinedUserGroupPermissionTypes.Distinct();
            }

            ICollection<UserPermissionDefinition> userPermissionDefinitions = GetUserPermissionDefinitions(userToken.Username).Evaluate();
            ICollection<UserGroupPermissionDefinition> userGroupPermissionDefinitions = GetUserGroupPermissionDefinitions(userToken.Username).Evaluate();

            List<EntityToken> parentEntityTokens = ParentsFacade.GetAllParents(entityToken);
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                RecursiveUpdateCurrentUserPermissionTypes(userToken, parentEntityToken, userPermissionDefinitions, new HashSet<EntityTokenPair>());
                RecursiveUpdateCurrentUserGroupPermissionTypes(userToken, parentEntityToken, userGroupPermissionDefinitions, new HashSet<EntityTokenPair>());
            }


            if (!PermissionTypeFacadeCaching.CachingWorking)
            {
                throw new InvalidOperationException("RequestLifetimeCache is not operational");
            }


            permissionTypes = new List<PermissionType>();
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                IEnumerable<PermissionType> parentUserPermissionTypes = PermissionTypeFacadeCaching.GetUserPermissionTypes(userToken, parentEntityToken);
                if (parentUserPermissionTypes != null)
                {
                    permissionTypes = permissionTypes.Concat(parentUserPermissionTypes);
                }

                IEnumerable<PermissionType> parentUserGroupPermissionTypes = PermissionTypeFacadeCaching.GetUserGroupPermissionTypes(userToken, parentEntityToken);
                if (parentUserGroupPermissionTypes != null)
                {
                    permissionTypes = permissionTypes.Concat(parentUserGroupPermissionTypes);
                }
            }

            var distinctPermissionTypes = permissionTypes.Distinct().ToList();

            PermissionTypeFacadeCaching.SetInheritedPermissionsTypes(userToken, entityToken, distinctPermissionTypes);

            return distinctPermissionTypes;
        }



        /// <summary>
        /// This uses a merged result of user permissions and user group permissions
        /// </summary>
        /// <param name="userToken"></param>
        /// <param name="entityToken"></param>
        /// <param name="userPermissionDefinitions"></param>
        /// <param name="userGroupPermissionDefinitions"></param>
        /// <returns></returns>
        public static bool IsSubBrachContainingPermissionTypes(UserToken userToken, EntityToken entityToken, IEnumerable<UserPermissionDefinition> userPermissionDefinitions, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions)
        {
            Verify.ArgumentNotNull(userToken, "userToken");
            Verify.ArgumentNotNull(entityToken, "entityToken");

            IEnumerable<PermissionType> permissionTypes = GetCurrentPermissionTypes(userToken, entityToken, userPermissionDefinitions, userGroupPermissionDefinitions);

            if (permissionTypes.Any())
            {
                return true;
            }

            // User permissions
            foreach (UserPermissionDefinition userPermissionDefinition in userPermissionDefinitions)
            {
                if (!userPermissionDefinition.PermissionTypes.Contains(PermissionType.ClearPermissions))
                {
                    var graph = new RelationshipGraph(userPermissionDefinition.EntityToken, RelationshipGraphSearchOption.Both, true);

                    if (graph.Levels.Any(level => level.AllEntities.Contains(entityToken)))
                    {
                        return true;
                    }
                }
            }

            // User group permissions
            foreach (UserGroupPermissionDefinition userGroupPermissionDefinition in userGroupPermissionDefinitions)
            {
                if (!userGroupPermissionDefinition.PermissionTypes.Contains(PermissionType.ClearPermissions))
                {
                    var graph = new RelationshipGraph(userGroupPermissionDefinition.EntityToken, RelationshipGraphSearchOption.Both, true);

                    if (graph.Levels.Any(level => level.AllEntities.Contains(entityToken)))
                    {
                        return true;
                    }
                }
            }

            return false;
        }



        /// <exclude />
        public static IEnumerable<PermissionType> GetInheritedGroupPermissionsTypes(Guid userGroupId, EntityToken entityToken)
        {
            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions = GetUserGroupPermissionDefinitions(userGroupId);

            List<EntityToken> parentEntityTokens = ParentsFacade.GetAllParents(entityToken);

            List<PermissionType> permissionTypes = new List<PermissionType>();
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                permissionTypes.AddRange(GetInheritedGroupPermissionsTypesRecursivly(parentEntityToken, userGroupPermissionDefinitions));
            }

            return permissionTypes.Distinct();
        }



        /// <exclude />
        public static IEnumerable<UserPermissionDefinition> GetUserPermissionDefinitions(string username)
        {
            Verify.ArgumentNotNullOrEmpty(username, "username");

            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = UserPermissionDefinitionProviderPluginFacade.GetPermissionsByUser(username);

            var result = new List<UserPermissionDefinition>();
            foreach (UserPermissionDefinition userPermissionDefinition in userPermissionDefinitions)
            {
                EntityToken entityToken = userPermissionDefinition.EntityToken;
                if (entityToken == null)
                {
                    continue;
                }

                if (!entityToken.IsValid())
                {
                    if (UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions)
                    {
                        Log.LogWarning("PermissionTypeFacade", "System removing invalid permission setting for user '{0}' because the data entity token could not be validated. Token was '{1}'.", username, userPermissionDefinition.SerializedEntityToken);
                        UserPermissionDefinitionProviderPluginFacade.RemoveUserPermissionDefinition(new UserToken(username), userPermissionDefinition.SerializedEntityToken);
                    }
                    continue;
                }
                
                result.Add(userPermissionDefinition);
            }

            return result;
        }



        /// <exclude />
        public static IEnumerable<UserGroupPermissionDefinition> GetUserGroupPermissionDefinitions(string username)
        {
            List<Guid> userGroupIds = UserGroupFacade.GetUserGroupIds(username);

            foreach (Guid userGroupId in userGroupIds)
            {
                foreach (UserGroupPermissionDefinition userGroupPermissionDefinition in GetUserGroupPermissionDefinitions(userGroupId))
                {
                    yield return userGroupPermissionDefinition;
                }
            }
        }



        /// <exclude />
        public static IEnumerable<UserGroupPermissionDefinition> GetUserGroupPermissionDefinitions(Guid userGroupId)
        {
            if (userGroupId == Guid.Empty) throw new ArgumentException("Guid value is empty", "userGroupId");

            IEnumerable<UserGroupPermissionDefinition> userPermissionDefinitions = UserGroupPermissionDefinitionProviderPluginFacade.GetPermissionsByUserGroup(userGroupId);

            var result = new List<UserGroupPermissionDefinition>();
            foreach (UserGroupPermissionDefinition userPermissionDefinition in userPermissionDefinitions)
            {
                var entityToken = userPermissionDefinition.EntityToken;
                if (entityToken == null)
                {
                    continue;
                }

                if (!entityToken.IsValid())
                {
                    if (UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions)
                    {
                        Log.LogWarning("PermissionTypeFacade", "System removing invalid permission setting for user group '{0}' because the data entity token could not be validated. Token was '{1}'.", userGroupId, userPermissionDefinition.SerializedEntityToken);
                        UserGroupPermissionDefinitionProviderPluginFacade.RemoveUserGroupPermissionDefinition(userGroupId, userPermissionDefinition.SerializedEntityToken);
                    }
                    continue;
                }
                
                result.Add(userPermissionDefinition);
            }

            return result;
        }



        /// <exclude />
        public static bool CanAlterDefinitions
        {
            get
            {
                return UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions;
            }
        }



        /// <exclude />
        public static void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition)
        {
            if (userPermissionDefinition == null) throw new ArgumentNullException("userPermissionDefinition");

            if (userPermissionDefinition.EntityToken is NoSecurityEntityToken) return;

            if (userPermissionDefinition.PermissionTypes.Contains(PermissionType.ClearPermissions) &&
                userPermissionDefinition.PermissionTypes.Count() > 1)
            {
                throw new ArgumentException(string.Format("The permission type '{0}' may not be used with other permission types", PermissionType.ClearPermissions));
            }

            if (!UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions) throw new InvalidOperationException("The user permission definition provider does not support altering user permission defintions");

            EntityTokenCacheFacade.ClearCache();

            UserPermissionDefinitionProviderPluginFacade.SetUserPermissionDefinition(userPermissionDefinition);
        }



        /// <exclude />
        public static void RemoveUserPermissionDefinition(UserToken userToken, EntityToken entityToken)
        {
            if (userToken == null) throw new ArgumentNullException("userToken");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            if ((entityToken is NoSecurityEntityToken)) return;

            if (!UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions) throw new InvalidOperationException("The user permission definition provider does not support altering user permission defintions");

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            EntityTokenCacheFacade.ClearCache();

            UserPermissionDefinitionProviderPluginFacade.RemoveUserPermissionDefinition(userToken, serializedEntityToken);
        }



        /// <exclude />
        public static void SetUserGroupPermissionDefinition(UserGroupPermissionDefinition userGroupPermissionDefinition)
        {
            Verify.ArgumentNotNull(userGroupPermissionDefinition, "userGroupPermissionDefinition");

            if (userGroupPermissionDefinition.EntityToken is NoSecurityEntityToken) return;

            if (userGroupPermissionDefinition.PermissionTypes.Contains(PermissionType.ClearPermissions) &&
                (userGroupPermissionDefinition.PermissionTypes.Count() > 1))
            {
                throw new ArgumentException(string.Format("The permission type '{0}' may not be used with other permission types", PermissionType.ClearPermissions));
            }

            Verify.That(UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions, "The user permission definition provider does not support altering user permission defintions");

            EntityTokenCacheFacade.ClearCache();

            UserGroupPermissionDefinitionProviderPluginFacade.SetUserGroupPermissionDefinition(userGroupPermissionDefinition);
        }



        /// <exclude />
        public static void RemoveUserPermissionDefinition(Guid userGroupId, EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            if ((entityToken is NoSecurityEntityToken)) return;

            if (!UserPermissionDefinitionProviderPluginFacade.CanAlterDefinitions) throw new InvalidOperationException("The user permission definition provider does not support altering user permission defintions");

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            EntityTokenCacheFacade.ClearCache();

            UserGroupPermissionDefinitionProviderPluginFacade.RemoveUserGroupPermissionDefinition(userGroupId, serializedEntityToken);
        }



        /// <exclude />
        public static IEnumerable<PermissionType> AllPermissionTypes
        {
            get
            {
                foreach (PermissionType permissionType in GrantingPermissionTypes)
                {
                    yield return permissionType;
                }

                yield return PermissionType.ClearPermissions;
            }
        }



        /// <exclude />
        public static IEnumerable<PermissionType> GrantingPermissionTypes
        {
            get
            {
                yield return PermissionType.Read;
                yield return PermissionType.Add;
                yield return PermissionType.Edit;
                yield return PermissionType.Delete;
                yield return PermissionType.Approve;
                yield return PermissionType.Publish;
                yield return PermissionType.Configure;
                yield return PermissionType.Administrate;
            }
        }



        /// <exclude />
        public static IEnumerable<PermissionDescriptor> AllPermissionDescriptors
        {
            get
            {
                foreach (PermissionType permissionType in AllPermissionTypes)
                {
                    yield return new PermissionDescriptor(permissionType);
                }
            }
        }



        /// <exclude />
        public static IEnumerable<PermissionDescriptor> GrantingPermissionDescriptors
        {
            get
            {
                foreach (PermissionType permissionType in GrantingPermissionTypes)
                {
                    yield return new PermissionDescriptor(permissionType);
                }
            }
        }



        private static IReadOnlyCollection<PermissionType> RecursiveUpdateCurrentUserPermissionTypes(UserToken userToken, EntityToken entityToken, IEnumerable<UserPermissionDefinition> userPermissionDefinitions, HashSet<EntityTokenPair> alreadyProcessedTokens)
        {
            IReadOnlyCollection<PermissionType> cached = PermissionTypeFacadeCaching.GetUserPermissionTypes(userToken, entityToken);
            if (cached != null)
            {
                return cached;
            }

            UserPermissionDefinition userPermissionDefinition = userPermissionDefinitions
                .Where(f => entityToken.EqualsWithVersionIgnore(f.EntityToken)).SingleOrDefaultOrException("More then one UserPermissionDefinition for the same entity token");

            var thisPermisstionTypes = new List<PermissionType>();
            if (userPermissionDefinition != null)
            {
                thisPermisstionTypes.AddRange(userPermissionDefinition.PermissionTypes);
            }


            if (thisPermisstionTypes.Count > 0)
            {
                thisPermisstionTypes = thisPermisstionTypes.Distinct().ToList();

                if (thisPermisstionTypes.Contains(PermissionType.ClearPermissions))
                {
                    thisPermisstionTypes = new List<PermissionType>();
                }

                PermissionTypeFacadeCaching.SetUserPermissionTypes(userToken, entityToken, thisPermisstionTypes);

                // Local defined permission overrules all other permissions
                return thisPermisstionTypes;
            }

            // Call resursively on all parents
            List<EntityToken> parentEntityTokens = ParentsFacade.GetAllParents(entityToken);

            IEnumerable<PermissionType> parentsPermisstionTypes = new List<PermissionType>();
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                EntityTokenPair pair = new EntityTokenPair(entityToken, parentEntityToken);
                if (alreadyProcessedTokens.Contains(pair) == false)
                {
                    alreadyProcessedTokens.Add(pair);

                    IEnumerable<PermissionType> thisParentPermisstionTypes = RecursiveUpdateCurrentUserPermissionTypes(userToken, parentEntityToken, userPermissionDefinitions, alreadyProcessedTokens);

                    parentsPermisstionTypes = parentsPermisstionTypes.Concat(thisParentPermisstionTypes);
                }
            }

            List<PermissionType> permisstionTypes = parentsPermisstionTypes.Distinct().ToList();

            PermissionTypeFacadeCaching.SetUserPermissionTypes(userToken, entityToken, permisstionTypes);

            return permisstionTypes;
        }





        private static IReadOnlyCollection<PermissionType> RecursiveUpdateCurrentUserGroupPermissionTypes(UserToken userToken, EntityToken entityToken, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions, HashSet<EntityTokenPair> alreadyProcessedTokens)
        {
            IReadOnlyCollection<PermissionType> cached = PermissionTypeFacadeCaching.GetUserGroupPermissionTypes(userToken, entityToken);
            if (cached != null)
            {
                return cached;
            }

            IEnumerable<UserGroupPermissionDefinition> selectedUserGroupPermissionDefinitions = userGroupPermissionDefinitions.Where(f => entityToken.EqualsWithVersionIgnore(f.EntityToken));

            List<PermissionType> thisPermisstionTypes = new List<PermissionType>();
            foreach (UserGroupPermissionDefinition userGroupPermissionDefinition in selectedUserGroupPermissionDefinitions)
            {
                List<PermissionType> groupPermissionTypes = userGroupPermissionDefinition.PermissionTypes.ToList();

                thisPermisstionTypes.AddRange(groupPermissionTypes);
            }

            if (thisPermisstionTypes.Count > 0)
            {
                thisPermisstionTypes = thisPermisstionTypes.Distinct().ToList();

                if (thisPermisstionTypes.Contains(PermissionType.ClearPermissions))
                {
                    thisPermisstionTypes = new List<PermissionType>();
                }

                PermissionTypeFacadeCaching.SetUserGroupPermissionTypes(userToken, entityToken, thisPermisstionTypes);

                // Local defined permission overrules all other permissions
                return thisPermisstionTypes;
            }

            // Call resursively on all parents
            List<EntityToken> parentEntityTokens = ParentsFacade.GetAllParents(entityToken);

            IEnumerable<PermissionType> parentsPermisstionTypes = new List<PermissionType>();
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                EntityTokenPair pair = new EntityTokenPair(entityToken, parentEntityToken);
                if (alreadyProcessedTokens.Contains(pair) == false)
                {
                    alreadyProcessedTokens.Add(pair);

                    IEnumerable<PermissionType> thisParentPermisstionTypes = RecursiveUpdateCurrentUserGroupPermissionTypes(userToken, parentEntityToken, userGroupPermissionDefinitions, alreadyProcessedTokens);

                    parentsPermisstionTypes = parentsPermisstionTypes.Concat(thisParentPermisstionTypes);
                }
            }

            List<PermissionType> permisstionTypes = parentsPermisstionTypes.Distinct().ToList();

            PermissionTypeFacadeCaching.SetUserGroupPermissionTypes(userToken, entityToken, permisstionTypes);

            return permisstionTypes;
        }
        


        private static IEnumerable<PermissionType> GetInheritedGroupPermissionsTypesRecursivly(EntityToken entityToken, IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions, List<EntityToken> visitedParents = null)
        {
            UserGroupPermissionDefinition selectedUserGroupPermissionDefinition = userGroupPermissionDefinitions.Where(f => entityToken.EqualsWithVersionIgnore(f.EntityToken)).SingleOrDefault();
            if (selectedUserGroupPermissionDefinition != null)
            {
                if (selectedUserGroupPermissionDefinition.PermissionTypes.Contains(PermissionType.ClearPermissions) == false)
                {
                    foreach (PermissionType permissionType in selectedUserGroupPermissionDefinition.PermissionTypes)
                    {
                        yield return permissionType;
                    }
                }

                yield break;
            }

            List<EntityToken> parentEntityTokens = ParentsFacade.GetAllParents(entityToken);           

            if (visitedParents == null)
            {
                visitedParents = new List<EntityToken>();
            }

            IEnumerable<PermissionType> parentsPermisstionTypes = new List<PermissionType>();
            foreach (EntityToken parentEntityToken in parentEntityTokens)
            {
                if (visitedParents.Contains(parentEntityToken)) continue;
                visitedParents.Add(parentEntityToken);

                IEnumerable<PermissionType> result = GetInheritedGroupPermissionsTypesRecursivly(parentEntityToken, userGroupPermissionDefinitions, visitedParents).ToList();

                parentsPermisstionTypes = parentsPermisstionTypes.Concat(result);
            }

            foreach (PermissionType permissionType in parentsPermisstionTypes.Distinct())
            {
                yield return permissionType;
            }
        }




        private sealed class EntityTokenPair
        {
            public EntityTokenPair(EntityToken firstEntityToken, EntityToken secondEntityToken)
            {
                this.FirstEntityToken = firstEntityToken;
                this.SecondEntityToken = secondEntityToken;
            }


            public EntityToken FirstEntityToken { get; private set; }
            public EntityToken SecondEntityToken { get; private set; }


            public override int GetHashCode()
            {
                return this.FirstEntityToken.GetHashCode() ^ this.SecondEntityToken.GetHashCode();
            }


            public bool Equals(EntityTokenPair entityTokenPair)
            {
                if (entityTokenPair == null) return false;

                return this.FirstEntityToken.EqualsWithVersionIgnore(entityTokenPair.FirstEntityToken) &&
                       this.SecondEntityToken.EqualsWithVersionIgnore(entityTokenPair.SecondEntityToken);
            }


            public override bool Equals(object obj)
            {
                return Equals(obj as EntityTokenPair);
            }
        }
    }
}
