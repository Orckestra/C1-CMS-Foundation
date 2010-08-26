using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security.Plugins.UserPermissionDefinitionProvider;


namespace Composite.C1Console.Security.BuildinPlugins.BuildinUserPermissionDefinitionProvider
{
    internal sealed class BuildinUserPermissionDefinitionProvider : IUserPermissionDefinitionProvider
	{
        private List<UserPermissionDefinition> _userPermissionDefinitions = new List<UserPermissionDefinition>();


        public IEnumerable<UserPermissionDefinition> AllUserPermissionDefinitions
        {
            get { return _userPermissionDefinitions; }
        
        
        }

        public bool CanAlterDefinitions
        {
            get { return true; }
        }



        public void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition)
        {
            _userPermissionDefinitions.Add(userPermissionDefinition);
        }



        public void RemoveUserPermissionDefinition(UserToken userToken, string serializedEntityToken)
        {
            _userPermissionDefinitions = new List<UserPermissionDefinition>();
        }

        #region IUserPermissionDefinitionProvider Members


        public IEnumerable<UserPermissionDefinition> GetPermissionsByUser(string userName)
        {
            return from urd in AllUserPermissionDefinitions
                   where urd.Username == userName
                   select urd;
        }

        #endregion
    }
}
