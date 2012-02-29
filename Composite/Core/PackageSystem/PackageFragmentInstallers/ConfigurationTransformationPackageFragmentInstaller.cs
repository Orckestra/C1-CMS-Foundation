using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.IO.Zip;
using Composite.Core.Xml;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConfigurationTransformationPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private const string _installElementName = "Install";
        private const string _uninstallElementName = "Uninstall";
        private const string _xsltFilePathAttributeName = "xsltFilePath";


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResults = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count() > 2)
            {
                validationResults.AddFatal(
                    GetResourceString("ConfigurationTransformationPackageFragmentInstaller.ExpectedExactlyTwoElements")
                    .FormatWith(_installElementName, _uninstallElementName));
            }

            ValidateXslt(
                validationResults,
                () => this.InstallElement,
                _installElementName,
                () => this.InstallElement.Attribute(_xsltFilePathAttributeName),
                () => this.InstallXsltFilePath,
                this.InstallerContext.ZipFileSystem,
                true);

            if (this.InstallerContext.PackageInformation.CanBeUninstalled == true)
            {

                ValidateXslt(
                    validationResults,
                    () => this.UninstallElement,
                    _uninstallElementName,
                    () => this.UninstallElement.Attribute(_xsltFilePathAttributeName),
                    () => this.UninstallXsltFilePath,
                    this.InstallerContext.ZipFileSystem,
                    false);

            }

            return validationResults;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            using (Stream xsltFileStream = this.InstallerContext.ZipFileSystem.GetFileStream(this.InstallXsltFilePath))
            {
                using (TextReader xsltTextReader = new StreamReader(xsltFileStream))
                {
                    XDocument xslt = XDocument.Load(xsltTextReader);

                    ConfigurationServices.TransformConfiguration(xslt, false);
                }
            }

            if (this.InstallerContext.PackageInformation.CanBeUninstalled == true)
            {
                yield return this.UninstallElement;
            }
        }



        internal static void ValidateXslt(List<PackageFragmentValidationResult> validationResults, Func<XElement> elementProvider, string elementName, Func<XAttribute> xsltPathAttributeProvider, Func<string> xsltFilePathProvider, IZipFileSystem zipFileSystem, bool validateResultingConfigurationFile)
        {
            if (elementProvider() == null)
            {
                validationResults.AddFatal(
                    GetResourceString("ConfigurationTransformationPackageFragmentInstaller.MissingElement")
                    .FormatWith(elementName));
                return;
            }
            
            if (xsltFilePathProvider() == null)
            {
                validationResults.AddFatal(
                    GetResourceString("ConfigurationTransformationPackageFragmentInstaller.MissingAttribute")
                    .FormatWith(_xsltFilePathAttributeName), elementProvider());
                return;
            }
                
            if (zipFileSystem.ContainsFile(xsltFilePathProvider()) == false)
            {
                validationResults.AddFatal(
                    GetResourceString("ConfigurationTransformationPackageFragmentInstaller.PathDoesNotExist")
                    .FormatWith(xsltFilePathProvider()), xsltPathAttributeProvider());
                return;
            }
                    
            using (Stream xsltFileStream = zipFileSystem.GetFileStream(xsltFilePathProvider()))
            {
                using (TextReader xsltTextReader = new C1StreamReader(xsltFileStream))
                {
                    XDocument xslt = null;

                    try
                    {
                        xslt = XDocument.Load(xsltTextReader);
                    }
                    catch (Exception ex)
                    {
                        validationResults.AddFatal(
                            GetResourceString("ConfigurationTransformationPackageFragmentInstaller.UnableToParsXslt")
                            .FormatWith(xsltFilePathProvider(), ex.Message), xsltPathAttributeProvider());
                    }

                    if (xslt != null && validateResultingConfigurationFile == true)
                    {
                        try
                        {
                            ConfigurationServices.TransformConfiguration(xslt, true);
                        }
                        //catch (ConfigurationException ex)
                        //{
                        //    validationResults.AddFatal(
                        //        GetResourceString("ConfigurationTransformationPackageFragmentInstaller.XsltWillGeneratedInvalid")
                        //        .FormatWith(xsltFilePathProvider(), ex.Message), xsltPathAttributeProvider());
                        //}
                        catch (Exception ex)
                        {
                            validationResults.AddFatal(
                                GetResourceString("ConfigurationTransformationPackageFragmentInstaller.XsltWillGeneratedInvalid")
                                .FormatWith(xsltFilePathProvider(), ex.Message), xsltPathAttributeProvider());
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
