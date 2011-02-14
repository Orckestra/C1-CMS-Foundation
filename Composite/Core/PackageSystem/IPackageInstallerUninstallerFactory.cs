namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IPackageInstallerUninstallerFactory
    {
        /// <exclude />
        IPackageUninstaller CreateUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction, PackageInformation packageInformation);
    }
}
