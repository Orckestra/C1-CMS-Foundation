using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DllPackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private string LogTitle { get { return this.GetType().Name;  }}

        private List<string> _filesToDelete;
        private List<FileToCopy> _filesToCopy;


        private class FileToCopy
        {
            public string BackupFilePath;
            public string FilePath;
            public string RelativeFilePath;
        }

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Files") > 1)
            {
                validationResult.AddFatal(Texts.FilePackageFragmentUninstaller_OnlyOneFilesElement, ConfigurationParent);
                return validationResult;
            }

            XElement filesElement = this.Configuration.SingleOrDefault(f => f.Name == "Files");
            

            _filesToDelete = new List<string>();
            _filesToCopy = new List<FileToCopy>();

            if (filesElement != null)
            {
                foreach (XElement fileElement in filesElement.Elements("File").Reverse())
                {
                    XAttribute filenameAttribute = fileElement.Attribute("filename");
                    if (filenameAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("filename"), fileElement);
                        continue;
                    }

                    string relativeFilePath = filenameAttribute.Value;

                    string filePath = PathUtil.Resolve(relativeFilePath);

                    string backupFile = (string) fileElement.Attribute("backupFile");

                    if (backupFile != null)
                    {
                        var backupFilePath = Path.Combine(UninstallerContext.PackageDirectory, "FileBackup", backupFile);
                        if (!C1File.Exists(backupFilePath))
                        {
                            validationResult.AddFatal("Missing backup file '{0}'".FormatWith(backupFilePath), fileElement);
                            continue;
                        }

                        _filesToCopy.Add(new FileToCopy
                        {
                            BackupFilePath = backupFilePath,
                            FilePath = filePath,
                            RelativeFilePath = relativeFilePath
                        });
                    }
                    else
                    {
                        _filesToDelete.Add(filePath);
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _filesToDelete = null;
                _filesToCopy = null;
            }

            return validationResult;
        }


        /// <exclude />
        public override void Uninstall()
        {
            Verify.IsNotNull(_filesToDelete as object ?? _filesToCopy, "{0} has not been validated", this.GetType().Name);

            foreach (string filename in _filesToDelete)
            {
                Log.LogInformation(LogTitle, "Not uninstalling file '{0}' to avoid potential compilation errors", filename);

                // Log.LogVerbose(LogTitle, "Uninstalling the file '{0}'", filename);

                // FileUtils.Delete(filename);
            }

            foreach (var fileToCopy in _filesToCopy)
            {
                Log.LogInformation(LogTitle, "Not restoring the original version of '{0}' file to avoid potential compilation errors", fileToCopy.RelativeFilePath);

                // Log.LogVerbose(LogTitle, "Restoring file from a backup copy'{0}'", fileToCopy.FilePath);

                //if ((C1File.GetAttributes(targetFile) & FileAttributes.ReadOnly) > 0)
                //{
                //    FileUtils.RemoveReadOnly(targetFile);
                //}

                //C1File.Copy(fileToCopy.BackupFilePath, targetFile, true);
            }
        }
    }
}
