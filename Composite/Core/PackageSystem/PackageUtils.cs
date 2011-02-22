using System;
using Composite.Core.Implementation;
using Composite.Plugins.Elements.ElementProviders.PackageElementProvider;


namespace Composite.Core.PackageSystem
{
    /// <summary>
    /// This class contains helper methods for handling packages
    /// </summary>
    public static class PackageUtils
    {
        /// <summary>
        /// This method returns an entity token for a install package in the C1 console.
        /// </summary>
        /// <param name="packageId">The id of the package.</param>
        /// <param name="groupName">The group name of the package.</param>
        /// <returns>Returns an entity token for a installed package.</returns>
        public static PackageElementProviderInstalledPackageItemEntityToken GetInstalledPackageEntityToken(Guid packageId, string groupName)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageUtils.GetInstalledPackageEntityToken(packageId, groupName);
        }
    }
}
