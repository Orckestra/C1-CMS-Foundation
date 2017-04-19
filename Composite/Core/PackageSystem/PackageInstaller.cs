using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.IO.Zip;
using Composite.Core.Logging;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.PackageSystem.PackageFragmentInstallers;
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
        internal static event Action OnPackageInstallation;


        /// <exclude />
        public PackageInstaller(IPackageInstallerUninstallerFactory packageInstallerUninstallerFactory, string zipFilename, string packageInstallDirectory, string tempDirectory, PackageInformation packageInformation)
        {
            if (packageInstallerUninstallerFactory == null) throw new ArgumentNullException("packageInstallerUninstallerFactory");
            if (string.IsNullOrEmpty(zipFilename)) throw new ArgumentNullException("zipFilename");
            if (string.IsNullOrEmpty(packageInstallDirectory)) throw new ArgumentNullException("packageInstallDirectory");
            if (string.IsNullOrEmpty(tempDirectory)) throw new ArgumentNullException("tempDirectory");
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
                    var onPackageInstallation = OnPackageInstallation;
                    if (onPackageInstallation != null)
                    {
                        onPackageInstallation();
                    }

                    if (systemLockingType == SystemLockingType.None 
                        || !ApplicationOnlineHandlerFacade.IsApplicationOnline
                        || SystemSetupFacade.SetupIsRunning)
                    {
                        return DoInstall();
                    }

                    bool isSoftSystemLocking = systemLockingType == SystemLockingType.Soft;

                    string errorMessage;
                    if(!ApplicationOnlineHandlerFacade.CanPutApplicationOffline(isSoftSystemLocking, out errorMessage))
                    {
                        return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, errorMessage);
                    }

                    using (ApplicationOnlineHandlerFacade.TurnOffScope(isSoftSystemLocking))
                    {
                        return DoInstall();
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
            using (var transactionScope = TransactionsFacade.Create(true, TimeSpan.FromMinutes(30.0)))
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

                        if (this.CanBeUninstalled)
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
                    if (this.CanBeUninstalled)
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
                    if (this.CanBeUninstalled)
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
            if (_isInitialized) throw new InvalidOperationException("Initialize() may only be called once");
            _isInitialized = true;

            Exception exception = null;
            try
            {
                _packageInstallerContex = new PackageInstallerContext(new ZipFileSystem(this.ZipFilename), this.PackageInstallDirectory, this.TempDirectory, this.PackageInformation);
            }
            catch (Exception ex)
            {
                exception = ex;
            }
            if (exception != null) return new [] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception) };

            PackageAssemblyHandler.ClearAssemblyList();

            XElement installElement;
            PackageFragmentValidationResult packageFragmentValidationResult = XmlHelper.LoadInstallXml(this.ZipFilename, out installElement);
            if (packageFragmentValidationResult != null) return new [] { packageFragmentValidationResult };

            XElement packageFragmentInstallerBinariesElement = installElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallerBinariesElementName));
            if (packageFragmentInstallerBinariesElement != null)
            {
                List<PackageFragmentValidationResult> result1 = LoadPackageFragmentInstallerBinaries(packageFragmentInstallerBinariesElement).ToList();
                if (result1.Count > 0) return result1;
            }

            XElement packageFragmentInstallersElement = installElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallersElementName));
            if (packageFragmentInstallersElement == null) return new [] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The {0} file is wrongly formatted", PackageSystemSettings.InstallFilename)) };

            var result2 = LoadPackageFragmentInstallers(packageFragmentInstallersElement);
            if (result2.Count > 0) return result2;

            return new PackageFragmentValidationResult[] { };
        }



        private IEnumerable<PackageFragmentValidationResult> LoadPackageFragmentInstallerBinaries(XElement packageFragmentInstallerBinariesElement)
        {
            var binaryElements = packageFragmentInstallerBinariesElement.Elements(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace,
                                        PackageSystemSettings.PackageFragmentInstallerBinariesAddElementName)).ToList();

            if (!binaryElements.Any())
            {
                return new PackageFragmentValidationResult[0];
            }

            string binariesDirectory = Path.Combine(this.PackageInstallDirectory, PackageSystemSettings.BinariesDirectoryName);

            if (!C1Directory.Exists(binariesDirectory))
            {
                C1Directory.CreateDirectory(binariesDirectory);
            }

            var result = new List<PackageFragmentValidationResult>();

            foreach (XElement element in binaryElements)
            {
                XAttribute pathAttribute = element.Attribute(PackageSystemSettings.PathAttributeName);

                string sourceFilename = pathAttribute.Value;
                string targetFilename = Path.Combine(binariesDirectory, Path.GetFileName(sourceFilename));

                ZipFileSystem zipFileSystem = new ZipFileSystem(this.ZipFilename);
                if (!zipFileSystem.ContainsFile(sourceFilename))
                {
                    result.AddFatal($"The file '{sourceFilename}' is missing from the zip file");
                    continue;
                }

                // Extracting dll to package temp folder
                if (C1File.Exists(targetFilename))
                {
                    bool success = false;
                    try
                    {
                        FileUtils.Delete(targetFilename);
                        success = true;
                    }
                    catch(UnauthorizedAccessException) {}

                    if(!success)
                    {
                        result.AddFatal($"Access denied to file '{targetFilename}'");
                        continue;
                    }
                }

                zipFileSystem.WriteFileToDisk(sourceFilename, targetFilename);

                string newTargetFilename = Path.Combine(this.TempDirectory, Path.GetFileName(targetFilename));
                C1File.Copy(targetFilename, newTargetFilename);

                Log.LogVerbose("PackageInstaller", "Loading package uninstaller fragment assembly '{0}'", newTargetFilename);

                PackageAssemblyHandler.AddAssembly(newTargetFilename);
            }

            return result;
        }



        private IList<PackageFragmentValidationResult> LoadPackageFragmentInstallers(XElement packageFragmentInstallersElement)
        {
            var result = new List<PackageFragmentValidationResult>();

            XName packageInstallerXName = XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallersAddElementName);
            foreach (XElement element in packageFragmentInstallersElement.Elements(packageInstallerXName))
            {
                XAttribute installerTypeAttribute = element.Attribute(PackageSystemSettings.InstallerTypeAttributeName);
                if (installerTypeAttribute == null)
                {
                    result.AddFatal($"Missing attribute '{PackageSystemSettings.InstallerTypeAttributeName}'", element);
                    continue;
                }

                Type installerType = TypeManager.TryGetType(installerTypeAttribute.Value);
                if (installerType == null)
                {
                    result.AddFatal($"Could not find install fragment type '{installerTypeAttribute.Value}'", installerTypeAttribute);
                    continue;
                }

                IPackageFragmentInstaller packageFragmentInstaller;
                try
                {
                    packageFragmentInstaller = Activator.CreateInstance(installerType) as IPackageFragmentInstaller;                    
                }
                catch (Exception ex)
                {
                    result.AddFatal(ex);
                    continue;
                }

                if (packageFragmentInstaller == null)
                {
                    result.AddFatal($"The type '{installerTypeAttribute.Value}' does not implement {typeof (IPackageFragmentInstaller)}", installerTypeAttribute); 
                    continue;
                }

                Type uninstallerType = null;
                if (this.CanBeUninstalled)
                {
                    XAttribute uninstallerTypeAttribute = element.Attribute(PackageSystemSettings.UninstallerTypeAttributeName);
                    if (uninstallerTypeAttribute == null)
                    {
                        result.AddFatal($"Missing attribute '{PackageSystemSettings.UninstallerTypeAttributeName}'", element); 
                        continue;
                    }

                    uninstallerType = TypeManager.TryGetType(uninstallerTypeAttribute.Value);
                    if (uninstallerType == null)
                    {
                        result.AddFatal($"Could not find uninstall fragment type '{uninstallerTypeAttribute.Value}'", uninstallerTypeAttribute); 
                        continue; 
                    }

                    IPackageFragmentUninstaller packageFragmentUninstaller;
                    try
                    {
                        packageFragmentUninstaller = Activator.CreateInstance(uninstallerType) as IPackageFragmentUninstaller;                        
                    }
                    catch (Exception ex)
                    {
                        result.AddFatal(ex);
                        continue;
                    }

                    if (packageFragmentUninstaller == null)
                    {
                        result.AddFatal($"The type '{uninstallerTypeAttribute.Value}' does not implement {typeof (IPackageFragmentUninstaller)}", uninstallerTypeAttribute); 
                        continue;
                    }
                }

                try
                {
                    packageFragmentInstaller.Initialize(_packageInstallerContex, element.Descendants(), element);
                }
                catch (Exception ex)
                {
                    result.AddFatal(ex);
                    continue;
                }

                _packageFramentInstallers.Add(packageFragmentInstaller, uninstallerType);
            }

            return result;
        }
    }
}
