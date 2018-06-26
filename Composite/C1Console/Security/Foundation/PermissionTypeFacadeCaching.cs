using System.Collections.Generic;
using System.Linq;
using Composite.Core.Caching;


namespace Composite.C1Console.Security.Foundation
{
	internal static class PermissionTypeFacadeCaching
	{
        private static readonly string CurrentPermissionTypeCachingKey = "PermissionTypeFacadeCaching_CurrentPermissionTypeCachingKey";
        private static readonly string InheritedPermissionsTypeCachingKey = "PermissionTypeFacadeCaching_InheritedPermissionsTypeCachingKey";
        private static readonly string UserPermissionTypeCachingKey = "PermissionTypeFacadeCaching_UserPermissionTypeCachingKey";
        private static readonly string UserGroupPermissionTypeCachingKey = "UserGroupPermissionTypeCachingKey_UserPermissionTypeCachingKey";


        public static IReadOnlyCollection<PermissionType> GetCurrentPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, CurrentPermissionTypeCachingKey);
        }



        public static void SetCurrentPermissionTypes(UserToken userToken, EntityToken entityToken, IReadOnlyCollection<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, CurrentPermissionTypeCachingKey);
        }



        public static IReadOnlyCollection<PermissionType> GetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, InheritedPermissionsTypeCachingKey);
        }



        public static void SetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken, IReadOnlyCollection<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, InheritedPermissionsTypeCachingKey);
        }



        public static IReadOnlyCollection<PermissionType> GetUserPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, UserPermissionTypeCachingKey);
        }



        public static void SetUserPermissionTypes(UserToken userToken, EntityToken entityToken, IReadOnlyCollection<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, UserPermissionTypeCachingKey);
        }



        public static IReadOnlyCollection<PermissionType> GetUserGroupPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, UserGroupPermissionTypeCachingKey);
        }



        public static void SetUserGroupPermissionTypes(UserToken userToken, EntityToken entityToken, IReadOnlyCollection<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, UserGroupPermissionTypeCachingKey);
        }



        public static bool CachingWorking
        {
            get
            {
                return RequestLifetimeCache.HasKey(UserPermissionTypeCachingKey) && RequestLifetimeCache.HasKey(UserGroupPermissionTypeCachingKey);
            }
        }


        private static void SetToCache(UserToken userToken, EntityToken entityToken, IReadOnlyCollection<PermissionType> permissionTypes, object cachingKey)
        {
            // Using RequestLifetimeCache and there for no thread locking /MRJ

            Dictionary<UserToken, Dictionary<EntityToken, IReadOnlyCollection<PermissionType>>> permissionTypeCache;

            if (RequestLifetimeCache.HasKey(cachingKey))
            {
                permissionTypeCache = RequestLifetimeCache.TryGet<Dictionary<UserToken, Dictionary<EntityToken, IReadOnlyCollection<PermissionType>>>>(cachingKey);
            }
            else
            {
                permissionTypeCache = new Dictionary<UserToken, Dictionary<EntityToken, IReadOnlyCollection<PermissionType>>>();

                RequestLifetimeCache.Add(cachingKey, permissionTypeCache);
            }

            Dictionary<EntityToken, IReadOnlyCollection<PermissionType>> entityTokenPermissionTypes;
            if (!permissionTypeCache.TryGetValue(userToken, out entityTokenPermissionTypes))
            {
                entityTokenPermissionTypes = new Dictionary<EntityToken, IReadOnlyCollection<PermissionType>>();
                permissionTypeCache.Add(userToken, entityTokenPermissionTypes);
            }

            if (!entityTokenPermissionTypes.ContainsKey(entityToken))
            {
                entityTokenPermissionTypes.Add(entityToken, permissionTypes);
            }
            else
            {
                entityTokenPermissionTypes[entityToken] = entityTokenPermissionTypes[entityToken].Concat(permissionTypes).Distinct().ToList();
            }
        }



        private static IReadOnlyCollection<PermissionType> GetFromCache(UserToken userToken, EntityToken entityToken, object cachingKey)
        {
            var permissionTypeCache = RequestLifetimeCache.TryGet<Dictionary<UserToken, Dictionary<EntityToken, IReadOnlyCollection<PermissionType>>>>(cachingKey);

            if (permissionTypeCache == null || !permissionTypeCache.TryGetValue(userToken, out var entityTokenPermissionTypes))
            {
                return null;
            }

            entityTokenPermissionTypes.TryGetValue(entityToken, out var permissionTypes);

            return permissionTypes;
        }
	}
}
