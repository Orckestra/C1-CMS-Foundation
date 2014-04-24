using System.Collections.Generic;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class FileModifyPackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
       /// <exclude />
		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
            return new List<PackageFragmentValidationResult>();
		}

        /// <exclude />
		public override void Uninstall()
		{
		}
	}
}
