using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Plugins.Elements.ElementProviders.PackageElementProvider;
using Composite.Core.PackageSystem;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// This is the default implementaion for PackageUtils <see cref="Composite.Core.PackageSystem.PackageUtils"/>
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Utils")]
    public class PackageUtilsImplementation
    {
        /// <summary>
        /// </summary>
        /// <param name="packageId"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public virtual PackageElementProviderInstalledPackageItemEntityToken GetInstalledPackageEntityToken(Guid packageId, string groupName)
        {
            PackageElementProviderAvailablePackagesItemEntityToken castedEntityToken = new PackageElementProviderAvailablePackagesItemEntityToken(packageId.ToString(), groupName);
            InstalledPackageInformation installedPackage = PackageManager.GetInstalledPackages().FirstOrDefault(f => f.Id == castedEntityToken.AddOnId);
            PackageElementProviderInstalledPackageItemEntityToken installedPackageEntityToken = new PackageElementProviderInstalledPackageItemEntityToken(
                installedPackage.Id,
                installedPackage.GroupName,
                installedPackage.IsLocalInstalled,
                installedPackage.CanBeUninstalled);

            return installedPackageEntityToken;
        }
    }
}
