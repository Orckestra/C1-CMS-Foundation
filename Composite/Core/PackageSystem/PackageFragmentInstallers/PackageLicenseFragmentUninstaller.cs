using System.Collections.Generic;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PackageLicenseFragmentUninstaller : BasePackageFragmentUninstaller
    {
        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            return new PackageFragmentValidationResult[] { };
        }



        /// <exclude />
        public override void Uninstall()
        {
            PackageLicenseDefinition licenseDefinition = LicenseDefinitionManager.GetLicenseDefinition(this.UninstallerContext.PackageInformation.Id);
            
            if ((licenseDefinition != null) && (licenseDefinition.Permanent == false))
            {
                LicenseDefinitionManager.RemoveLicenseDefintion(this.UninstallerContext.PackageInformation.Id);
            }
        }
    }
}
