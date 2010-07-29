using System.Collections.Generic;
using System;
using Composite.Logging;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class UserPermissionDefinition
	{
        private EntityToken _entityToken = null;
        private bool _entityTokenInitialized = false;

        public abstract string Username { get; }
        public abstract IEnumerable<PermissionType> PermissionTypes { get; }        
        public abstract string SerializedEntityToken { get; }

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
