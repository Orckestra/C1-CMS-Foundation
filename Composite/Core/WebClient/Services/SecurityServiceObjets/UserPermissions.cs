using System.Collections.Generic;


namespace Composite.Core.WebClient.Services.SecurityServiceObjets
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class UserPermissions
	{
        /// <exclude />
        public string UserName { get; set; }

        /// <exclude />
        public List<string> PermissionTypes { get; set; }
	}
}
