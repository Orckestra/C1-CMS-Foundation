using Composite.Core.PackageSystem.Foundation;


namespace Composite.Core.PackageSystem
{
    internal sealed class PackageInstallerUninstallerFactory : IPackageInstallerUninstallerFactory
    {
        public IPackageUninstaller CreateUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction, PackageInformation packageInformation)
        {
            return new PackageUninstaller(zipFilename, uninstallFilename, packageInstallationDirectory, tempDirectory, flushOnCompletion, reloadConsoleOnCompletion, useTransaction, packageInformation);
        }
    }
}
