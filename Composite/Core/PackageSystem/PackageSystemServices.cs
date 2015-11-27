using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Configuration;
using Composite.Core.PackageSystem.Foundation;
using Composite.C1Console.Users;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PackageSystemServices
    {
        /// <exclude />
        public static IEnumerable<PackageDescription> GetAllAvailablePackages()
        {
            return PackageServerFacade.GetAllPackageDescriptions(InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);
        }



        /// <exclude />
        public static IEnumerable<PackageDescription> GetFilteredAllAvailablePackages()
        {
            List<InstalledPackageInformation> installedPackageInformation = PackageManager.GetInstalledPackages().ToList();

            IEnumerable<PackageDescription> descriptions =
                 from description in PackageServerFacade.GetAllPackageDescriptions(InstallationInformationFacade.InstallationId, UserSettings.CultureInfo)
                 where installedPackageInformation.All(f => f.Id != description.Id)
                 select description;

            Dictionary<Guid, List<PackageDescription>> packageDescriptions = new Dictionary<Guid,List<PackageDescription>>();
            foreach (PackageDescription packageDescription in descriptions)
            {
                if ((new Version(packageDescription.MinCompositeVersionSupported) <= RuntimeInformation.ProductVersion) &&
                    (new Version(packageDescription.MaxCompositeVersionSupported) >= RuntimeInformation.ProductVersion))
                {
                    List<PackageDescription> decs;
                    if (!packageDescriptions.TryGetValue(packageDescription.Id, out decs))
                    {
                        decs = new List<PackageDescription>();
                        packageDescriptions.Add(packageDescription.Id, decs);
                    }

                    decs.Add(packageDescription);
                }
            }

            foreach (var kvp in packageDescriptions)
            {
                if (kvp.Value.Count > 1)
                {
                    kvp.Value.Sort(delegate(PackageDescription x, PackageDescription y)
                    {
                        Version xVersion = new Version(x.PackageVersion);
                        Version yVersion = new Version(y.PackageVersion);
                        return xVersion.CompareTo(yVersion);
                    });
                }

                yield return kvp.Value.Last();
            }            
        }



        /// <exclude />
        public static string GetPackageSourceNameByPackageId(Guid id, Guid installationId, CultureInfo userCulture)
        {
            List<IPackageServerSource> packageServerSources = DataFacade.GetData<IPackageServerSource>().ToList();

            foreach (IPackageServerSource packageServerSource in packageServerSources)
            {
                PackageDescription foundPackageDescription = 
                    (from package in PackageServerFacade.GetPackageDescriptions(packageServerSource.Url, installationId, userCulture)
                     where package.Id == id
                     select package).FirstOrDefault();

                if (foundPackageDescription != null)
                {
                    return packageServerSource.Url;
                }
            }

            throw new InvalidOperationException("Source not found");
        }



        /// <exclude />
        public static string GetEulaText(PackageDescription packageDescription)
        {
            string packageSource = PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id, InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

            string text = PackageServerFacade.GetEulaText(packageSource, packageDescription.EulaId, UserSettings.CultureInfo);

            return text;
        }



        /// <exclude />
        public static PackageInformation GetPackageInformationFromZipfile(string zipFilename)
        {
            XElement installContent;
            PackageFragmentValidationResult packageFragmentValidationResult = XmlHelper.LoadInstallXml(zipFilename, out installContent);
            if (packageFragmentValidationResult != null) throw new InvalidOperationException(packageFragmentValidationResult.Message);

            PackageInformation packageInformation;
            packageFragmentValidationResult = PackageManager.ValidatePackageInformation(installContent, out packageInformation);
            if (packageFragmentValidationResult != null) throw new InvalidOperationException(packageFragmentValidationResult.Message);

            return packageInformation;
        }
    }
}
