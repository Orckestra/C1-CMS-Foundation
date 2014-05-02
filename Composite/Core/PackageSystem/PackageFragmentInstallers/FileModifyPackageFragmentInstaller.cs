using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>Package installer for appending content to text files.</summary>
    /// <exclude />
    /// <example>
    ///&lt;mi:Add installerType=&quot;Composite.Core.PackageSystem.PackageFragmentInstallers.FileModifyPackageFragmentInstaller, Composite&quot; 
	///          uninstallerType=&quot;Composite.Core.PackageSystem.PackageFragmentInstallers.FileModifyPackageFragmentUninstaller, Composite&quot;&gt;
	/// &lt;AppendText path=&quot;~/sdfdsfds.css&quot; whenNotExist=&quot;create&quot;&gt;  &lt;!-- whenNotExist=&quot;fail,create,ignore&quot; --&gt;
	///     Line 1
	///     Line 2 
	///     Line 3
	///     &lt;/AppendText&gt;
    ///&lt;/mi:Add&gt;
    /// </example>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class FileModifyPackageFragmentInstaller : BasePackageFragmentInstaller
	{
        private enum ActionOnMissingFile
        {
            Fail = 0,
            Create = 1,
            Ignore = 2
        }

        internal static readonly string AppendText_ElementName = "AppendText";

        internal static readonly string TargetXml_AttributeName = "path";
        internal static readonly string WhenNotExist_AttributeName = "whenNotExist";

        private List<ContentToAdd> _contentToAdd;

        /// <exclude/>
		public override IEnumerable<PackageFragmentValidationResult> Validate()
		{
			var validationResult = new List<PackageFragmentValidationResult>();

            _contentToAdd = new List<ContentToAdd>();

            foreach (var element in this.Configuration)
            {
                if (element.Name != AppendText_ElementName)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_IncorrectElement(element.Name.LocalName, AppendText_ElementName), element);
                    continue;
                }

                var pathAttr = element.Attribute(TargetXml_AttributeName);
                if (pathAttr == null)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute(TargetXml_AttributeName), element);
                    continue;
                }

                string path = (string)pathAttr;

                var actionOnMissingFile = ActionOnMissingFile.Fail;

                var whenNotExistsAttr = element.Attribute(WhenNotExist_AttributeName);
                if (whenNotExistsAttr != null)
                {
                    actionOnMissingFile = (ActionOnMissingFile) Enum.Parse(typeof (ActionOnMissingFile), whenNotExistsAttr.Value, true);
                }

                string filePath = PathUtil.Resolve(path);
                if (!C1File.Exists(filePath))
                {
                    if (actionOnMissingFile == ActionOnMissingFile.Fail)
                    {
                        validationResult.AddFatal(Texts.FileModifyPackageFragmentInstaller_FileDoesNotExist(filePath), pathAttr);
                        continue;
                    }

                    if (actionOnMissingFile == ActionOnMissingFile.Ignore)
                    {
                        continue;
                    }
                }

                _contentToAdd.Add(new ContentToAdd
                {
                    Path = filePath,
                    Content = element.Value
                });
            }

           
            if (validationResult.Any())
            {
                _contentToAdd = null;
            }
            
			return validationResult;
		}

        /// <exclude/>
		public override IEnumerable<XElement> Install()
		{
            Verify.IsNotNull(_contentToAdd, "FileModifyPackageFragmentInstaller has not been validated");

            foreach (ContentToAdd content in _contentToAdd)
            {
                if (C1File.Exists(content.Path))
                {
                    using (C1StreamWriter sw = C1File.AppendText(content.Path))
                    {
                        sw.Write(content.Content);
                        sw.Close();
                    }
                }
                else
                {
                    C1File.WriteAllText(content.Path, content.Content);
                }
            }
			return new[] {  this.Configuration.FirstOrDefault() };
		}

        internal sealed class ContentToAdd
		{
            public string Path { get; set; }
			public string Content { get; set; }
		}
	}
}
