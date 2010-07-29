using System.Collections.Generic;


namespace Composite.WebClient.Services.SecurityServiceObjets
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class UserPermissions
	{
        public string UserName { get; set; }
        public List<string> PermissionTypes { get; set; }
	}
}
