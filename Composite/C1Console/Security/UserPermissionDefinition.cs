using System.Collections.Generic;
using System;
using Composite.Core.Logging;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class UserPermissionDefinition
	{
        private EntityToken _entityToken = null;
        private bool _entityTokenInitialized = false;

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
                if (_entityTokenInitialized==false)
                {
                    try
                    {
                        _entityToken = EntityTokenSerializer.Deserialize(this.SerializedEntityToken, false);
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("UserPermissionDefinition", ex);
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
