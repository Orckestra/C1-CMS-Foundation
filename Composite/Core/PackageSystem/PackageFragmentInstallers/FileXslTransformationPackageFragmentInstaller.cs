using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Xml;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class FileXslTransformationPackageFragmentInstaller : BasePackageFragmentInstaller
	{
        private const string _loggerSenderText = "XsltPackageFragmentInstaller";

        internal static readonly string TargetXmlAttributeName = "pathXml";
        internal static readonly string InputXmlAttributeName = "inputXml";
        internal static readonly string OutputXmlAttributeName = "outputXml";

        internal static readonly string TargetXslAttributeName = "pathXsl";
        internal static readonly string InstallXslAttributeName = "installXsl";
        internal static readonly string UninstallXslAttributeName = "uninstallXsl";

        internal static readonly string SkipIfNotExistAttributeName = "skipIfNotExist";
        internal static readonly string OverrideReadOnlyAttributeName = "overrideReadOnly";

		private List<XslToAdd> _xslToAdd;


        /// <exclude />
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

			_xslToAdd = new List<XslToAdd>();

            if (filesElement != null)
            {
                foreach (XElement fileElement in filesElement.Elements("XslFile"))
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
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                            GetResourceString("FileXslTransformationPackageFragmentInstaller.MissingAttribute").FormatWith(TargetXmlAttributeName),
                            fileElement));
                        continue;
                    }

                    if (outputXMLAttribute != null && uninstallXSLAttribute != null)
                    {
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                            "Xsl installer does not suppurt simultanious usage of attributes '{0}' and '{1}'".FormatWith(OutputXmlAttributeName, UninstallXslAttributeName),
                            fileElement));
                        continue;
                    }

                    string xslFilePath = (pathXSLAttribute ?? installXSLAttribute).Value;


                    XslToAdd xslFile;
                    if (inputXMLAttribute != null)
                    {
                        if (outputXMLAttribute == null)
                        {
                            validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                GetResourceString("FileXslTransformationPackageFragmentInstaller.MissingAttribute").FormatWith("outputFilename"),
                                fileElement));
                            continue;
                        }

                        xslFile = new XslToAdd
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
                            validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                GetResourceString("FilePackageFragmentInstaller.MissingAttribute").FormatWith(TargetXmlAttributeName),
                                fileElement));
                            continue;
                        }

                        string pathToXmlFile = pathXMLAttribute.Value;

                        xslFile = new XslToAdd
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

                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                GetResourceString("FileXslTransformationPackageFragmentInstaller.FileNotFound").FormatWith(xslFile.InputXmlPath),
                                fileElement));
                        continue;
                    }

                    string outputXmlFullPath = PathUtil.Resolve(xslFile.OutputXmlPath);
                    if (C1File.Exists(outputXmlFullPath) && (C1File.GetAttributes(outputXmlFullPath) & FileAttributes.ReadOnly) > 0)
                    {
                        if (overrideReadOnlyAttribute == null || overrideReadOnlyAttribute.Value != "true")
                        {
                            validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal,
                                    GetResourceString("FileXslTransformationPackageFragmentInstaller.FileReadOnly").FormatWith(xslFile.OutputXmlPath),
                                    fileElement));
                            continue;
                        }
                        else
                        {
                            FileUtils.RemoveReadOnly(outputXmlFullPath);
                            LoggingService.LogWarning(_loggerSenderText, GetResourceString("FileXslTransformationPackageFragmentInstaller.FileReadOnlyOverride").FormatWith(xslFile.OutputXmlPath));
                        }
                    }



                    _xslToAdd.Add(xslFile);
                }
            }


            if (validationResult.Count > 0)
            {
                _xslToAdd = null;
            }
            

			return validationResult;
		}



        /// <exclude />
		public override IEnumerable<XElement> Install()
		{
            if (_xslToAdd == null) throw new InvalidOperationException("FileXslTransformationPackageFragmentInstaller has not been validated");

			Stream stream;
			foreach (XslToAdd xslfile in _xslToAdd)
			{
				string messageFormat = xslfile.InputXmlPath == xslfile.OutputXmlPath ?
					"Performing XSL-transformation. xml-file: '{1}'; xsl-file: '{0}'"
					: "Performing XSL-transformation. xsl-file: '{0}'; input xml file: '{1}'; output xml file: '{2}'";

                LoggingService.LogVerbose(_loggerSenderText, string.Format(messageFormat, xslfile.XslPath, xslfile.InputXmlPath, xslfile.OutputXmlPath));

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

                    LoggingService.LogVerbose(_loggerSenderText, resultDocument.ToString());
				}
			}

			return new[] {  this.Configuration.FirstOrDefault() };
		}


        private sealed class XslToAdd
		{
            public string XslPath { get; set; }
			public string InputXmlPath { get; set; }
			public string OutputXmlPath { get; set; }
		}
	}
}
