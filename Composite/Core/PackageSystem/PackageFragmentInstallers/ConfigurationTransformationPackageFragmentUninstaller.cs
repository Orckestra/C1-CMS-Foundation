using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Xml;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
            using (System.IO.Stream xsltFileStream = this.AddOnUninstallerContex.ZipFileSystem.GetFileStream(this.UninstallXsltFilePath))
            {
                using (System.IO.TextReader xsltTextReader = new StreamReader(xsltFileStream))
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
