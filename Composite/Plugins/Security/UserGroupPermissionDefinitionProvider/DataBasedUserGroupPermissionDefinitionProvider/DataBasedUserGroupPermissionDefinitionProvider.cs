using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Transactions;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Types;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Plugins.UserGroupPermissionDefinitionProvider;
using Composite.Data.Transactions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.Security.UserGroupPermissionDefinitionProvider.DataBasedUserGroupPermissionDefinitionProvider
{
    [ConfigurationElementType(typeof(NonConfigurableUserGroupPermissionDefinitionProvider))]
    class DataBasedUserGroupPermissionDefinitionProvider : IUserGroupPermissionDefinitionProvider
	{
        private static readonly int PermissionCacheSize = 50;
        private static readonly Cache<Guid, ReadOnlyCollection<UserGroupPermissionDefinition>> _permissionCache = new Cache<Guid, ReadOnlyCollection<UserGroupPermissionDefinition>>("DataBasedUserGroupPermissionDefinitionProvider", PermissionCacheSize);

        static DataBasedUserGroupPermissionDefinitionProvider()
        {
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserGroupPermissionDefinition>(OnUserGroupPermissionChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserGroupPermissionDefinition>(OnUserGroupPermissionChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserGroupPermissionDefinition>(OnUserGroupPermissionChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IUserGroupPermissionDefinition>(OnUserGroupPermissionStoreChanged, true);
            
        }



        public IEnumerable<UserGroupPermissionDefinition> AllUserGroupPermissionDefinitions
        {
            get 
            {
                return
                    (from urd in DataFacade.GetData<IUserGroupPermissionDefinition>()
                     select (UserGroupPermissionDefinition)new DataUserGroupPermissionDefinition(urd)).ToList();
            }
        }



        public bool CanAlterDefinitions
        {
            get { return true; }
        }



        public IEnumerable<UserGroupPermissionDefinition> GetPermissionsByUserGroup(Guid userGroupId)
        {
            ReadOnlyCollection<UserGroupPermissionDefinition> cachedUserGroupPermissionDefinitions = _permissionCache.Get(userGroupId);
            if (cachedUserGroupPermissionDefinitions != null)
            {
                return cachedUserGroupPermissionDefinitions;
            }

            List<UserGroupPermissionDefinition> userGroupPermissionDefinitions = 
                (from urd in DataFacade.GetData<IUserGroupPermissionDefinition>()
                 where urd.UserGroupId == userGroupId
                 select (UserGroupPermissionDefinition)new DataUserGroupPermissionDefinition(urd)).ToList();

            _permissionCache.Add(userGroupId, new ReadOnlyCollection<UserGroupPermissionDefinition>(userGroupPermissionDefinitions));

            return userGroupPermissionDefinitions;
        }



        public void SetUserGroupPermissionDefinition(UserGroupPermissionDefinition userGroupPermissionDefinition)
        {
            Guid userGroupId = userGroupPermissionDefinition.UserGroupId;
            string serializedEntityToken = userGroupPermissionDefinition.SerializedEntityToken;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUserGroupPermissionDefinition definition =
                        (from urd in DataFacade.GetData<IUserGroupPermissionDefinition>()
                         where urd.UserGroupId == userGroupId &&
                               urd.SerializedEntityToken == serializedEntityToken
                         select urd).FirstOrDefault();

                bool exists = definition != null;

                if (exists == false)
                {
                    definition = DataFacade.BuildNew<IUserGroupPermissionDefinition>();
                    definition.Id = Guid.NewGuid();
                    definition.UserGroupId = userGroupId;
                    definition.SerializedEntityToken = serializedEntityToken;

                    DataFacade.AddNew<IUserGroupPermissionDefinition>(definition);
                }
                else
                {
                    DataFacade.Update(definition);

                    DataFacade.Delete<IUserGroupPermissionDefinitionPermissionType>(f => f.UserGroupPermissionDefinitionId == definition.Id);
                }

                foreach (PermissionType permissionType in userGroupPermissionDefinition.PermissionTypes)
                {
                    IUserGroupPermissionDefinitionPermissionType permission = DataFacade.BuildNew<IUserGroupPermissionDefinitionPermissionType>();
                    permission.Id = Guid.NewGuid();
                    permission.PermissionTypeName = permissionType.ToString();
                    permission.UserGroupPermissionDefinitionId = definition.Id;

                    DataFacade.AddNew<IUserGroupPermissionDefinitionPermissionType>(permission);
                }

                transactionScope.Complete();
            }
        }



        public void RemoveUserGroupPermissionDefinition(Guid userGroupId, string serializedEntityToken)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUserGroupPermissionDefinition userGroupPermissionDefinitionToDelete =
                    (from urd in DataFacade.GetData<IUserGroupPermissionDefinition>()
                     where urd.UserGroupId == userGroupId &&
                           urd.SerializedEntityToken == serializedEntityToken
                     select urd).FirstOrDefault();

                if (userGroupPermissionDefinitionToDelete != null)
                {
                    DataFacade.Delete<IUserGroupPermissionDefinition>(userGroupPermissionDefinitionToDelete);
                }

                transactionScope.Complete();
            }
        }



        private static void OnUserGroupPermissionStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                _permissionCache.Clear();
            }
        }


        private static void OnUserGroupPermissionChanged(object sender, DataEventArgs args)
        {
            var userGroupPermissionDefinition = args.Data as IUserGroupPermissionDefinition;
            if (userGroupPermissionDefinition == null)
            {
                return;
            }

            _permissionCache.Remove(userGroupPermissionDefinition.UserGroupId);
        }






        internal sealed class DataUserGroupPermissionDefinition : UserGroupPermissionDefinition
        {
            private IUserGroupPermissionDefinition _userGroupPermissionDefinition;
            private List<PermissionType> _permissionTypes;


            public DataUserGroupPermissionDefinition(IUserGroupPermissionDefinition userGroupPermissionDefinition)
            {
                _userGroupPermissionDefinition = userGroupPermissionDefinition;

                Guid permissionDefinitionId = userGroupPermissionDefinition.Id;

                List<string> permissionTypeNames =
                    (from pt in DataFacade.GetData<IUserGroupPermissionDefinitionPermissionType>()
                     where pt.UserGroupPermissionDefinitionId == permissionDefinitionId
                     select pt.PermissionTypeName).ToList();

                _permissionTypes = permissionTypeNames.FromListOfStrings().ToList();
            }


            public override Guid UserGroupId
            {
                get
                {
                    return _userGroupPermissionDefinition.UserGroupId;
                }
            }


            public override IEnumerable<PermissionType> PermissionTypes
            {
                get
                {
                    foreach (PermissionType permissionType in _permissionTypes)
                    {
                        yield return permissionType;
                    }
                }
            }


            public override string SerializedEntityToken
            {
                get
                {
                    return _userGroupPermissionDefinition.SerializedEntityToken;
                }
            }
        }
    }
}
