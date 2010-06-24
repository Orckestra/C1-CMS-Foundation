using System.Diagnostics;
using Composite.ResourceSystem;


namespace Composite.Security
{
    [DebuggerDisplay("PermissionType = {PermissionType}")]
	public sealed class PermissionDescriptor
	{
        public PermissionDescriptor(PermissionType permissionType)
        {
            this.PermissionType = permissionType;
        }


        public PermissionType PermissionType
        {
            get;
            private set;
        }


        public string Label
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Permissions", string.Format("{0}Label", this.PermissionType));
            }
        }
	}
}
