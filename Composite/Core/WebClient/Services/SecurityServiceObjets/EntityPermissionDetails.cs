using System.Collections.Generic;


namespace Composite.Core.WebClient.Services.SecurityServiceObjets
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class EntityPermissionDetails
	{
        /// <exclude />
        public List<UserPermissions> InheritedUserPermissions { get; set; }

        /// <exclude />
        public List<UserPermissions> EntityUserPermissions { get; set; }
	}
}
