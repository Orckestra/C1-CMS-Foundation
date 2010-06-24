namespace Composite.PackageSystem
{
    internal interface IPackageInstallerUninstallerFactory
    {
        IPackageUninstaller CreateUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction);
    }
}
