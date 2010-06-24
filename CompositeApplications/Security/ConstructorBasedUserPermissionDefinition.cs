using System.Collections.Generic;


namespace Composite.Security
{
    public sealed class ConstructorBasedUserPermissionDefinition : UserPermissionDefinition
    {
        private string _username;
        private IEnumerable<PermissionType> _permissionTypes;
        private string _serializedEntityToken;

        public ConstructorBasedUserPermissionDefinition(string username, IEnumerable<PermissionType> permissionTypes, string serializedEntityToken)
        {
            _username = username;
            _permissionTypes = permissionTypes;
            _serializedEntityToken = serializedEntityToken;
        }

        public override string Username
        {
            get { return _username; }
        }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string SerializedEntityToken
        {
            get { return _serializedEntityToken; }
        }
    }
}
