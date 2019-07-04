using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
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

        /// <exclude />

        public static IEnumerable<CultureInfo> GetUserGroupActiveCultures(string username)
        {
            Verify.ArgumentNotNullOrEmpty(username, nameof(username));

            return
                from ugal in DataFacade.GetData<IUserGroupActiveLocale>()
                join uugr in DataFacade.GetData<IUserUserGroupRelation>() on ugal.UserGroupId equals uugr.UserGroupId
                join user in DataFacade.GetData<IUser>() on uugr.UserId equals user.Id
                where user.Username == username
                select CultureInfo.CreateSpecificCulture(ugal.CultureName);
        }


        private static void OnDataChanged(object sender, StoreEventArgs storeEventArgs)
        {
            _cache.Clear();
        }
	}
}
