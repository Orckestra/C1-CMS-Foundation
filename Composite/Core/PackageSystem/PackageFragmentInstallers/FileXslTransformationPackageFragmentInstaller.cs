using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class FileXslTransformationPackageFragmentInstaller : BasePackageFragmentInstaller
	{
        private static readonly string LogTitle = "XsltPackageFragmentInstaller";

        internal static readonly string TargetXmlAttributeName = "pathXml";
        internal static readonly string InputXmlAttributeName = "inputXml";
        internal static readonly string OutputXmlAttributeName = "outputXml";

        internal static readonly string TargetXslAttributeName = "pathXsl";
        internal static readonly string InstallXslAttributeName = "installXsl";
        internal static readonly string UninstallXslAttributeName = "uninstallXsl";

        internal static readonly string SkipIfNotExistAttributeName = "skipIfNotExist";
        internal static readonly string OverrideReadOnlyAttributeName = "overrideReadOnly";

		private List<XslTransformation> _xslTransformations;


        /// <exclude />
		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
            _xslTransformations = new List<XslTransformation>();
			var validationResult = new List<PackageFragmentValidationResult>();

            var filesElement = this.ConfigurationParent.GetSingleConfigurationElement("XslFiles", validationResult, false);
            if (filesElement == null)
            {
                return validationResult;
            }

            foreach (XElement fileElement in filesElement.GetConfigurationElements("XslFile", validationResult))
            {
                XAttribute pathXMLAttribute = fileElement.Attribute(TargetXmlAttributeName);
                XAttribute inputXMLAttribute = fileElement.Attribute(InputXmlAttributeName);
                XAttribute outputXMLAttribute = fileElement.Attribute(OutputXmlAttributeName);

                XAttribute pathXSLAttribute = fileElement.Attribute(TargetXslAttributeName);
                XAttribute installXSLAttribute = fileElement.Attribute(InstallXslAttributeName);
                XAttribute uninstallXSLAttribute = fileElement.Attribute(UninstallXslAttributeName);
                XAttribute overrideReadOnlyAttribute = fileElement.Attribute(OverrideReadOnlyAttributeName);

                XAttribute skipIfNotExistAttribute = fileElement.Attribute(SkipIfNotExistAttributeName);
                bool skipIfNotExist = skipIfNotExistAttribute != null && skipIfNotExistAttribute.Value.ToLower() == "true";

                if (pathXSLAttribute == null && installXSLAttribute == null)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute(TargetXmlAttributeName), fileElement);
                    continue;
                }

                if (outputXMLAttribute != null && uninstallXSLAttribute != null)
                {
                    validationResult.AddFatal("Xsl installer does not suppurt simultaneous usage of attributes '{0}' and '{1}'"
                                                .FormatWith(OutputXmlAttributeName, UninstallXslAttributeName), fileElement);
                    continue;
                }

                string xslFilePath = (pathXSLAttribute ?? installXSLAttribute).Value;


                XslTransformation xslFile;
                if (inputXMLAttribute != null)
                {
                    if (outputXMLAttribute == null)
                    {
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("outputFilename"), fileElement);
                        continue;
                    }

                    xslFile = new XslTransformation
                                    {
                                        XslPath = xslFilePath,
                                        InputXmlPath = inputXMLAttribute.Value,
                                        OutputXmlPath = outputXMLAttribute.Value
                                    };
                }
                else
                {
                    if (pathXMLAttribute == null)
                    {
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute(TargetXmlAttributeName), fileElement);
                        continue;
                    }

                    string pathToXmlFile = pathXMLAttribute.Value;

                    xslFile = new XslTransformation
                                    {
                                        XslPath = xslFilePath,
                                        // UninstallXslPath = uninstallXSLAttribute != null ? uninstallXSLAttribute.Value : null,
                                        InputXmlPath = pathToXmlFile,
                                        OutputXmlPath = pathToXmlFile
                                    };
                }

                if (!C1File.Exists(PathUtil.Resolve(xslFile.InputXmlPath)))
                {
                    if (skipIfNotExist) continue;

                    validationResult.AddFatal(Texts.FileXslTransformationPackageFragmentInstaller_FileNotFound(xslFile.InputXmlPath), fileElement);
                    continue;
                }

                string outputXmlFullPath = PathUtil.Resolve(xslFile.OutputXmlPath);
                if (C1File.Exists(outputXmlFullPath) && (C1File.GetAttributes(outputXmlFullPath) & FileAttributes.ReadOnly) > 0)
                {
                    if (overrideReadOnlyAttribute == null || overrideReadOnlyAttribute.Value != "true")
                    {
                        validationResult.AddFatal(Texts.FileXslTransformationPackageFragmentInstaller_FileReadOnly(xslFile.OutputXmlPath), fileElement);
                        continue;
                    }
                        
                    FileUtils.RemoveReadOnly(outputXmlFullPath);
                    Log.LogWarning(LogTitle, Texts.FileXslTransformationPackageFragmentInstaller_FileReadOnlyOverride(xslFile.OutputXmlPath));
                }

                if (!PathUtil.WritePermissionGranted(outputXmlFullPath))
                {
                    validationResult.AddFatal(Texts.NotEnoughNtfsPermissions(xslFile.OutputXmlPath), fileElement);
                    continue;
                }

                _xslTransformations.Add(xslFile);
            }


            if (validationResult.Count > 0)
            {
                _xslTransformations = null;
            }
            

			return validationResult;
		}



        /// <exclude />
		public override IEnumerable<XElement> Install()
		{
            if (_xslTransformations == null) throw new InvalidOperationException("FileXslTransformationPackageFragmentInstaller has not been validated");

			Stream stream;
			foreach (XslTransformation xslfile in _xslTransformations)
			{
				string messageFormat = xslfile.InputXmlPath == xslfile.OutputXmlPath ?
					"Performing XSL-transformation. xml-file: '{1}'; xsl-file: '{0}'"
					: "Performing XSL-transformation. xsl-file: '{0}'; input xml file: '{1}'; output xml file: '{2}'";

                Log.LogVerbose(LogTitle, string.Format(messageFormat, xslfile.XslPath, xslfile.InputXmlPath, xslfile.OutputXmlPath));

                string inputXml = PathUtil.Resolve(xslfile.InputXmlPath);
                string outputXml = PathUtil.Resolve(xslfile.OutputXmlPath);

                using (stream = this.InstallerContext.ZipFileSystem.GetFileStream(xslfile.XslPath))
				{
					var xslt = new XslCompiledTransform();
					using (XmlReader xslReader = XmlReader.Create(stream))
					{
						xslt.Load(xslReader);
					}

					var resultDocument = new XDocument();
					using (XmlWriter writer = resultDocument.CreateWriter())
					{
                        xslt.Transform(inputXml, writer);
					}

                    resultDocument.SaveToFile(outputXml);

                    Log.LogVerbose(LogTitle, resultDocument.ToString());
				}
			}

			return new[] {  this.Configuration.FirstOrDefault() };
		}


        private sealed class XslTransformation
		{
            public string XslPath { get; set; }
			public string InputXmlPath { get; set; }
			public string OutputXmlPath { get; set; }
		}
	}
}
