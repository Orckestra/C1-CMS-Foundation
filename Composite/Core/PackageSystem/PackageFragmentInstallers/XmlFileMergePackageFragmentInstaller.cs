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
	public class MergeXmlFilePackageFragmentInstaller : BasePackageFragmentInstaller
	{
        private static readonly string LogTitle = "MergeXmlPackageFragmentInstaller";

        internal static readonly string mergeContainerElementName = "XmlFileMerges";
        internal static readonly string mergeElementName = "XmlFileMerge";
        internal static readonly string changeDefFileAttributeName = "changeDefinitionPath";
        internal static readonly string targetFileAttributeName = "targetFilePath";


        private sealed class XmlFileMerge
		{
			public string ChangeFilePath { get; set; }
			public string TargetPath { get; set; }
		}

		private IList<XmlFileMerge> _xmlFileMerges;

		/// <exclude />
		public override IEnumerable<XElement> Install()
		{
			if (_xmlFileMerges == null) throw new InvalidOperationException("MergeXmlPackageFragmentInstaller has not been validated");

			foreach (XmlFileMerge xmlFileMerge in _xmlFileMerges)
			{
				string targetXmlFile = PathUtil.Resolve(xmlFileMerge.TargetPath);

				using (Stream stream = this.InstallerContext.ZipFileSystem.GetFileStream(xmlFileMerge.ChangeFilePath))
				{
					XElement source = XElement.Load(stream);
					XDocument target = XDocumentUtils.Load(targetXmlFile);

                    target.Root.ImportSubtree(source);
					target.SaveToFile(targetXmlFile);
				}
			}

			return new[] { this.Configuration.FirstOrDefault() };
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

            foreach (XElement fileElement in filesElement.Elements(mergeElementName))
			{
                XAttribute sourceAttribute = fileElement.Attribute(MergeXmlFilePackageFragmentInstaller.mergeContainerElementName);
                XAttribute targetAttribute = fileElement.Attribute(MergeXmlFilePackageFragmentInstaller.targetFileAttributeName);

				if (sourceAttribute == null || targetAttribute == null)
				{
					validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "MissingAttribute", fileElement));

					continue;
				}

				XmlFileMerge xmlFileMerge = new XmlFileMerge
				{
					ChangeFilePath = sourceAttribute.Value,
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
