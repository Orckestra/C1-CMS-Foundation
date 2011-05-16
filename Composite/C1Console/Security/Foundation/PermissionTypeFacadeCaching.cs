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


        public static List<PermissionType> GetCurrentPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, CurrentPermissionTypeCachingKey);
        }



        public static void SetCurrentPermissionTypes(UserToken userToken, EntityToken entityToken, List<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, CurrentPermissionTypeCachingKey);
        }



        public static List<PermissionType> GetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, InheritedPermissionsTypeCachingKey);
        }



        public static void SetInheritedPermissionsTypes(UserToken userToken, EntityToken entityToken, List<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, InheritedPermissionsTypeCachingKey);
        }



        public static List<PermissionType> GetUserPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, UserPermissionTypeCachingKey);
        }



        public static void SetUserPermissionTypes(UserToken userToken, EntityToken entityToken, List<PermissionType> permissionTypes)
        {
            SetToCache(userToken, entityToken, permissionTypes, UserPermissionTypeCachingKey);
        }



        public static List<PermissionType> GetUserGroupPermissionTypes(UserToken userToken, EntityToken entityToken)
        {
            return GetFromCache(userToken, entityToken, UserGroupPermissionTypeCachingKey);
        }



        public static void SetUserGroupPermissionTypes(UserToken userToken, EntityToken entityToken, List<PermissionType> permissionTypes)
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


        private static void SetToCache(UserToken userToken, EntityToken entityToken, List<PermissionType> permissionTypes, object cachingKey)
        {
            // Using RequestLifetimeCache and there for no thread locking /MRJ

            Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>> permissionTypeCache;

            if (RequestLifetimeCache.HasKey(cachingKey) == true)
            {
                permissionTypeCache = RequestLifetimeCache.TryGet<Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>>>(cachingKey);
            }
            else
            {
                permissionTypeCache = new Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>>();

                RequestLifetimeCache.Add(cachingKey, permissionTypeCache);
            }

            Dictionary<EntityToken, List<PermissionType>> entityTokenPermissionTypes;
            if (permissionTypeCache.TryGetValue(userToken, out entityTokenPermissionTypes) == false)
            {
                entityTokenPermissionTypes = new Dictionary<EntityToken, List<PermissionType>>();
                permissionTypeCache.Add(userToken, entityTokenPermissionTypes);
            }

            if (entityTokenPermissionTypes.ContainsKey(entityToken) == false)
            {
                entityTokenPermissionTypes.Add(entityToken, permissionTypes);
            }
            else
            {
                entityTokenPermissionTypes[entityToken] = entityTokenPermissionTypes[entityToken].Concat(permissionTypes).Distinct().ToList();
            }
        }



        private static List<PermissionType> GetFromCache(UserToken userToken, EntityToken entityToken, object cachingKey)
        {
            // Using RequestLifetimeCache and there for no thread locking /MRJ

            Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>> permissionTypeCache;

            if (RequestLifetimeCache.HasKey(cachingKey) == true)
            {
                permissionTypeCache = RequestLifetimeCache.TryGet<Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>>>(cachingKey);
            }
            else
            {
                permissionTypeCache = new Dictionary<UserToken, Dictionary<EntityToken, List<PermissionType>>>();

                RequestLifetimeCache.Add(cachingKey, permissionTypeCache);
            }

            Dictionary<EntityToken, List<PermissionType>> entityTokenPermissionTypes;
            if (permissionTypeCache.TryGetValue(userToken, out entityTokenPermissionTypes) == false)
            {
                entityTokenPermissionTypes = new Dictionary<EntityToken, List<PermissionType>>();
                permissionTypeCache.Add(userToken, entityTokenPermissionTypes);
            }

            List<PermissionType> permissionTypes = null;

            entityTokenPermissionTypes.TryGetValue(entityToken, out permissionTypes);

            return permissionTypes;
        }
	}
}
