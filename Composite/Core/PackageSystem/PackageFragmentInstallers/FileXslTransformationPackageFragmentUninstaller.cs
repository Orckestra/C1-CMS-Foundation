using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Extensions;
using Installer = Composite.Core.PackageSystem.PackageFragmentInstallers.FileXslTransformationPackageFragmentInstaller;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class FileXslTransformationPackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private List<XslTransformation> _xsls;

		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
			List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

			if (this.Configuration.Where(f => f.Name == "XslFiles").Count() > 1)
			{
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                    GetResourceString("FileXslTransformationPackageFragmentInstaller.OnlyOneFilesElement")));
				return validationResult;
			}

			var filesElement = this.Configuration.Where(f => f.Name == "XslFiles");
			if (filesElement.SingleOrDefault() == null) return validationResult;

            _xsls = new List<XslTransformation>();

			foreach (XElement fileElement in filesElement.Elements("XslFile"))
			{
                XAttribute pathXMLAttribute = fileElement.Attribute(Installer.TargetXmlAttributeName);
                XAttribute pathXSLAttribute = fileElement.Attribute(Installer.UninstallXslAttributeName);

                if (pathXMLAttribute == null)
				{
				    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                        GetResourceString("FileXslTransformationPackageFragmentInstaller.MissingAttribute").FormatWith(Installer.TargetXmlAttributeName),
                        fileElement));
                    continue;
				}

                if (pathXSLAttribute == null)
                {
                    //if there isn no uninstall xsl
                    continue;
                }

                string inputPathXMLAttributeValue = PathUtil.Resolve(pathXMLAttribute.Value);
                string inpuPathXSLAttributeValue = pathXSLAttribute.Value;

                _xsls.Add(new XslTransformation
                {
                    pathXml = inputPathXMLAttributeValue,
                    pathXsl = inpuPathXSLAttributeValue
                });
			}

			return validationResult;
		}

		public override void Uninstall()
		{
            if (_xsls == null) throw new InvalidOperationException("Has not been validated");

			Stream stream;
            foreach (XslTransformation xslfile in _xsls)
			{
                LoggingService.LogVerbose("XsltPackageFragmentInstaller",
                    string.Format("Performing XSL-transformation. xml-file: '{0}'; xsl-file: '{1}'", xslfile.pathXml, xslfile.pathXsl));

			    string xmlFilePath = PathUtil.Resolve(xslfile.pathXml);

                using (stream = this.AddOnUninstallerContex.ZipFileSystem.GetFileStream(xslfile.pathXsl))
				{
					var xslt = new XslCompiledTransform();
					using (XmlReader xslReader = XmlReader.Create(stream))
					{
						xslt.Load(xslReader);
					}

					var resultDocument = new XDocument();
					using (XmlWriter writer = resultDocument.CreateWriter())
					{
                        xslt.Transform(xmlFilePath, writer);
					}

                    resultDocument.Save(xmlFilePath);

					LoggingService.LogVerbose("XsltTransformationResult", resultDocument.ToString());
				}
			}

		}

        private sealed class XslTransformation
        {
            public string pathXml { get; set; }
            public string pathXsl { get; set; }
        }
	}
}
