using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Core.IO;
using Composite.Core.Xml;

using Installer = Composite.Core.PackageSystem.PackageFragmentInstallers.FileXslTransformationPackageFragmentInstaller;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class FileXslTransformationPackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private List<XslTransformation> _xsls;

        /// <exclude />
		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
            _xsls = new List<XslTransformation>();
			var validationResult = new List<PackageFragmentValidationResult>();

            var filesElement = this.ConfigurationParent.GetSingleConfigurationElement("XslFiles", validationResult, false);
            if (filesElement == null)
            {
                return validationResult;
            }

            foreach (XElement fileElement in filesElement.Elements("XslFile"))
            {
                XAttribute pathXMLAttribute = fileElement.Attribute(Installer.TargetXmlAttributeName);
                XAttribute pathXSLAttribute = fileElement.Attribute(Installer.UninstallXslAttributeName);

                if (pathXMLAttribute == null)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute(Installer.TargetXmlAttributeName), fileElement);
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
            


            if (validationResult.Count > 0)
            {
                _xsls = null;
            }

			return validationResult;
		}


        /// <exclude />
		public override void Uninstall()
		{
            if (_xsls == null) throw new InvalidOperationException("FileXslTransformationPackageFragmentUninstaller has not been validated");

			Stream stream;
            foreach (XslTransformation xslfile in _xsls)
			{
                Log.LogVerbose("XsltPackageFragmentInstaller",
                    string.Format("Performing XSL-transformation. xml-file: '{0}'; xsl-file: '{1}'", xslfile.pathXml, xslfile.pathXsl));

			    string xmlFilePath = PathUtil.Resolve(xslfile.pathXml);

                using (stream = this.UninstallerContext.ZipFileSystem.GetFileStream(xslfile.pathXsl))
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

                    resultDocument.SaveToFile(xmlFilePath);

					Log.LogVerbose("XsltTransformationResult", resultDocument.ToString());
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
