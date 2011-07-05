using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UserGroupFacade
	{
        private static readonly Hashtable<string, List<Guid>> _cache = new Hashtable<string, List<Guid>>();
        private static readonly object _lock = new object();


        static UserGroupFacade()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUser>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUser>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUser>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserGroup>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserGroup>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserGroup>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserUserGroupRelation>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserUserGroupRelation>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserUserGroupRelation>(OnDataChanged, true);
        }



        /// <exclude />
        public static List<Guid> GetUserGroupIds(string username)
        {
            List<Guid> userGroupIds;

            if (_cache.TryGetValue(username, out userGroupIds) == false)
            {
                IUser user = DataFacade.GetData<IUser>().Where(f => string.Compare(f.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0).Single();

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



        private static void OnDataChanged(object sender, DataEventArgs dataEventArgs)
        {
            lock (_lock)
            {
                _cache.Clear();
            }
        }
	}
}
