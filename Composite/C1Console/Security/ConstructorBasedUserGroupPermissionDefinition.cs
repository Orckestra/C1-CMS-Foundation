using System;
using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConstructorBasedUserGroupPermissionDefinition : UserGroupPermissionDefinition
    {
        private Guid _userGroupId;
        private IEnumerable<PermissionType> _permissionTypes;
        private string _serializedEntityToken;

        public ConstructorBasedUserGroupPermissionDefinition(Guid userGroupId, IEnumerable<PermissionType> permissionTypes, string serializedEntityToken)
        {
            _userGroupId = userGroupId;
            _permissionTypes = permissionTypes;
            _serializedEntityToken = serializedEntityToken;
        }

        public override Guid UserGroupId
        {
            get { return _userGroupId; }
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
