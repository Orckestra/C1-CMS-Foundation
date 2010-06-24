using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.IO;
using Composite.ConfigurationSystem;
using Composite.Xml;

namespace Composite.PackageSystem.PackageFragmentInstallers
{
    public sealed class ConfigurationTransformationPackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private const string _uninstallElementName = "Uninstall";
        private const string _xsltFilePathAttributeName = "xsltFilePath";

        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResults = new List<PackageFragmentValidationResult>();

            ConfigurationTransformationPackageFragmentInstaller.ValidateXslt(
                validationResults,
                () => this.UninstallElement,
                _uninstallElementName,
                () => this.UninstallElement.Attribute(_xsltFilePathAttributeName),
                () => this.UninstallXsltFilePath,
                this.AddOnUninstallerContex.ZipFileSystem,
                true);

            return validationResults;
        }

        public override void Uninstall()
        {
            using (Stream xsltFileStream = this.AddOnUninstallerContex.ZipFileSystem.GetFileStream(this.UninstallXsltFilePath))
            {
                using (TextReader xsltTextReader = new StreamReader(xsltFileStream))
                {
                    XDocument xslt = XDocument.Load(xsltTextReader);

                    ConfigurationServices.TransformConfiguration(xslt, false);
                }
            }
        }


        private XElement UninstallElement { get { return this.Configuration.FirstOrDefault(f => f.Name == _uninstallElementName); } }

        private string UninstallXsltFilePath
        {
            get
            {
                return this.UninstallElement.GetAttributeValue(_xsltFilePathAttributeName);
            }
        }

    }
}
