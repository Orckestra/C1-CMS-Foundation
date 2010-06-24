using Composite.PackageSystem.Foundation;


namespace Composite.PackageSystem
{
    internal sealed class PackageInstallerUninstallerFactory : IPackageInstallerUninstallerFactory
    {
        public IPackageUninstaller CreateUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction)
        {
            return new PackageUninstaller(zipFilename, uninstallFilename, packageInstallationDirectory, tempDirectory, flushOnCompletion, reloadConsoleOnCompletion, useTransaction);
        }
    }
}
