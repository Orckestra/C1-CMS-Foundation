using System.Collections.Generic;


namespace Composite.WebClient.Services.SecurityServiceObjets
{
	public class EntityPermissionDetails
	{
        public List<UserPermissions> InheritedUserPermissions { get; set; }
        public List<UserPermissions> EntityUserPermissions { get; set; }
	}
}
