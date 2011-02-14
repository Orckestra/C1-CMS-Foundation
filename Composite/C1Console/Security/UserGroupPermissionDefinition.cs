using System.Collections.Generic;
using System;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class UserGroupPermissionDefinition
	{
        private EntityToken _entityToken = null;

        /// <exclude />
        public abstract Guid UserGroupId { get; }

        /// <exclude />
        public abstract IEnumerable<PermissionType> PermissionTypes { get; }

        /// <exclude />
        public abstract string SerializedEntityToken { get; }

        /// <exclude />
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
