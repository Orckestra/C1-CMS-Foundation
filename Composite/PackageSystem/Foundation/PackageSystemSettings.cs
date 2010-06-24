namespace Composite.PackageSystem.Foundation
{
	internal static class PackageSystemSettings
	{
        public static string InstallFilename { get { return "install.xml"; } }
        public static string UninstallFilename { get { return "uninstall.xml"; } }
        public static string InstalledFilename { get { return "installed"; } }
        public static string ZipFilename { get { return "package.zip"; } }

        public static string BinariesDirectoryName { get { return "Binaries"; } }


        public static string XmlNamespace { get { return "http://www.composite.net/ns/management/packageinstaller/1.0"; } }

        public static string PackageInstallerElementName { get { return "PackageInstaller"; } }
        public static string PackageRequirementsElementName { get { return "PackageRequirements"; } }
        public static string PackageFragmentInstallerBinariesElementName { get { return "PackageFragmentInstallerBinaries"; } }
        
        public static string PackageFragmentInstallerBinariesAddElementName { get { return "Add"; } }
        public static string PackageFragmentInstallersElementName { get { return "PackageFragmentInstallers"; } }
        public static string PackageFragmentUninstallersElementName { get { return "PackageFragmentUninstallers"; } }
        public static string PackageFragmentInstallersAddElementName { get { return "Add"; } }
        public static string PackageFragmentUninstallersAddElementName { get { return "Add"; } }
        public static string PackageInformationElementName { get { return "PackageInformation"; } }

        public static string MinimumCompositeVersionAttributeName { get { return "minimumCompositeVersion"; } }
        public static string MaximumCompositeVersionAttributeName { get { return "maximumCompositeVersion"; } }

        public static string PathAttributeName { get { return "path"; } }
        public static string InstallerTypeAttributeName { get { return "installerType"; } }
        public static string UninstallerTypeAttributeName { get { return "uninstallerType"; } }

        public static string IdAttributeName { get { return "id"; } }
        public static string NameAttributeName { get { return "name"; } }
        public static string GroupNameAttributeName { get { return "groupName"; } }
        public static string AuthorAttributeName { get { return "author"; } }
        public static string WebsiteAttributeName { get { return "website"; } }
        public static string VersionAttributeName { get { return "version"; } }
        public static string CanBeUninstalledAttributeName { get { return "canBeUninstalled"; } }
        public static string SystemLockingAttributeName { get { return "systemLocking"; } }
        public static string FlushOnCompletionAttributeName { get { return "flushOnCompletion"; } }
        public static string ReloadConsoleOnCompletionAttributeName { get { return "reloadConsoleOnCompletion"; } }
        


        #region "info.xml" xml stuff

        public static string PackageInformationFilename { get { return "info.xml"; } }


        public static string PackageInfoElementName { get { return "PackageInfo"; } }
        public static string PackageInfo_NameAttributeName { get { return "name"; } }
        public static string PackageInfo_GroupNameAttributeName { get { return "groupName"; } }
        public static string PackageInfo_VersionAttributeName { get { return "version"; } }
        public static string PackageInfo_AuthorAttributeName { get { return "author"; } }
        public static string PackageInfo_WebsiteAttributeName { get { return "website"; } }
        public static string PackageInfo_DescriptionAttributeName { get { return "description"; } }
        public static string PackageInfo_InstallDateAttributeName { get { return "installDate"; } }
        public static string PackageInfo_InstalledByAttributeName { get { return "installedBy"; } }
        public static string PackageInfo_IsLocalInstalledAttributeName { get { return "isLocalInstalled"; } }
        public static string PackageInfo_CanBeUninstalledAttributeName { get { return "canBeUninstalled"; } }
        public static string PackageInfo_FlushOnCompletionAttributeName { get { return "flushOnCompletion"; } }
        public static string PackageInfo_ReloadConsoleOnCompletionAttributeName { get { return "reloadConsoleOnCompletion"; } }
        public static string PackageInfo_SystemLockingAttributeName { get { return "systemLocking"; } }
        public static string PackageInfo_PackageServerAddressAttributeName { get { return "packageServerAddress"; } }

        #endregion
    }
}
