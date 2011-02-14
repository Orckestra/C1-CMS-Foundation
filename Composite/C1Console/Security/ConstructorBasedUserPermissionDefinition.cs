using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConstructorBasedUserPermissionDefinition : UserPermissionDefinition
    {
        private string _username;
        private IEnumerable<PermissionType> _permissionTypes;
        private string _serializedEntityToken;

        /// <exclude />
        public ConstructorBasedUserPermissionDefinition(string username, IEnumerable<PermissionType> permissionTypes, string serializedEntityToken)
        {
            _username = username;
            _permissionTypes = permissionTypes;
            _serializedEntityToken = serializedEntityToken;
        }


        /// <exclude />
        public override string Username
        {
            get { return _username; }
        }


        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        /// <exclude />
        public override string SerializedEntityToken
        {
            get { return _serializedEntityToken; }
        }
    }
}
