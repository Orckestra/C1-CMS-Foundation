using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class UserGroupPerspectiveFacade
	{
        public static IEnumerable<string> GetSerializedEntityTokens(string username)
        {
            foreach (Guid userGroupId in UserGroupFacade.GetUserGroupIds(username))
            {
                foreach (string serializedEntityToken in GetSerializedEntityTokens(userGroupId))
                {
                    yield return serializedEntityToken;
                }
            }
        }



        public static IEnumerable<string> GetSerializedEntityTokens(Guid userGroupId)
        {
            return
                (from activePerspective in DataFacade.GetData<IUserGroupActivePerspective>()
                 where activePerspective.UserGroupId == userGroupId
                 select activePerspective.SerializedEntityToken).ToList();
        }



        public static IEnumerable<EntityToken> GetEntityTokens(Guid userGroupId)
        {
            return
                GetSerializedEntityTokens(userGroupId).Select(f => EntityTokenSerializer.Deserialize(f));
        }



        public static void SetEntityTokens(Guid userGroupId, IEnumerable<EntityToken> entityTokens)
        {
            SetSerializedEntityTokens(userGroupId, entityTokens.Select(f => EntityTokenSerializer.Serialize(f)));
        }



        public static void SetSerializedEntityTokens(Guid userGroupId, IEnumerable<string> serializedEntityTokens)
        {
            DataFacade.Delete<IUserGroupActivePerspective>(f => f.UserGroupId == userGroupId);

            foreach (string serializedEntityToken in serializedEntityTokens)
            {
                IUserGroupActivePerspective activePerspective = DataFacade.BuildNew<IUserGroupActivePerspective>();

                activePerspective.Id = Guid.NewGuid();
                activePerspective.UserGroupId = userGroupId;
                activePerspective.SerializedEntityToken = serializedEntityToken;
                
                DataFacade.AddNew<IUserGroupActivePerspective>(activePerspective);
            }
        }



        public static void DeleteAll(Guid userGroupId)
        {
            DataFacade.Delete<IUserGroupActivePerspective>(f => f.UserGroupId == userGroupId);
        }
	}
}
