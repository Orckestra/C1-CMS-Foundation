using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

using Composite.Xml;
using System.IO;
using Composite.ConfigurationSystem;
using System.Configuration;
using Composite.IO.Zip;
using Composite.ResourceSystem;

namespace Composite.PackageSystem.PackageFragmentInstallers
{
    public sealed class ConfigurationTransformationPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private const string _installElementName = "Install";
        private const string _uninstallElementName = "Uninstall";
        private const string _xsltFilePathAttributeName = "xsltFilePath";


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResults = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count() > 2) validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.ExpectedExactlyTwoElements"), _installElementName, _uninstallElementName)));

            ValidateXslt(
                validationResults,
                () => this.InstallElement,
                _installElementName,
                () => this.InstallElement.Attribute(_xsltFilePathAttributeName),
                () => this.InstallXsltFilePath,
                this.AddOnInstallerContex.ZipFileSystem,
                true);

            if (this.AddOnInstallerContex.AddOnInformation.CanBeUninstalled == true)
            {

                ValidateXslt(
                    validationResults,
                    () => this.UninstallElement,
                    _uninstallElementName,
                    () => this.UninstallElement.Attribute(_xsltFilePathAttributeName),
                    () => this.UninstallXsltFilePath,
                    this.AddOnInstallerContex.ZipFileSystem,
                    false);

            }

            return validationResults;
        }



        public override IEnumerable<XElement> Install()
        {
            using (Stream xsltFileStream = this.AddOnInstallerContex.ZipFileSystem.GetFileStream(this.InstallXsltFilePath))
            {
                using (TextReader xsltTextReader = new StreamReader(xsltFileStream))
                {
                    XDocument xslt = XDocument.Load(xsltTextReader);

                    ConfigurationServices.TransformConfiguration(xslt, false);
                }
            }

            if (this.AddOnInstallerContex.AddOnInformation.CanBeUninstalled == true)
            {
                yield return this.UninstallElement;
            }
            else
            {
                yield break;
            }
        }



        internal static void ValidateXslt(List<PackageFragmentValidationResult> validationResults, Func<XElement> elementProvider, string elementName, Func<XAttribute> xsltPathAttributeProvider, Func<string> xsltFilePathProvider, IZipFileSystem zipFileSystem, bool validateResultingConfigurationFile)
        {
            if (elementProvider() == null)
            {
                validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.MissingElement"), elementName)));
            }
            else
            {
                if (xsltFilePathProvider() == null)
                {
                    validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.MissingAttribute"), _xsltFilePathAttributeName), elementProvider()));
                }
                else
                {
                    if (zipFileSystem.ContainsFile(xsltFilePathProvider()) == false)
                    {
                        validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.PathDoesNotExist"), xsltFilePathProvider()), xsltPathAttributeProvider()));
                    }
                    else
                    {
                        using (Stream xsltFileStream = zipFileSystem.GetFileStream(xsltFilePathProvider()))
                        {
                            using (TextReader xsltTextReader = new StreamReader(xsltFileStream))
                            {
                                XDocument xslt = null;

                                try
                                {
                                    xslt = XDocument.Load(xsltTextReader);
                                }
                                catch (Exception ex)
                                {
                                    validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.UnableToParsXslt"), xsltFilePathProvider(), ex.Message), xsltPathAttributeProvider()));
                                }

                                if (xslt != null && validateResultingConfigurationFile == true)
                                {
                                    try
                                    {
                                        ConfigurationServices.TransformConfiguration(xslt, true);
                                    }
                                    catch (ConfigurationException ex)
                                    {
                                        validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.XsltWillGeneratedInvalid"), xsltFilePathProvider(), ex.BareMessage), xsltPathAttributeProvider()));
                                    }
                                    catch (Exception ex)
                                    {
                                        validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "ConfigurationTransformationAddOnFragmentInstaller.XsltWillGeneratedInvalid"), xsltFilePathProvider(), ex.Message), xsltPathAttributeProvider()));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }



        private XElement InstallElement { get { return this.Configuration.FirstOrDefault(f => f.Name == _installElementName); } }
        private XElement UninstallElement { get { return this.Configuration.FirstOrDefault(f => f.Name == _uninstallElementName); } }

        private string InstallXsltFilePath
        {
            get
            {
                return InstallElement.GetAttributeValue(_xsltFilePathAttributeName);
            }
        }


        private string UninstallXsltFilePath
        {
            get
            {
                return this.UninstallElement.GetAttributeValue(_xsltFilePathAttributeName);
            }
        }
    }
}
