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
using Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider;
using Composite.Data.Transactions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.UserPermissionDefinitionProvider.DataBaseUserPermissionDefinitionProvider
{
    [ConfigurationElementType(typeof(DataBaseUserPermissionDefinitionProviderData))]
    internal sealed class DataBaseUserPermissionDefinitionProvider : IUserPermissionDefinitionProvider
    {
        private static readonly int PermissionCacheSize = 50;

        private static readonly Cache<string, ReadOnlyCollection<UserPermissionDefinition>> _permissionCache = new Cache<string, ReadOnlyCollection<UserPermissionDefinition>>("Security permissions", PermissionCacheSize);



        static DataBaseUserPermissionDefinitionProvider()
        {
            SubscribeToEvents();
        }



        private static void SubscribeToEvents()
        {
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IUserPermissionDefinition>(OnUserPermissionChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserPermissionDefinition>(OnUserPermissionChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserPermissionDefinition>(OnUserPermissionChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserPermissionDefinition>(OnUserPermissionChanged, true);
        }

        

        public IEnumerable<UserPermissionDefinition> AllUserPermissionDefinitions
        {
            get
            {
                return
                    (from urd in DataFacade.GetData<IUserPermissionDefinition>()
                     select (UserPermissionDefinition)new DataUserPermissionDefinition(urd)).ToList();
            }
        }



        public bool CanAlterDefinitions
        {
            get { return true; }
        }



        public void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition)
        {
            string username = userPermissionDefinition.Username;
            string serializedEntityToken = userPermissionDefinition.SerializedEntityToken; 

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUserPermissionDefinition definition =
                        (from urd in DataFacade.GetData<IUserPermissionDefinition>()
                         where urd.Username == username &&
                               urd.SerializedEntityToken == serializedEntityToken
                         select urd).FirstOrDefault();

                bool exists = definition != null;

                if (exists == false)
                {
                    definition = DataFacade.BuildNew<IUserPermissionDefinition>();
                    definition.Id = Guid.NewGuid();
                    definition.Username = userPermissionDefinition.Username;
                    definition.SerializedEntityToken = serializedEntityToken;

                    DataFacade.AddNew<IUserPermissionDefinition>(definition);
                }                
                else
                {
                    DataFacade.Update(definition);

                    DataFacade.Delete<IUserPermissionDefinitionPermissionType>(f => f.UserPermissionDefinitionId == definition.Id);
                }

                foreach (PermissionType permissionType in userPermissionDefinition.PermissionTypes)
                {
                    IUserPermissionDefinitionPermissionType permission = DataFacade.BuildNew<IUserPermissionDefinitionPermissionType>();
                    permission.Id = Guid.NewGuid();
                    permission.PermissionTypeName = permissionType.ToString();
                    permission.UserPermissionDefinitionId = definition.Id;

                    DataFacade.AddNew<IUserPermissionDefinitionPermissionType>(permission);
                }

                transactionScope.Complete();
            }
        }



        public void RemoveUserPermissionDefinition(UserToken userToken, string serializedEntityToken)
        {
            string username = userToken.Username;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUserPermissionDefinition userPermissionDefinitionToDelete =
                    (from urd in DataFacade.GetData<IUserPermissionDefinition>()
                     where urd.Username == username &&
                           urd.SerializedEntityToken == serializedEntityToken
                     select urd).FirstOrDefault();

                if (userPermissionDefinitionToDelete != null)
                {
                    DataFacade.Delete<IUserPermissionDefinition>(userPermissionDefinitionToDelete);
                }

                transactionScope.Complete();
            }
        }



        public IEnumerable<UserPermissionDefinition> GetPermissionsByUser(string userName)
        {
            var cachedValue = _permissionCache.Get(userName);
            if(cachedValue != null)
            {
                return cachedValue;
            }

            var permissions = (from urd in DataFacade.GetData<IUserPermissionDefinition>()
                              where urd.Username == userName
                              select (UserPermissionDefinition) new DataUserPermissionDefinition(urd)).ToList();


            _permissionCache.Add(userName, new ReadOnlyCollection<UserPermissionDefinition>(permissions));
            return permissions;
        }



        internal sealed class DataUserPermissionDefinition : UserPermissionDefinition
        {
            private IUserPermissionDefinition _userPermissionDefinition;
            private List<PermissionType> _permissionTypes;


            public DataUserPermissionDefinition(IUserPermissionDefinition userPermissionDefinition)
            {
                _userPermissionDefinition = userPermissionDefinition;

                Guid permissionDefinitionId = userPermissionDefinition.Id;

                List<string> permissionTypeNames =
                    (from pt in DataFacade.GetData<IUserPermissionDefinitionPermissionType>()
                     where pt.UserPermissionDefinitionId == permissionDefinitionId
                     select pt.PermissionTypeName).ToList();

                _permissionTypes = permissionTypeNames.FromListOfStrings().ToList();
            }


            public override string Username
            {
                get
                {
                    return _userPermissionDefinition.Username;
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
                    return _userPermissionDefinition.SerializedEntityToken;
                }
            }
        }



        private static void OnUserPermissionChanged(object sender, DataEventArgs args)
        {
            var permission = args.Data as IUserPermissionDefinition;
            if (permission == null)
            {
                return;
            }

            _permissionCache.Remove(permission.Username);
        }
    }



    [Assembler(typeof(NonConfigurableUserPermissionDefinitionProviderAssembler))]
    internal sealed class DataBaseUserPermissionDefinitionProviderData : UserPermissionDefinitionProviderData
    {
    }
}
