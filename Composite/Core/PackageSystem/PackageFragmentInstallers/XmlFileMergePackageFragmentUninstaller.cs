using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
	/// <summary>    
	/// </summary>
	/// <exclude />
	[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class XmlFileMergePackageFragmentUninstaller : BasePackageFragmentUninstaller
	{
        private sealed class XmlFileMerge
        {
            public string ChangeFilePath { get; set; }
            public string TargetPath { get; set; }
        }

        private IList<XmlFileMerge> _xmlFileMerges;

		/// <exclude />
		public override void Uninstall()
		{
			if (_xmlFileMerges == null) throw new InvalidOperationException("MergeXmlPackageFragmentUninstaller has not been validated");

            foreach (XmlFileMerge xmlFileMerge in _xmlFileMerges)
			{
				string targetXml = PathUtil.Resolve(xmlFileMerge.TargetPath);

				using (Stream stream = this.UninstallerContext.ZipFileSystem.GetFileStream(xmlFileMerge.ChangeFilePath))
				{
					XElement source = XElement.Load(stream);
					XDocument target = XDocumentUtils.Load(targetXml);

					target.Root.RemoveMatches(source);
					target.SaveToFile(targetXml);
				}
			}
		}

		/// <exclude />
		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
			List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (Configuration.Count(f => f.Name == MergeXmlFilePackageFragmentInstaller.mergeContainerElementName) > 1)
			{
				validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "OnlyOneFilesElement"));

				return validationResult;
			}

            IEnumerable<XElement> filesElement = this.Configuration.Where(f => f.Name == MergeXmlFilePackageFragmentInstaller.mergeContainerElementName);

			_xmlFileMerges = new List<XmlFileMerge>();

            foreach (var fileElement in filesElement.Elements(MergeXmlFilePackageFragmentInstaller.mergeElementName))
			{
                XAttribute changePathAttribute = fileElement.Attribute(MergeXmlFilePackageFragmentInstaller.changeDefFileAttributeName);
                XAttribute targetAttribute = fileElement.Attribute(MergeXmlFilePackageFragmentInstaller.targetFileAttributeName);

				if (changePathAttribute == null || targetAttribute == null)
				{
					validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "MissingAttribute", fileElement));

					continue;
				}

				XmlFileMerge xmlFileMerge = new XmlFileMerge {
					ChangeFilePath = changePathAttribute.Value,
					TargetPath = targetAttribute.Value
				};

				if (!C1File.Exists(PathUtil.Resolve(xmlFileMerge.TargetPath)))
				{
					validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "FileNotFound", fileElement));

					continue;
				}

				_xmlFileMerges.Add(xmlFileMerge);
			}

			if (validationResult.Count > 0)
			{
				_xmlFileMerges = null;
			}

			return validationResult;
		}
	}
}
