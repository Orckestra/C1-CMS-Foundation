using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Transactions;
using System.Xml.Linq;
using Composite.Core.Application;
using Composite.Core.IO;
using Composite.Core.IO.Zip;
using Composite.Core.Logging;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.Transactions;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageInstaller : IPackageInstaller
    {
        private static readonly string LogTitle = "PackageInstaller";

        private bool _isInitialized = false;
        private PackageInstallerContext _packageInstallerContex;
        // IPackageFragmentInstaller -> uninstall type, null is allowed
        private Dictionary<IPackageFragmentInstaller, Type> _packageFramentInstallers = new Dictionary<IPackageFragmentInstaller, Type>();

        private IPackageInstallerUninstallerFactory PackageInstallerUninstallerFactory { get; set; }
        private string ZipFilename { get; set; }
        private string PackageInstallDirectory { get; set; }
        private string TempDirectory { get; set; }
        private PackageInformation PackageInformation { get; set; }


        /// <exclude />
        public PackageInstaller(IPackageInstallerUninstallerFactory packageInstallerUninstallerFactory, string zipFilename, string packageInstallDirectory, string tempDirectory, PackageInformation packageInformation)
        {
            if (packageInstallerUninstallerFactory == null) throw new ArgumentNullException("packageInstallerUninstallerFactory");
            if (string.IsNullOrEmpty(zipFilename) == true) throw new ArgumentNullException("zipFilename");
            if (string.IsNullOrEmpty(packageInstallDirectory) == true) throw new ArgumentNullException("packageInstallDirectory");
            if (string.IsNullOrEmpty(tempDirectory) == true) throw new ArgumentNullException("tempDirectory");
            if (packageInformation == null) throw new ArgumentNullException("packageInformation");

            this.PackageInstallerUninstallerFactory = packageInstallerUninstallerFactory;
            this.ZipFilename = zipFilename;
            this.PackageInstallDirectory = packageInstallDirectory;
            this.TempDirectory = tempDirectory;
            this.PackageInformation = packageInformation;
        }



        /// <exclude />
        public bool CanBeUninstalled { get { return this.PackageInformation.CanBeUninstalled; } }

        /// <exclude />
        public bool FlushOnCompletion { get { return this.PackageInformation.FlushOnCompletion; } }

        /// <exclude />
        public bool ReloadConsoleOnCompletion { get { return this.PackageInformation.ReloadConsoleOnCompletion; } }


        /// <exclude />
        public IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = Initialize().ToList();
            if (validationResult.Count > 0)
            {
                return validationResult;
            }

            foreach (IPackageFragmentInstaller packageFragmentInstaller in _packageFramentInstallers.Keys)
            {
                List<PackageFragmentValidationResult> result = null;
                try
                {
                    result = packageFragmentInstaller.Validate().ToList();
                }
                catch (Exception ex)
                {
                    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex));
                }

                if (result != null)
                {
                    validationResult.AddRange(result);
                }
            }

            return validationResult;
        }



        /// <exclude />
        public PackageFragmentValidationResult Install(SystemLockingType systemLockingType)
        {
            try
            {
                using (GlobalInitializerFacade.CoreLockScope)
                {
                    if ((systemLockingType == SystemLockingType.None) || (ApplicationOnlineHandlerFacade.IsApplicationOnline == false))
                    {
                        return DoInstall();
                    }
                    else 
                    {                        
                        using (ApplicationOnlineHandlerFacade.TurnOffScope(systemLockingType == SystemLockingType.Soft))
                        {
                            return DoInstall();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex);
            }
        }



        private PackageFragmentValidationResult DoInstall()
        {
            using (TransactionScope transactionScope = TransactionsFacade.Create(true, TimeSpan.FromMinutes(30.0)))
            {
                string uninstallFilename = Path.Combine(this.PackageInstallDirectory,
                                                        PackageSystemSettings.UninstallFilename);

                Exception installException = null;
                XElement uninstallElements =
                    new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace,
                                                   PackageSystemSettings.PackageFragmentUninstallersElementName));
                try
                {
                    foreach (var kvp in _packageFramentInstallers)
                    {
                        List<XElement> uninstallInformation = kvp.Key.Install().ToList();

                        if (this.CanBeUninstalled == true)
                        {
                            XElement uninstallElement =
                                new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace,
                                                               PackageSystemSettings.
                                                                   PackageFragmentUninstallersAddElementName));
                            uninstallElement.Add(new XAttribute(PackageSystemSettings.UninstallerTypeAttributeName,
                                                                TypeManager.SerializeType(kvp.Value)));
                            uninstallElement.Add(uninstallInformation);

                            uninstallElements.Add(uninstallElement);
                        }
                    }
                }
                catch (Exception ex)
                {
                    installException = ex;
                    LoggingService.LogError("Package installation failed", ex);
                }
                finally
                {
                    if (this.CanBeUninstalled == true)
                    {
                        XDocument doc =
                            new XDocument(
                                new XElement(
                                    XmlUtils.GetXName(PackageSystemSettings.XmlNamespace,
                                                      PackageSystemSettings.PackageInstallerElementName),
                                    uninstallElements));
                        doc.SaveToFile(uninstallFilename);
                    }
                }


                if (installException != null)
                {
                    if (this.CanBeUninstalled == true)
                    {
                        IPackageUninstaller packageUninstaller =
                            this.PackageInstallerUninstallerFactory.CreateUninstaller(
                                this.ZipFilename, uninstallFilename,
                                this.PackageInstallDirectory,
                                TempDirectoryFacade.
                                CreateTempDirectory(),
                                this.FlushOnCompletion,
                                this.ReloadConsoleOnCompletion,
                                false, 
                                this.PackageInformation);

                        List<PackageFragmentValidationResult> validationResult = null;
                        try
                        {
                            validationResult = packageUninstaller.Validate().ToList();
                        }
                        catch (Exception ex)
                        {
                            return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex);
                        }


                        if (validationResult.Count == 0)
                        {
                            try
                            {
                                packageUninstaller.Uninstall(SystemLockingType.None);
                            }
                            catch (Exception ex)
                            {
                                return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex);
                            }
                        }
                        else
                        {
                            LoggingService.LogError(LogTitle, "Failed to perform installation rollback.");
                            foreach(var valResult in validationResult)
                            {
                                if(valResult.Exception != null)
                                {
                                    LoggingService.LogError(LogTitle, new InvalidOperationException(valResult.Message ?? string.Empty, valResult.Exception));
                                }
                                else
                                {
                                    LoggingService.LogWarning(LogTitle,  valResult.Message);
                                }
                            }

                            return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                                                       "Could not perform installation rollback. The details are in the log.")
                                       {InnerResult = validationResult};
                        }
                    }

                    return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                                               installException);
                }
                transactionScope.Complete();
            }
            return null;
        }



        private IEnumerable<PackageFragmentValidationResult> Initialize()
        {
            if (_isInitialized == true) throw new InvalidOperationException("Initialize() may only be called once");
            _isInitialized = true;

            Exception exception = null;
            try
            {
                _packageInstallerContex = new PackageInstallerContext(new ZipFileSystem(this.ZipFilename), this.TempDirectory, this.PackageInformation);
            }
            catch (Exception ex)
            {
                exception = ex;
            }
            if (exception != null) return new PackageFragmentValidationResult[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception) };


            XElement installElement;
            PackageFragmentValidationResult packageFragmentValidationResult = XmlHelper.LoadInstallXml(this.ZipFilename, out installElement);
            if (packageFragmentValidationResult != null) return new PackageFragmentValidationResult[] { packageFragmentValidationResult };

            XElement packageFragmentInstallerBinariesElement = installElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallerBinariesElementName));
            if (packageFragmentInstallerBinariesElement != null)
            {
                List<PackageFragmentValidationResult> result1 = LoadAddOnFragmentInstallerBinaries(packageFragmentInstallerBinariesElement).ToList();
                if (result1.Count > 0) return result1;
            }

            XElement packageFragmentInstallersElement = installElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallersElementName));
            if (packageFragmentInstallersElement == null) return new PackageFragmentValidationResult[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The {0} file is wrongly formattet", PackageSystemSettings.InstallFilename)) };

            List<PackageFragmentValidationResult> result2 = LoadAddOnFragmentInstallers(packageFragmentInstallersElement).ToList();
            if (result2.Count > 0) return result2;

            return new PackageFragmentValidationResult[] { };
        }



        private IEnumerable<PackageFragmentValidationResult> LoadAddOnFragmentInstallerBinaries(XElement packageFragmentInstallerBinariesElement)
        {
            string binariesDirectory = Path.Combine(this.PackageInstallDirectory, PackageSystemSettings.BinariesDirectoryName);

            if (C1Directory.Exists(binariesDirectory) == false)
            {
                C1Directory.CreateDirectory(binariesDirectory);
            }

            foreach (XElement element in packageFragmentInstallerBinariesElement.Elements(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallerBinariesAddElementName)))
            {
                XAttribute pathAttribute = element.Attribute(PackageSystemSettings.PathAttributeName);

                string sourceFilename = pathAttribute.Value;
                string targetFilename = Path.Combine(binariesDirectory, Path.GetFileName(sourceFilename));

                ZipFileSystem zipFileSystem = new ZipFileSystem(this.ZipFilename);
                if (zipFileSystem.ContainsFile(sourceFilename) == false) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The file '{0}' is missing from the zipfile", sourceFilename)); continue; }

                if (C1File.Exists(targetFilename) == true) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The file '{0}' already exists", targetFilename)); continue; }

                zipFileSystem.WriteFileToDisk(sourceFilename, targetFilename);

                string newTargetFilename = Path.Combine(this.TempDirectory, Path.GetFileName(targetFilename));
                C1File.Copy(targetFilename, newTargetFilename);

                LoggingService.LogVerbose("AddOnInstaller", string.Format("Loading package uninstaller fragment assembly '{0}'", newTargetFilename));
                BuildManager.LoadAssemlby(newTargetFilename);
            }

            yield break;
        }



        private IEnumerable<PackageFragmentValidationResult> LoadAddOnFragmentInstallers(XElement packageFragmentInstallersElement)
        {
            Exception exception = null;
            foreach (XElement element in packageFragmentInstallersElement.Elements(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallersAddElementName)))
            {
                XAttribute installerTypeAttribute = element.Attribute(PackageSystemSettings.InstallerTypeAttributeName);
                if (installerTypeAttribute == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Missing attribute '{0}'", PackageSystemSettings.InstallerTypeAttributeName), element); continue; }

                Type installerType = TypeManager.TryGetType(installerTypeAttribute.Value);
                if (installerType == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Could not find install fragment type '{0}'", installerTypeAttribute.Value), installerTypeAttribute); continue; }

                exception = null;
                IPackageFragmentInstaller packageFragmentInstaller = null;
                try
                {
                    packageFragmentInstaller = Activator.CreateInstance(installerType) as IPackageFragmentInstaller;                    
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
                if (exception != null)
                {
                    yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception);
                    continue;
                }
                if (packageFragmentInstaller == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The type '{0}' does not implement {1}", installerTypeAttribute.Value, typeof(IPackageFragmentInstaller)), installerTypeAttribute); continue; }

                Type uninstallerType = null;
                if (this.CanBeUninstalled == true)
                {
                    XAttribute uninstallerTypeAttribute = element.Attribute(PackageSystemSettings.UninstallerTypeAttributeName);
                    if (uninstallerTypeAttribute == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Missing attribute '{0}'", PackageSystemSettings.UninstallerTypeAttributeName), element); continue; }

                    uninstallerType = TypeManager.TryGetType(uninstallerTypeAttribute.Value);
                    if (uninstallerType == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Could not find ininstall fragment type '{0}'", uninstallerTypeAttribute.Value), uninstallerTypeAttribute); continue; }

                    exception = null;
                    IPackageFragmentUninstaller packageFragmentUninstaller = null;
                    try
                    {
                        packageFragmentUninstaller = Activator.CreateInstance(uninstallerType) as IPackageFragmentUninstaller;                        
                    }
                    catch (Exception ex)
                    {
                        exception = ex;
                    }
                    if (exception != null)
                    {
                        yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception);
                        continue;
                    }
                    if (packageFragmentUninstaller == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The type '{0}' does not implement {1}", uninstallerTypeAttribute.Value, typeof(IPackageFragmentUninstaller)), uninstallerTypeAttribute); continue; }
                }

                exception = null;
                try
                {
                    packageFragmentInstaller.Initialize(_packageInstallerContex, element.Descendants(), element);
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
                if (exception != null)
                {
                    yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception);
                    continue;
                }

                _packageFramentInstallers.Add(packageFragmentInstaller, uninstallerType);
            }
        }
    }
}
