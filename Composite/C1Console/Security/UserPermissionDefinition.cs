using System.Collections.Generic;
using System;
using Composite.Core;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class UserPermissionDefinition
	{
        private EntityToken _entityToken;
        private bool _entityTokenInitialized;

        /// <exclude />
        public abstract string Username { get; }

        /// <exclude />
        public abstract IEnumerable<PermissionType> PermissionTypes { get; }

        /// <exclude />
        public abstract string SerializedEntityToken { get; }

        /// <exclude />
        public EntityToken EntityToken
        {
            get
            {
                if (!_entityTokenInitialized)
                {
                    try
                    {
                        _entityToken = EntityTokenSerializer.Deserialize(this.SerializedEntityToken, false);
                    }
                    catch (Exception ex)
                    {
                        Log.LogWarning("UserPermissionDefinition", "Failed to deserialize an entity token: '{0}'", SerializedEntityToken);
                        Log.LogWarning("UserPermissionDefinition", ex);
                    }
                    finally
                    {
                        _entityTokenInitialized = true;
                    }
                }

                return _entityToken;
            }
        }
	}
}
