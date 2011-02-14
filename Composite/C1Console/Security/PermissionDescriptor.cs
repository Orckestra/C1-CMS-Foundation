using System.Diagnostics;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("PermissionType = {PermissionType}")]
	public sealed class PermissionDescriptor
	{
        /// <exclude />
        public PermissionDescriptor(PermissionType permissionType)
        {
            this.PermissionType = permissionType;
        }


        /// <exclude />
        public PermissionType PermissionType
        {
            get;
            private set;
        }


        /// <exclude />
        public string Label
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Permissions", string.Format("{0}Label", this.PermissionType));
            }
        }
	}
}
