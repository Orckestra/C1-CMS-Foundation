<%@ WebService Language="C#" Class="Composite.Services.SecurityServices" %>

using System;
using System.Linq;
using System.Collections.Generic;
using System.Security;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.WebClient.Services.SecurityServiceObjets;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Services
{

    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class SecurityServices : WebService
    {

        [WebMethod]
        public List<KeyValuePair> GetPermissionTypes(string dummy)
        {
            return new List<KeyValuePair>(
                PermissionTypeFacade.GrantingPermissionDescriptors.Select(f => new KeyValuePair(f.PermissionType.ToString(), f.Label))
            );
        }



        [WebMethod]
        public EntityPermissionDetails PreviewGetPermissions(string serializedEntityToken, List<UserPermissions> entityUserPermissions, List<UserPermissions> entityUserGroupPermissions)
        {
            Verify.ArgumentNotNullOrEmpty(serializedEntityToken, "serializedEntityToken");

            UserToken userToken = UserValidationFacade.GetUserToken();
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            AdminRightsSecurityCheck(userToken, entityToken);

            List<UserPermissions> entityPermissions = new List<UserPermissions>();
            List<UserPermissions> inheritedPermissions = new List<UserPermissions>();
            foreach (string username in UserValidationFacade.AllUsernames.OrderBy(f => f))
            {
                var dataUserToken = new UserToken(username);

                var userGroupIds = UserGroupFacade.GetUserGroupIds(username);

                Dictionary<Guid, IEnumerable<PermissionType>> presetUserGroupPermissions = new Dictionary<Guid, IEnumerable<PermissionType>>();
                foreach (UserPermissions userPermissions in entityUserGroupPermissions.OrderBy(f => f.UserName))
                {
                    Guid userGroupId =
                       (from ug in DataFacade.GetData<IUserGroup>()
                        where ug.Name == userPermissions.UserName
                        select ug.Id).Single();

                    if (userGroupIds.Contains(userGroupId))
                    {
                        presetUserGroupPermissions.Add(userGroupId, GetPermissionTypes(userPermissions));
                    }
                }

                List<string> usersInheritedPermissions = PermissionTypeFacade.GetInheritedPermissionsTypes(dataUserToken, entityToken, presetUserGroupPermissions).Select(f => f.ToString()).ToList();
                usersInheritedPermissions.Remove(PermissionType.ClearPermissions.ToString());
                inheritedPermissions.Add(new UserPermissions { UserName = username, PermissionTypes = usersInheritedPermissions });

                UserPermissions presetUserPermissions = entityUserPermissions.SingleOrDefault(f => f.UserName == username);
                if (presetUserPermissions == null)
                {
                    List<string> usersEntityPermissions = PermissionTypeFacade.GetLocallyDefinedUserPermissionTypes(dataUserToken, entityToken).Select(f => f.ToString()).ToList();
                    if (usersEntityPermissions.Any())
                    {
                        usersEntityPermissions.Remove(PermissionType.ClearPermissions.ToString());
                        entityPermissions.Add(new UserPermissions { UserName = username, PermissionTypes = usersEntityPermissions });
                    }
                }
                else
                {
                    entityPermissions.Add(presetUserPermissions);
                }
            }

            return new EntityPermissionDetails
            {
                EntityUserPermissions = entityPermissions,
                InheritedUserPermissions = inheritedPermissions
            };
        }




        [WebMethod]
        public EntityPermissionDetails GetPermissions(string serializedEntityToken)
        {
            Verify.ArgumentNotNullOrEmpty(serializedEntityToken, "serializedEntityToken");

            UserToken userToken = UserValidationFacade.GetUserToken();
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            AdminRightsSecurityCheck(userToken, entityToken);

            List<UserPermissions> entityPermissions = new List<UserPermissions>();
            List<UserPermissions> inheritedPermissions = new List<UserPermissions>();
            foreach (string username in UserValidationFacade.AllUsernames.OrderBy(f => f))
            {
                UserToken dataUserToken = new UserToken(username);

                List<string> usersInheritedPermissions = PermissionTypeFacade.GetInheritedPermissionsTypes(dataUserToken, entityToken).Select(f => f.ToString()).ToList();
                usersInheritedPermissions.Remove(PermissionType.ClearPermissions.ToString());
                inheritedPermissions.Add(new UserPermissions { UserName = username, PermissionTypes = usersInheritedPermissions });

                List<string> usersEntityPermissions = PermissionTypeFacade.GetLocallyDefinedUserPermissionTypes(dataUserToken, entityToken).Select(f => f.ToString()).ToList();
                if (usersEntityPermissions.Any())
                {
                    usersEntityPermissions.Remove(PermissionType.ClearPermissions.ToString());
                    entityPermissions.Add(new UserPermissions { UserName = username, PermissionTypes = usersEntityPermissions });
                }
            }

            return new EntityPermissionDetails
            {
                EntityUserPermissions = entityPermissions,
                InheritedUserPermissions = inheritedPermissions
            };
        }



        [WebMethod]
        public EntityPermissionDetails GetGroupPermissions(string serializedEntityToken)
        {
            Verify.ArgumentNotNullOrEmpty(serializedEntityToken, "serializedEntityToken");

            UserToken userToken = UserValidationFacade.GetUserToken();
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            AdminRightsSecurityCheck(userToken, entityToken);

            List<UserPermissions> entityPermissions = new List<UserPermissions>();
            List<UserPermissions> inheritedPermissions = new List<UserPermissions>();

            List<IUserGroup> userGroups = DataFacade.GetData<IUserGroup>().ToList();
            foreach (IUserGroup userGroup in userGroups.OrderBy(f => f.Name))
            {
                List<string> usersInheritedPermissions = PermissionTypeFacade.GetInheritedGroupPermissionsTypes(userGroup.Id, entityToken).Select(f => f.ToString()).ToList();
                usersInheritedPermissions.Remove(PermissionType.ClearPermissions.ToString());
                inheritedPermissions.Add(new UserPermissions { UserName = userGroup.Name, PermissionTypes = usersInheritedPermissions });

                List<string> usersEntityPermissions = PermissionTypeFacade.GetLocallyDefinedUserGroupPermissionTypes(userGroup.Id, entityToken).Select(f => f.ToString()).ToList();
                if (usersEntityPermissions.Any())
                {
                    usersEntityPermissions.Remove(PermissionType.ClearPermissions.ToString());
                    entityPermissions.Add(new UserPermissions { UserName = userGroup.Name, PermissionTypes = usersEntityPermissions });
                }
            }

            return new EntityPermissionDetails
            {
                EntityUserPermissions = entityPermissions,
                InheritedUserPermissions = inheritedPermissions
            };
        }

        private string AdminLockoutMessage
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Permissions","AdminLockoutMessage");
            }
        }

        private void AdminRightsSecurityCheck(UserToken userToken, EntityToken entityToken)
        {
            if (PermissionTypeFacade.GetCurrentPermissionTypes(userToken, entityToken,
                                                                PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username),
                                                                PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username))
                                                                .All(f => f != PermissionType.Administrate))
            {
                throw new SecurityException("You do not have administrative permissions to this entity");
            }
        }
        

        [WebMethod]
        public string SetAllPermissions(string serializedEntityToken, List<UserPermissions> entityUserPermissions, List<UserPermissions> entityUserGroupPermissions, string viewId, string consoleId)
        {
            Verify.ArgumentNotNullOrEmpty(serializedEntityToken, "serializedEntityToken");

            UserToken userToken = UserValidationFacade.GetUserToken();
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            AdminRightsSecurityCheck(userToken, entityToken);

            if (!CheckNotRemovingOwnAdminRights(entityUserPermissions, entityUserGroupPermissions, userToken, entityToken))
            {
                return AdminLockoutMessage;
            }


            // User permissions
            foreach (UserPermissions userPermissions in entityUserPermissions)
            {
                UserPermissionDefinition newSet = new ConstructorBasedUserPermissionDefinition(
                    userPermissions.UserName,
                    GetPermissionTypes(userPermissions),
                    serializedEntityToken);

                PermissionTypeFacade.SetUserPermissionDefinition(newSet);
            }

            foreach (string undefinedUsername in UserValidationFacade.AllUsernames.Where(f => entityUserPermissions.Any(g => g.UserName == f) == false))
            {
                PermissionTypeFacade.RemoveUserPermissionDefinition(new UserToken(undefinedUsername), entityToken);
            }


            // User groups permissions
            List<Guid> changedUserGroupIds = new List<Guid>();
            foreach (UserPermissions userGroupPermissions in entityUserGroupPermissions)
            {
                Guid userGroupId =
                    (from ug in DataFacade.GetData<IUserGroup>()
                     where ug.Name == userGroupPermissions.UserName
                     select ug.Id).Single();

                UserGroupPermissionDefinition newSet = new ConstructorBasedUserGroupPermissionDefinition(
                    userGroupId,
                    GetPermissionTypes(userGroupPermissions),
                    serializedEntityToken);

                PermissionTypeFacade.SetUserGroupPermissionDefinition(newSet);

                changedUserGroupIds.Add(userGroupId);
            }


            List<Guid> allUserGroupIds = DataFacade.GetData<IUserGroup>().Select(f => f.Id).ToList();

            IEnumerable<Guid> userGroupIdsToBeRemoved = allUserGroupIds.Except(changedUserGroupIds);
            foreach (Guid userGroupId in userGroupIdsToBeRemoved)
            {
                PermissionTypeFacade.RemoveUserPermissionDefinition(userGroupId, entityToken);
            }


			LoggingService.LogVerbose("UserManagement", String.Format("C1 Console element permission change done by '{1}'. Changed element is '{0}'.", entityToken.Serialize(), UserValidationFacade.GetUsername()), LoggingService.Category.Audit);
			
            ConsoleMessageQueueFacade.Enqueue(new SaveStatusConsoleMessageQueueItem { ViewId = viewId, Succeeded = true }, consoleId);

            return "";
        }

        private bool CheckNotRemovingOwnAdminRights(IList<UserPermissions> entityUserPermissions, 
                                                    IList<UserPermissions> entityUserGroupPermissions,
                                                    UserToken userToken, 
                                                    EntityToken entityToken)
        {
            bool checkInheritance = true;
            UserPermissions entityUserPermission = entityUserPermissions.FirstOrDefault(f => f.UserName == userToken.Username);
            if (entityUserPermission != null)
            {
                checkInheritance = false;
                if (!entityUserPermission.PermissionTypes.Contains(PermissionType.Administrate.ToString()))
                {
                    return false;
                }
            }

            bool? adminPermissionsSet = null;
            var userGroupIds = UserGroupFacade.GetUserGroupIds(userToken.Username);
            foreach (Guid userGroupId in userGroupIds)
            {
                IUserGroup userGroup = DataFacade.GetData<IUserGroup>(f => f.Id == userGroupId).Single();

                UserPermissions entityUserGroupPermission = entityUserGroupPermissions.FirstOrDefault(f => f.UserName == userGroup.Name);
                if (entityUserGroupPermission != null)
                {
                    checkInheritance = false;

                    if (!adminPermissionsSet.HasValue || !adminPermissionsSet.Value)
                    {
                        adminPermissionsSet = entityUserGroupPermission.PermissionTypes.Contains(PermissionType.Administrate.ToString());
                    }

                    if (entityUserGroupPermission.PermissionTypes.Count == 0)
                    {
                        adminPermissionsSet = false;
                        break;
                    }
                }
            }

            if (adminPermissionsSet.HasValue && !adminPermissionsSet.Value)
            {
                return false;
            }

            return !checkInheritance || PermissionTypeFacade.GetInheritedPermissionsTypes(userToken, entityToken).Any(f => f == PermissionType.Administrate);
        }


        private IEnumerable<PermissionType> GetPermissionTypes(UserPermissions userPermissions)
        {
            if (userPermissions.PermissionTypes.Any())
            {
                foreach (string permissionTypeString in userPermissions.PermissionTypes)
                {
                    yield return (PermissionType)Enum.Parse(typeof(PermissionType), permissionTypeString);
                }
            }
            else
            {
                yield return PermissionType.ClearPermissions;
            }
        }
    }
}