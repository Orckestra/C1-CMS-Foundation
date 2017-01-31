using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Security
{
    /// <summary>
    /// Provides a cached lookup to user group ids related to a user
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UserGroupFacade
	{
        private static readonly ConcurrentDictionary<string, List<Guid>> _cache = new ConcurrentDictionary<string, List<Guid>>();


        static UserGroupFacade()
        {
            DataEventSystemFacade.SubscribeToStoreChanged<IUser>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IUserGroup>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IUserUserGroupRelation>(OnDataChanged, true);
        }



        /// <exclude />
        public static IReadOnlyCollection<Guid> GetUserGroupIds(string username)
        {
            Verify.ArgumentNotNullOrEmpty(username, nameof(username));

            return _cache.GetOrAdd(username, name =>
            {
                IUser user = DataFacade.GetData<IUser>()
                    .SingleOrDefault(f => string.Compare(f.Username, name, StringComparison.InvariantCultureIgnoreCase) == 0);

                Verify.IsNotNull(user, "Failed to find user by name '{0}'", name);

                return 
                    (from ur in DataFacade.GetData<IUserUserGroupRelation>()
                     where ur.UserId == user.Id
                     select ur.UserGroupId).ToList();
            });
        }



        private static void OnDataChanged(object sender, StoreEventArgs storeEventArgs)
        {
            _cache.Clear();
        }
	}
}
