using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem
{

    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PackageManager
    {
        /// <exclude />
        public static IEnumerable<InstalledPackageInformation> GetInstalledPackages()
        {
            string baseDirectory = PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory);

            if (!C1Directory.Exists(baseDirectory)) yield break;

            string[] packageDirectories = C1Directory.GetDirectories(baseDirectory);
            foreach (string packageDirectory in packageDirectories)
            {
                if (C1File.Exists(Path.Combine(packageDirectory, PackageSystemSettings.InstalledFilename)))
                {
                    string filename = Path.Combine(packageDirectory, PackageSystemSettings.PackageInformationFilename);

                    if (C1File.Exists(filename))
                    {
                        XDocument doc = XDocumentUtils.Load(filename);

                        XElement packageInfoElement = doc.Root;
                        if (packageInfoElement.Name != XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageInfoElementName)) throw new InvalidOperationException(string.Format("{0} is wrongly formattet", filename));

                        XAttribute nameAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_NameAttributeName);
                        XAttribute groupNameAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_GroupNameAttributeName);
                        XAttribute versionAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_VersionAttributeName);
                        XAttribute authorAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_AuthorAttributeName);
                        XAttribute websiteAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_WebsiteAttributeName);
                        XAttribute descriptionAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_DescriptionAttributeName);
                        XAttribute installDateAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_InstallDateAttributeName);
                        XAttribute installedByAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_InstalledByAttributeName);
                        XAttribute isLocalInstalledAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_IsLocalInstalledAttributeName);
                        XAttribute canBeUninstalledAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_CanBeUninstalledAttributeName);
                        XAttribute flushOnCompletionAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_FlushOnCompletionAttributeName);
                        XAttribute reloadConsoleOnCompletionAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_ReloadConsoleOnCompletionAttributeName);
                        XAttribute systemLockingAttribute = GetAttributeNotNull(filename, packageInfoElement, PackageSystemSettings.PackageInfo_SystemLockingAttributeName);

                        XAttribute packageServerAddressAttribute = packageInfoElement.Attribute(PackageSystemSettings.PackageInfo_PackageServerAddressAttributeName);


                        SystemLockingType systemLockingType;
                        if (systemLockingAttribute.TryDeserialize(out systemLockingType) == false) throw new InvalidOperationException("The systemLocking attibute value is wrong");

                        string path = packageDirectory.Remove(0, baseDirectory.Length);
                        if (path.StartsWith("\\"))
                        {
                            path = path.Remove(0, 1);
                        }

                        Guid packageId;
                        if (!Guid.TryParse(path, out packageId))
                        {
                            continue;
                        }

                        yield return new InstalledPackageInformation
                        {
                            Id = packageId,
                            Name = nameAttribute.Value,
                            GroupName = groupNameAttribute.Value,
                            Version = versionAttribute.Value,
                            Author = authorAttribute.Value,
                            Website = websiteAttribute.Value,
                            Description = descriptionAttribute.Value,
                            InstallDate = (DateTime)installDateAttribute,
                            InstalledBy = installedByAttribute.Value,
                            IsLocalInstalled = (bool)isLocalInstalledAttribute,
                            CanBeUninstalled = (bool)canBeUninstalledAttribute,
                            FlushOnCompletion = (bool)flushOnCompletionAttribute,
                            ReloadConsoleOnCompletion = (bool)reloadConsoleOnCompletionAttribute,
                            SystemLockingType = systemLockingType,
                            PackageServerAddress = packageServerAddressAttribute?.Value,
                            PackageInstallPath = packageDirectory
                        };
                    }
                    else
                    {
                        throw new InvalidOperationException($"'{filename}' does not exist");
                    }
                }
                else
                {
                    // Make this cleanup in an other way, it works correctly if it is done between validation and installation.
                    //LoggingService.LogVerbose("PackageManager", string.Format("Uncomlete installed add on found ('{0}'), deleting it", Path.GetFileName(packageDirecoty)));
                    //try
                    //{
                    //    Directory.Delete(packageDirecoty, true);
                    //}
                    //catch (Exception)
                    //{
                    //}
                }
            }
        }


        private static XAttribute GetAttributeNotNull(string fileName, XElement packageInfoElement, string attributeName)
        {
            XAttribute attribute = packageInfoElement.Attribute(attributeName);
            Verify.IsNotNull(attribute, "File: '{0}', failed to find '{1}' attribute.", fileName, attributeName);

            return attribute;
        }


        /// <exclude />
        public static bool IsInstalled(Guid packageId)
        {
            InstalledPackageInformation installedPackageInformation =
                        (from ao in GetInstalledPackages()
                         where ao.Id == packageId
                         select ao).SingleOrDefault();

            return installedPackageInformation != null;
        }



        /// <exclude />
        public static string GetCurrentVersion(Guid packageId)
        {
            string currentVersion =
                        (from ao in GetInstalledPackages()
                         where ao.Id == packageId
                         select ao.Version).SingleOrDefault();

            return currentVersion;
        }



        /// <exclude />
        public static PackageManagerInstallProcess Install(Stream zipFileStream, bool isLocalInstall)
        {
            if (isLocalInstall == false) throw new ArgumentException("Non local install needs a packageServerAddress");

            return Install(zipFileStream, isLocalInstall, null);
        }



        /// <exclude />
        public static PackageManagerInstallProcess Install(Stream zipFileStream, bool isLocalInstall, string packageServerAddress)
        {
            if (!isLocalInstall && string.IsNullOrEmpty(packageServerAddress)) throw new ArgumentException("Non local install needs a packageServerAddress");

            string zipFilename = null;

            try
            {
                PackageFragmentValidationResult packageFragmentValidationResult = SaveZipFile(zipFileStream, out zipFilename);
                if (packageFragmentValidationResult != null) return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult> { packageFragmentValidationResult }, null);

                XElement installContent;
                packageFragmentValidationResult = XmlHelper.LoadInstallXml(zipFilename, out installContent);
                if (packageFragmentValidationResult != null) return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult> { packageFragmentValidationResult }, zipFilename);

                PackageInformation packageInformation;
                packageFragmentValidationResult = ValidatePackageInformation(installContent, out packageInformation);
                if (packageFragmentValidationResult != null) return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult> { packageFragmentValidationResult }, zipFilename);

                if (RuntimeInformation.ProductVersion < packageInformation.MinCompositeVersionSupported
                    || RuntimeInformation.ProductVersion > packageInformation.MaxCompositeVersionSupported)
                {
                    return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult>
                    {
                        new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                            Texts.PackageManager_CompositeVersionMisMatch(
                                RuntimeInformation.ProductVersion, 
                                packageInformation.MinCompositeVersionSupported,
                                packageInformation.MaxCompositeVersionSupported)) }, zipFilename);
                }

                bool updatingInstalledPackage = false;
                if (IsInstalled(packageInformation.Id))
                {
                    string currentVersionString = GetCurrentVersion(packageInformation.Id);

                    Version currentVersion = new Version(currentVersionString);
                    Version newVersion = new Version(packageInformation.Version);

                    if (newVersion <= currentVersion)
                    {
                        string validationError = newVersion == currentVersion 
                                    ? Texts.PackageManager_PackageAlreadyInstalled 
                                    : Texts.PackageManager_NewerVersionInstalled;

                        return new PackageManagerInstallProcess(
                            new List<PackageFragmentValidationResult>
                                {
                                    new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, validationError)
                                }, zipFilename);
                    }

                    updatingInstalledPackage = true;
                }

                string originalInstallDirectory = null;
                string packageInstallDirectory = CreatePackageDirectoryName(packageInformation);

                if (updatingInstalledPackage)
                {
                    originalInstallDirectory = packageInstallDirectory;
                    packageInstallDirectory += "-" + packageInformation.Version;
                }

                C1Directory.CreateDirectory(packageInstallDirectory);

                string packageZipFilename = Path.Combine(packageInstallDirectory, Path.GetFileName(zipFilename));
                C1File.Copy(zipFilename, packageZipFilename, true);

                string username = "Composite";
                if (UserValidationFacade.IsLoggedIn())
                {
                    username = UserValidationFacade.GetUsername();
                }

                var doc = new XDocument();
                XElement packageInfoElement = new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageInfoElementName));
                doc.Add(packageInfoElement);
                packageInfoElement.Add(
                    new XAttribute(PackageSystemSettings.PackageInfo_NameAttributeName, packageInformation.Name),
                    new XAttribute(PackageSystemSettings.PackageInfo_GroupNameAttributeName, packageInformation.GroupName),
                    new XAttribute(PackageSystemSettings.PackageInfo_VersionAttributeName, packageInformation.Version),
                    new XAttribute(PackageSystemSettings.PackageInfo_AuthorAttributeName, packageInformation.Author),
                    new XAttribute(PackageSystemSettings.PackageInfo_WebsiteAttributeName, packageInformation.Website),
                    new XAttribute(PackageSystemSettings.PackageInfo_DescriptionAttributeName, packageInformation.Description),
                    new XAttribute(PackageSystemSettings.PackageInfo_InstallDateAttributeName, DateTime.Now),
                    new XAttribute(PackageSystemSettings.PackageInfo_InstalledByAttributeName, username),
                    new XAttribute(PackageSystemSettings.PackageInfo_IsLocalInstalledAttributeName, isLocalInstall),
                    new XAttribute(PackageSystemSettings.PackageInfo_CanBeUninstalledAttributeName, packageInformation.CanBeUninstalled),
                    new XAttribute(PackageSystemSettings.PackageInfo_FlushOnCompletionAttributeName, packageInformation.FlushOnCompletion),
                    new XAttribute(PackageSystemSettings.PackageInfo_ReloadConsoleOnCompletionAttributeName, packageInformation.ReloadConsoleOnCompletion),
                    new XAttribute(PackageSystemSettings.PackageInfo_SystemLockingAttributeName, packageInformation.SystemLockingType.Serialize()));

                if (!string.IsNullOrEmpty(packageServerAddress))
                {
                    packageInfoElement.Add(new XAttribute(PackageSystemSettings.PackageInfo_PackageServerAddressAttributeName, packageServerAddress));
                }

                string infoFilename = Path.Combine(packageInstallDirectory, PackageSystemSettings.PackageInformationFilename);
                doc.SaveToFile(infoFilename);

                var packageInstaller = new PackageInstaller(new PackageInstallerUninstallerFactory(), packageZipFilename, packageInstallDirectory, TempDirectoryFacade.CreateTempDirectory(), packageInformation);

                return new PackageManagerInstallProcess(
                    packageInstaller, 
                    packageInformation.SystemLockingType, 
                    zipFilename, 
                    packageInstallDirectory, 
                    packageInformation.Name,
                    packageInformation.Version,
                    packageInformation.Id,
                    originalInstallDirectory);
            }
            catch (Exception ex)
            {
                return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult>
                {
                    new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex)
                }, zipFilename);
            }
        }



        /// <exclude />
        public static PackageManagerUninstallProcess Uninstall(Guid id)
        {
            try
            {
                string absolutePath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory), id.ToString());

                InstalledPackageInformation installedPackageInformation =
                    (from package in GetInstalledPackages()
                     where package.Id == id
                     select package).SingleOrDefault();

                if (installedPackageInformation == null) return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingPackageDirectory"), absolutePath)) });

                Log.LogVerbose("PackageManager", "Uninstalling package: {0}, Id = {1}", installedPackageInformation.Name, installedPackageInformation.Id);

                if (installedPackageInformation.CanBeUninstalled == false) return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, GetText("PackageManager.Uninstallable")) });

                string zipFilePath = Path.Combine(absolutePath, PackageSystemSettings.ZipFilename);
                if (C1File.Exists(zipFilePath) == false) return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingZipFile"), zipFilePath)) });

                string uninstallFilePath = Path.Combine(absolutePath, PackageSystemSettings.UninstallFilename);
                if (C1File.Exists(uninstallFilePath) == false) return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingUninstallFile"), uninstallFilePath)) });

                PackageInformation packageInformation = new PackageInformation
                {
                    Id = installedPackageInformation.Id,
                    Name = installedPackageInformation.Name,
                    GroupName = installedPackageInformation.GroupName,
                    Author = installedPackageInformation.Author,
                    Website = installedPackageInformation.Website,
                    Description = installedPackageInformation.Description,
                    Version = installedPackageInformation.Version,
                    CanBeUninstalled = installedPackageInformation.CanBeUninstalled,
                    SystemLockingType = installedPackageInformation.SystemLockingType,
                    FlushOnCompletion = installedPackageInformation.FlushOnCompletion,
                    ReloadConsoleOnCompletion = installedPackageInformation.ReloadConsoleOnCompletion,
                };


                PackageUninstaller packageUninstaller = new PackageUninstaller(zipFilePath, uninstallFilePath, absolutePath, TempDirectoryFacade.CreateTempDirectory(), installedPackageInformation.FlushOnCompletion, installedPackageInformation.ReloadConsoleOnCompletion, true, packageInformation);

                PackageManagerUninstallProcess packageManagerUninstallProcess = new PackageManagerUninstallProcess(packageUninstaller, absolutePath, installedPackageInformation.SystemLockingType);
                return packageManagerUninstallProcess;
            }
            catch (Exception ex)
            {
                return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex) });
            }
        }



        internal static PackageFragmentValidationResult ValidatePackageInformation(XElement installContent, out PackageInformation packageInformation)
        {
            packageInformation = null;

            XElement packageInformationElement = installContent.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageInformationElementName));
            if (packageInformationElement == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingElement"), PackageSystemSettings.PackageInformationElementName), installContent);

            XAttribute idAttribute = packageInformationElement.Attribute(PackageSystemSettings.IdAttributeName);
            XAttribute nameAttribute = packageInformationElement.Attribute(PackageSystemSettings.NameAttributeName);
            XAttribute groupNameAttribute = packageInformationElement.Attribute(PackageSystemSettings.GroupNameAttributeName);
            XAttribute authorAttribute = packageInformationElement.Attribute(PackageSystemSettings.AuthorAttributeName);
            XAttribute websiteAttribute = packageInformationElement.Attribute(PackageSystemSettings.WebsiteAttributeName);
            XAttribute versionAttribute = packageInformationElement.Attribute(PackageSystemSettings.VersionAttributeName);
            XAttribute canBeUninstalledAttribute = packageInformationElement.Attribute(PackageSystemSettings.CanBeUninstalledAttributeName);
            XAttribute systemLockingAttribute = packageInformationElement.Attribute(PackageSystemSettings.SystemLockingAttributeName);
            XAttribute flushOnCompletionAttribute = packageInformationElement.Attribute(PackageSystemSettings.FlushOnCompletionAttributeName);
            XAttribute reloadConsoleOnCompletionAttribute = packageInformationElement.Attribute(PackageSystemSettings.ReloadConsoleOnCompletionAttributeName);

            if (idAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.IdAttributeName), packageInformationElement);
            if (nameAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.NameAttributeName), packageInformationElement);
            if (groupNameAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.GroupNameAttributeName), packageInformationElement);
            if (authorAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.AuthorAttributeName), packageInformationElement);
            if (websiteAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.WebsiteAttributeName), packageInformationElement);
            if (versionAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.VersionAttributeName), packageInformationElement);
            if (canBeUninstalledAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.CanBeUninstalledAttributeName), packageInformationElement);
            if (systemLockingAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.SystemLockingAttributeName), packageInformationElement);

            if (string.IsNullOrEmpty(nameAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.NameAttributeName), nameAttribute);
            if (string.IsNullOrEmpty(groupNameAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.GroupNameAttributeName), groupNameAttribute);
            if (string.IsNullOrEmpty(authorAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.AuthorAttributeName), authorAttribute);
            if (string.IsNullOrEmpty(websiteAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.WebsiteAttributeName), websiteAttribute);
            if (string.IsNullOrEmpty(versionAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.VersionAttributeName), versionAttribute);
            if (string.IsNullOrEmpty(packageInformationElement.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidElementValue"), PackageSystemSettings.PackageInformationElementName), packageInformationElement);

            Guid id;
            if (idAttribute.TryGetGuidValue(out id) == false) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.IdAttributeName), idAttribute);


            string newVersion;

            if (VersionStringHelper.ValidateVersion(versionAttribute.Value, out newVersion)) versionAttribute.Value = newVersion;
            else return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.VersionAttributeName), versionAttribute);

            bool canBeUninstalled;
            if (canBeUninstalledAttribute.TryGetBoolValue(out canBeUninstalled) == false) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.CanBeUninstalledAttributeName), canBeUninstalledAttribute);

            SystemLockingType systemLockingType;
            if (systemLockingAttribute.TryDeserialize(out systemLockingType) == false) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.SystemLockingAttributeName), systemLockingAttribute);

            bool flushOnCompletion = false;
            if ((flushOnCompletionAttribute != null) && (flushOnCompletionAttribute.TryGetBoolValue(out flushOnCompletion) == false)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.FlushOnCompletionAttributeName), flushOnCompletionAttribute);

            bool reloadConsoleOnCompletion = false;
            if ((reloadConsoleOnCompletionAttribute != null) && (reloadConsoleOnCompletionAttribute.TryGetBoolValue(out reloadConsoleOnCompletion) == false)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.ReloadConsoleOnCompletionAttributeName), reloadConsoleOnCompletionAttribute);


            XElement packageRequirementsElement = installContent.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageRequirementsElementName));
            if (packageRequirementsElement == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingElement"), PackageSystemSettings.PackageRequirementsElementName), installContent);

            XAttribute minimumCompositeVersionAttribute = packageRequirementsElement.Attribute(PackageSystemSettings.MinimumCompositeVersionAttributeName);
            XAttribute maximumCompositeVersionAttribute = packageRequirementsElement.Attribute(PackageSystemSettings.MaximumCompositeVersionAttributeName);

            if (minimumCompositeVersionAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.MinimumCompositeVersionAttributeName), packageRequirementsElement);
            if (maximumCompositeVersionAttribute == null) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.MissingAttribute"), PackageSystemSettings.MaximumCompositeVersionAttributeName), packageRequirementsElement);

            if (string.IsNullOrEmpty(minimumCompositeVersionAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.MinimumCompositeVersionAttributeName), minimumCompositeVersionAttribute);
            if (string.IsNullOrEmpty(maximumCompositeVersionAttribute.Value)) return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.MaximumCompositeVersionAttributeName), maximumCompositeVersionAttribute);

            if (VersionStringHelper.ValidateVersion(minimumCompositeVersionAttribute.Value, out newVersion)) minimumCompositeVersionAttribute.Value = newVersion;
            else return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.VersionAttributeName), minimumCompositeVersionAttribute);

            if (VersionStringHelper.ValidateVersion(maximumCompositeVersionAttribute.Value, out newVersion)) maximumCompositeVersionAttribute.Value = newVersion;
            else return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(GetText("PackageManager.InvalidAttributeValue"), PackageSystemSettings.VersionAttributeName), maximumCompositeVersionAttribute);


            packageInformation = new PackageInformation
            {
                Id = id,
                Name = nameAttribute.Value,
                GroupName = groupNameAttribute.Value,
                Author = authorAttribute.Value,
                Website = websiteAttribute.Value,
                Version = versionAttribute.Value,
                CanBeUninstalled = canBeUninstalled,
                SystemLockingType = systemLockingType,
                Description = packageInformationElement.Value,
                FlushOnCompletion = flushOnCompletion,
                ReloadConsoleOnCompletion = reloadConsoleOnCompletion,
                MinCompositeVersionSupported = new Version(minimumCompositeVersionAttribute.Value),
                MaxCompositeVersionSupported = new Version(maximumCompositeVersionAttribute.Value)
            };

            return null;
        }



        private static PackageFragmentValidationResult SaveZipFile(Stream zipFileStream, out string zipFilename)
        {
            zipFilename = null;

            try
            {
                zipFilename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory), PackageSystemSettings.ZipFilename);

                if (C1File.Exists(zipFilename))
                {
                    C1File.Delete(zipFilename);
                }

                if (C1Directory.Exists(Path.GetDirectoryName(zipFilename)) == false)
                {
                    C1Directory.CreateDirectory(Path.GetDirectoryName(zipFilename));
                }

                using (Stream readStream = zipFileStream)
                {
                    using (C1FileStream fileStream = new C1FileStream(zipFilename, FileMode.Create))
                    {
                        byte[] buffer = new byte[4096];

                        int readBytes;
                        while ((readBytes = readStream.Read(buffer, 0, 4096)) > 0)
                        {
                            fileStream.Write(buffer, 0, readBytes);
                        }
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex);
            }
        }


        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", stringId);
        }

        private static string CreatePackageDirectoryName(PackageInformation packageInformation)
        {
            string directoryName = $"{packageInformation.Id}";

            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PackageDirectory), directoryName);
        }
    }
}
