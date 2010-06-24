using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.GlobalSettings;
using Composite.PackageSystem.Foundation;
using Composite.Users;


namespace Composite.PackageSystem
{
    public static class PackageSystemServices
    {
        public static IEnumerable<PackageDescription> GetFilteredAllAvailablePackages()
        {
            List<InstalledPackageInformation> installedPackageInformation = PackageManager.GetInstalledPackages().ToList();

            IEnumerable<PackageDescription> descriptions =
                 from description in PackageServerFacade.GetAllPackageDescriptions(InstallationInformationFacade.InstallationId, UserSettings.CultureInfo)
                 where installedPackageInformation.Where(f => f.Id == description.Id).FirstOrDefault() == null ||
                       new Version(installedPackageInformation.Where(f => f.Id == description.Id).First().Version) < new Version(description.PackageVersion)
                 select description;

            Dictionary<Guid, List<PackageDescription>> packageDescriptions = new Dictionary<Guid,List<PackageDescription>>();
            foreach (PackageDescription packageDescription in descriptions)
            {
                if ((new Version(packageDescription.MinCompositeVersionSupported) <= RuntimeInformation.ProductVersion) &&
                    (new Version(packageDescription.MaxCompositeVersionSupported) >= RuntimeInformation.ProductVersion))
                {
                    List<PackageDescription> decs;
                    if (packageDescriptions.TryGetValue(packageDescription.Id, out decs) == false)
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



        public static string GetEulaText(PackageDescription packageDescription)
        {
            string packageSource = PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id, InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

            string text = PackageServerFacade.GetEulaText(packageSource, packageDescription.EulaId, UserSettings.CultureInfo);

            return text;
        }



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
