using System;
using System.Collections.Generic;
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
    internal sealed class PackageUninstaller : IPackageUninstaller
    {
        private bool _isInitialized = false;
        private List<IPackageFragmentUninstaller> _packageFramentUninstallers = new List<IPackageFragmentUninstaller>();

        private string ZipFilename { get; set; }
        private string UninstallFilename { get; set; }
        private string AddOnInstallationDirectory { get; set; }
        private string TempDirectory { get; set; }
        private bool UseTransaction { get; set; }



        public PackageUninstaller(string zipFilename, string uninstallFilename, string packageInstallationDirectory, string tempDirectory, bool flushOnCompletion, bool reloadConsoleOnCompletion, bool useTransaction)
        {
            if (string.IsNullOrEmpty(zipFilename) == true) throw new ArgumentNullException("zipFilename");
            if (string.IsNullOrEmpty(uninstallFilename) == true) throw new ArgumentNullException("uninstallFilename");
            if (string.IsNullOrEmpty(packageInstallationDirectory) == true) throw new ArgumentNullException("packageInstallationDirectory");
            if (string.IsNullOrEmpty(tempDirectory) == true) throw new ArgumentNullException("tempDirectory");

            this.ZipFilename = zipFilename;
            this.UninstallFilename = uninstallFilename;
            this.AddOnInstallationDirectory = packageInstallationDirectory;
            this.TempDirectory = tempDirectory;
            this.FlushOnCompletion = flushOnCompletion;
            this.ReloadConsoleOnCompletion = reloadConsoleOnCompletion;
            this.UseTransaction = useTransaction;
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

            foreach (IPackageFragmentUninstaller packageFragmentUninstaller in _packageFramentUninstallers)
            {
                List<PackageFragmentValidationResult> result = null;
                try
                {
                    result = packageFragmentUninstaller.Validate().ToList();
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
        



        public PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType)
        {
            try
            {
                if (systemLockingType == SystemLockingType.None)
                {
                    if (this.UseTransaction == true)
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
                    using (ApplicationOnlineHandlerFacade.TurnOffScope(systemLockingType == SystemLockingType.Soft))
                    {
                        if (this.UseTransaction == true)
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
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DoUninstallWithoutTransaction();

                transactionScope.Complete();
            }
        }



        private void DoUninstallWithoutTransaction()
        {
            foreach (IPackageFragmentUninstaller packageFragmentUninstaller in _packageFramentUninstallers)
            {
                packageFragmentUninstaller.Uninstall();
            }
        }


        private IEnumerable<PackageFragmentValidationResult> Initialize()
        {
            if (_isInitialized == true) throw new InvalidOperationException("Initialize may only be called once");
            _isInitialized = true;

            List<PackageFragmentValidationResult> result1 = LoadAddOnFragmentInstallerBinaries().ToList();
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
                return new PackageFragmentValidationResult[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception) };
            }

            XElement packageFragmentUninstallersElement = uninstallElement.Element(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentUninstallersElementName));
            if (packageFragmentUninstallersElement == null) return new PackageFragmentValidationResult[] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("The {0} file is wrongly formattet", this.UninstallFilename)) };

            List<PackageFragmentValidationResult> result2 = LoadAddOnFramentUninstallers(packageFragmentUninstallersElement).ToList();
            if (result2.Count > 0) return result2;

            _packageFramentUninstallers.Reverse();

            return new PackageFragmentValidationResult[] { };
        }



        private IEnumerable<PackageFragmentValidationResult> LoadAddOnFragmentInstallerBinaries()
        {
            string binariesDirectory = System.IO.Path.Combine(this.AddOnInstallationDirectory, PackageSystemSettings.BinariesDirectoryName);

            if (Directory.Exists(binariesDirectory) == true)
            {
                foreach (string filename in Directory.GetFiles(binariesDirectory))
                {
                    string newFilename = System.IO.Path.Combine(this.TempDirectory, System.IO.Path.GetFileName(filename));
                    File.Copy(filename, newFilename);

                    LoggingService.LogVerbose("AddOnUninstaller", string.Format("Loading package uninstaller fragment assembly '{0}'", newFilename));

                    Exception exception = null;
                    try
                    {
                        BuildManager.LoadAssemlby(newFilename);
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

            yield break;
        }



        private IEnumerable<PackageFragmentValidationResult> LoadAddOnFramentUninstallers(XElement packageFragmentInstallersElement)
        {
            PackageUninstallerContext packageUninstallerContex = null;

            Exception exception = null;
            try
            {
                packageUninstallerContex = new PackageUninstallerContext(new ZipFileSystem(this.ZipFilename));
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

                exception = null;
                try
                {
                    packageFragmentUninstaller.Initialize(element.Descendants(), packageUninstallerContex);
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
