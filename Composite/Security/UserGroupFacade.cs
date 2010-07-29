using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Collections.Generic;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UserGroupFacade
	{
        private static Hashtable<string, List<Guid>> _cache = new Hashtable<string, List<Guid>>();
        private static object _lock = new object();


        static UserGroupFacade()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUser>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUser>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IUser>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserGroup>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserGroup>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserGroup>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserUserGroupRelation>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserUserGroupRelation>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserUserGroupRelation>(OnDataChanged);
        }



        public static List<Guid> GetUserGroupIds(string username)
        {
            List<Guid> userGroupIds;

            if (_cache.TryGetValue(username, out userGroupIds) == false)
            {
                IUser user = DataFacade.GetData<IUser>().Where(f => f.Username == username).Single();

                userGroupIds =
                    (from ur in DataFacade.GetData<IUserUserGroupRelation>()
                     where ur.UserId == user.Id
                     select ur.UserGroupId).ToList();

                lock (_lock)
                {
                    if (_cache.ContainsKey(username) == false)
                    {
                        _cache.Add(username, userGroupIds);
                    }
                }
            }

            return userGroupIds;
        }



        private static void OnDataChanged(DataEventArgs dataEventArgs)
        {
            lock (_lock)
            {
                _cache.Clear();
            }
        }
	}
}
