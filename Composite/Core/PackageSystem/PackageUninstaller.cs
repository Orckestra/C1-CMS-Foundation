using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Application;
using Composite.Core.IO;
using Composite.Core.IO.Zip;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.Transactions;


namespace Composite.Core.PackageSystem
{
    internal sealed class PackageUninstaller : IPackageUninstaller
    {
        public static readonly string LogTitle = typeof (PackageUninstaller).Name;
        private bool _isInitialized;
        private readonly List<IPackageFragmentUninstaller> _packageFramentUninstallers = new List<IPackageFragmentUninstaller>();

        private string ZipFilename { get; set; }
        private string UninstallFilename { get; set; }
        private string PackageInstallationDirectory { get; set; }
        private string TempDirectory { get; set; }
        private bool UseTransaction { get; set; }
        private PackageInformation PackageInformation { get; set; }



        public PackageUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction, PackageInformation packageInformation)
        {
            Verify.ArgumentNotNullOrEmpty(zipFilename, "zipFilename");
            Verify.ArgumentNotNullOrEmpty(uninstallFilename, "uninstallFilename");
            Verify.ArgumentNotNullOrEmpty(packageInstallationDirectory, "packageInstallationDirectory");
            Verify.ArgumentNotNullOrEmpty(tempDirectory, "tempDirectory");

            this.ZipFilename = zipFilename;
            this.UninstallFilename = uninstallFilename;
            this.PackageInstallationDirectory = packageInstallationDirectory;
            this.TempDirectory = tempDirectory;
            this.FlushOnCompletion = flushOnCompletion;
            this.ReloadConsoleOnCompletion = reloadConsoleOnCompletion;
            this.UseTransaction = useTransaction;
            this.PackageInformation = packageInformation;
        }


        public bool FlushOnCompletion { get; set; }
        public bool ReloadConsoleOnCompletion { get; set; }


        public IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = Initialize().ToList();
            if (validationResult.Count > 0)
            {
                return validationResult;
            }

            foreach (var packageFragmentUninstaller in _packageFramentUninstallers.OrderByDescending(p => p.ValidateFirst))
            {
                try
                {
                    validationResult.AddRange(packageFragmentUninstaller.Validate());
                }
                catch (Exception ex)
                {
                    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex));
                }
            }

            return validationResult;
        }
        



        public PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType)
        {
            try
            {
                if (systemLockingType == SystemLockingType.None)
                {
                    if (this.UseTransaction)
                    {
                        DoUninstall();
                    }
                    else
                    {
                        DoUninstallWithoutTransaction();
                    }
                }
                else
                {
                    bool isSoftSystemLocking = (systemLockingType == SystemLockingType.Soft);

                    string errorMessage;
                    if (!ApplicationOnlineHandlerFacade.CanPutApplicationOffline(isSoftSystemLocking, out errorMessage))
                    {
                        return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, errorMessage);
                    }

                    using (ApplicationOnlineHandlerFacade.TurnOffScope(isSoftSystemLocking))
                    {
                        if (this.UseTransaction)
                        {
                            DoUninstall();
                        }
                        else
                        {
                            DoUninstallWithoutTransaction();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex);
            }

            return null;
        }



        private void DoUninstall()
        {
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DoUninstallWithoutTransaction();

                transactionScope.Complete();
            }
        }



        private void DoUninstallWithoutTransaction()
        {
            var userName = UserValidationFacade.IsLoggedIn() ? UserValidationFacade.GetUsername() : "<system>";
            Log.LogInformation(LogTitle, $"Uninstalling package '{PackageInformation.Name}', Id = {PackageInformation.Id}. User name: '{userName}'");

            try
            {
                foreach (IPackageFragmentUninstaller packageFragmentUninstaller in _packageFramentUninstallers)
                {
                    packageFragmentUninstaller.Uninstall();
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);
                throw;
            }

            Log.LogInformation(LogTitle, "Package uninstalled successfully.");
        }


        private IEnumerable<PackageFragmentValidationResult> Initialize()
        {
            if (_isInitialized) throw new InvalidOperationException("Initialize may only be called once");
            _isInitialized = true;

            List<PackageFragmentValidationResult> result1 = LoadPackageFragmentInstallerBinaries().ToList();
            if (result1.Count > 0) return result1;

            XElement uninstallElement = null;
            Exception exception = null;
            try
            {
                uninstallElement = LoadXml();
            }
            catch (Exception ex)
            {
                exception = ex;
            }
            if (exception != null)
            {
                return new[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception) };
            }

            XElement packageFragmentUninstallersElement = uninstallElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentUninstallersElementName));
            if (packageFragmentUninstallersElement == null)
            {
                return new[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The '{0}' file is wrongly formatted", this.UninstallFilename)) };
            }
            
            List<PackageFragmentValidationResult> result2 = LoadPackageFramentUninstallers(packageFragmentUninstallersElement).ToList();
            if (result2.Any()) return result2;

            _packageFramentUninstallers.Reverse();

            return new PackageFragmentValidationResult[] { };
        }



        private IEnumerable<PackageFragmentValidationResult> LoadPackageFragmentInstallerBinaries()
        {
            string binariesDirectory = Path.Combine(this.PackageInstallationDirectory, PackageSystemSettings.BinariesDirectoryName);

            if (!C1Directory.Exists(binariesDirectory))
            {
                yield break;
            }

            foreach (string filename in C1Directory.GetFiles(binariesDirectory))
            {
                string newFilename = Path.Combine(this.TempDirectory, Path.GetFileName(filename));
                C1File.Copy(filename, newFilename);

                Log.LogVerbose("PackageUninstaller", "Loading package uninstaller fragment assembly '{0}'", newFilename);

                Exception exception = null;
                try
                {
                    PackageAssemblyHandler.AddAssembly(newFilename);
                }
                catch (Exception ex)
                {
                    exception = ex;
                }

                if (exception != null)
                {
                    yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception);
                }
            }
        }



        private IEnumerable<PackageFragmentValidationResult> LoadPackageFramentUninstallers(XElement packageFragmentInstallersElement)
        {
            PackageUninstallerContext packageUninstallerContext = null;

            Exception exception = null;
            try
            {
                string packageDirectory = Path.GetDirectoryName(ZipFilename);

                packageUninstallerContext = new PackageUninstallerContext(new ZipFileSystem(this.ZipFilename), packageDirectory, this.PackageInformation);
            }
            catch (Exception ex)
            {
                exception = ex;                
            }

            if (exception != null)
            {
                yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception);
                yield break;
            }

            
            foreach (XElement element in packageFragmentInstallersElement.Elements(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentUninstallersAddElementName)))
            {
                XAttribute uninstallerTypeAttribute = element.Attribute(PackageSystemSettings.UninstallerTypeAttributeName);
                if (uninstallerTypeAttribute == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Missing attribute '{0}'", PackageSystemSettings.UninstallerTypeAttributeName), element); continue; }

                Type uninstallerType = TypeManager.TryGetType(uninstallerTypeAttribute.Value);
                if (uninstallerType == null) { yield return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Could not find uninstall fragment type '{0}'", uninstallerTypeAttribute.Value), uninstallerTypeAttribute); continue; }

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

                try
                {
                    packageFragmentUninstaller.Initialize(packageUninstallerContext, element.Descendants(), element);
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

                _packageFramentUninstallers.Add(packageFragmentUninstaller);
            }
        }



        private XElement LoadXml()
        {
            XDocument doc = XDocumentUtils.Load(this.UninstallFilename);

            return doc.Root;
        }
    }
}
