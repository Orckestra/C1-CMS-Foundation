using System.Collections.Generic;
using System;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class UserGroupPermissionDefinition
	{
        private EntityToken _entityToken = null;

        public abstract Guid UserGroupId { get; }
        public abstract IEnumerable<PermissionType> PermissionTypes { get; }        
        public abstract string SerializedEntityToken { get; }

        public EntityToken EntityToken
        {
            get
            {
                if (_entityToken == null)
                {
                    _entityToken = EntityTokenSerializer.Deserialize(this.SerializedEntityToken, false);
                }

                return _entityToken;
            }
        }
	}
}
