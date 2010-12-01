using System.Collections.Generic;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PackageLicenseFragmentUninstaller : BasePackageFragmentUninstaller
    {
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            return new PackageFragmentValidationResult[] { };
        }



        public override void Uninstall()
        {
            PackageLicenseDefinition licenseDefinition = LicenseDefinitionManager.GetLicenseDefinition(this.UninstallerContex.PackageInformation.Id);
            
            if ((licenseDefinition != null) && (licenseDefinition.Permanent == false))
            {
                LicenseDefinitionManager.RemoveLicenseDefintion(this.UninstallerContex.PackageInformation.Id);
            }
        }
    }
}
