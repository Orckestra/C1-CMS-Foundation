using System.Collections.Generic;


namespace Composite.WebClient.Services.SecurityServiceObjets
{
	public class UserPermissions
	{
        public string UserName { get; set; }
        public List<string> PermissionTypes { get; set; }
	}
}
