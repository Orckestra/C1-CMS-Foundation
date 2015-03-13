using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
	/// <summary>
    /// Merges 2 xml files. New child elements and new attibutes are imported to the source. Conflicts are ignored (not merged).
    /// Used for applying changes to config files.
	/// </summary>
	/// <exclude />
	[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
	public class XmlFileMergePackageFragmentInstaller : BasePackageFragmentInstaller
	{

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
            Verify.IsNotNull(_xmlFileMerges, "XmlFileMergePackageFragmentInstaller has not been validated");

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
			var validationResult = new List<PackageFragmentValidationResult>();

			if (Configuration.Count(f => f.Name == XmlFileMergePackageFragmentInstaller.mergeContainerElementName) > 1)
			{
				validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "OnlyOneFilesElement"));

				return validationResult;
			}

			IEnumerable<XElement> filesElement = this.Configuration.Where(f => f.Name == XmlFileMergePackageFragmentInstaller.mergeContainerElementName);

			_xmlFileMerges = new List<XmlFileMerge>();

			foreach (XElement fileElement in filesElement.Elements(mergeElementName))
			{
			    XAttribute sourceAttribute;
			    XAttribute targetAttribute;

                if(!GetAttributeNotNull(fileElement, XmlFileMergePackageFragmentInstaller.changeDefFileAttributeName, validationResult, out sourceAttribute)
                   || !GetAttributeNotNull(fileElement, XmlFileMergePackageFragmentInstaller.targetFileAttributeName, validationResult, out targetAttribute))
				{
					continue;
				}

				var xmlFileMerge = new XmlFileMerge
				{
					ChangeFilePath = sourceAttribute.Value,
					TargetPath = targetAttribute.Value
				};


			    string filePath = PathUtil.Resolve(xmlFileMerge.TargetPath);
                if (!C1File.Exists(filePath))
				{
                    validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, "File '{0}' not found".FormatWith(filePath), fileElement));

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

        private static bool GetAttributeNotNull(XElement element, string attributeName, List<PackageFragmentValidationResult> validationSummary, out XAttribute attribute)
        {
            attribute = element.Attribute(attributeName);

            if (attribute != null) return true;

            validationSummary.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, 
                "MissingAttribute '{0}'. XPath: '{1}' ".FormatWith(attributeName, element.GetXPath())));

            return false;
        }
	}
}
