using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using System.Reflection;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class FilePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<FileToCopy> _filesToCopy;
        private List<string> _directoriesToDelete;

        private static readonly string LogTitle = typeof(FilePackageFragmentInstaller).Name;

        private static readonly string[] DllsNotToLoad = 
        {
            "System.", "Microsoft.",  "Antlr3.", "WebGrease", "Composite.Web.BundlingAndMinification"
        };

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Files") > 1)
            {
                validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyOneFilesElement, this.ConfigurationParent);
                return validationResult;
            }

            if (this.Configuration.Count(f => f.Name == "Directories") > 1)
            {
                validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyOneDirectoriesElement, this.ConfigurationParent);
                return validationResult;
            }

            XElement filesElement = this.Configuration.SingleOrDefault(f => f.Name == "Files");
            XElement directoriesElement = this.Configuration.SingleOrDefault(f => f.Name == "Directories");

            _filesToCopy = new List<FileToCopy>();
            _directoriesToDelete = new List<string>();

            if (filesElement != null)
            {
                foreach (XElement fileElement in filesElement.Elements("File"))
                {
                    XAttribute sourceFilenameAttribute = fileElement.Attribute("sourceFilename");
                    XAttribute targetFilenameAttribute = fileElement.Attribute("targetFilename");

                    if (sourceFilenameAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("sourceFilename"), fileElement); 
                        continue;
                    }

                    if (targetFilenameAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("targetFilename"), fileElement); 
                        continue;
                    }

                    XAttribute allowOverwriteAttribute = fileElement.Attribute("allowOverwrite");
                    XAttribute assemblyLoadAttribute = fileElement.Attribute("assemblyLoad");
                    XAttribute deleteTargetDirectoryAttribute = fileElement.Attribute("deleteTargetDirectory");
                    XAttribute onlyUpdateAttribute = fileElement.Attribute("onlyUpdate");
                    XAttribute onlyAddAttribute = fileElement.Attribute("onlyAdd");

                    if (deleteTargetDirectoryAttribute != null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_DeleteTargetDirectoryNotAllowed, fileElement);
                        continue;
                    }

                    bool allowOverwrite = false;
                    if (!ParseBoolAttribute(allowOverwriteAttribute, validationResult, ref allowOverwrite))
                    {
                        continue;
                    }

                    bool loadAssembly = false;
                    if (!ParseBoolAttribute(assemblyLoadAttribute, validationResult, ref loadAssembly))
                    {
                        continue;
                    }

                    bool onlyUpdate = false;
                    if (!ParseBoolAttribute(onlyUpdateAttribute, validationResult, ref onlyUpdate))
                    {
                        continue;
                    }

                    bool onlyAdd = false;
                    if (!ParseBoolAttribute(onlyAddAttribute, validationResult, ref onlyAdd))
                    {
                        continue;
                    }

                    string sourceFilename = sourceFilenameAttribute.Value;
                    if (!this.InstallerContext.ZipFileSystem.ContainsFile(sourceFilename))
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingFile(sourceFilename), sourceFilenameAttribute);
                        continue;
                    }

                    if (loadAssembly && onlyUpdate)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyUpdateNotAllowedWithLoadAssemlby, onlyUpdateAttribute);
                        continue;
                    }

                    if (onlyAdd && onlyUpdate)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyUpdateAndOnlyAddNotAllowed, onlyUpdateAttribute);
                        continue;
                    }

                    if (onlyAdd && allowOverwrite)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyAddAndAllowOverwriteNotAllowed, onlyAddAttribute);
                        continue;
                    }

                    string targetFilename = PathUtil.Resolve(targetFilenameAttribute.Value);
                    if (C1File.Exists(targetFilename))
                    {
                        if (onlyAdd)
                        {
                            Log.LogVerbose(LogTitle, "Skipping adding of the file '{0}' because it already exist and is marked 'onlyAdd'", targetFilename);
                            continue; // Target file does not, so skip this
                        }

                        if (!allowOverwrite && !onlyUpdate)
                        {
                            validationResult.AddFatal(Texts.FilePackageFragmentInstaller_FileExists(targetFilename), targetFilenameAttribute);
                            continue;
                        }

                        if (((C1File.GetAttributes(targetFilename) & FileAttributes.ReadOnly) > 0) && !allowOverwrite)
                        {
                            validationResult.AddFatal(Texts.FilePackageFragmentInstaller_FileReadOnly(targetFilename), targetFilenameAttribute);
                            continue;
                        }
                    }
                    else if (onlyUpdate)
                    {
                        Log.LogVerbose(LogTitle, "Skipping updating of the file '{0}' because it does not exist", targetFilename);
                        continue; // Target file does not, so skip this
                    }

                    var fileToCopy = new FileToCopy
                    {
                        SourceFilename = sourceFilename,
                        TargetRelativeFilePath = targetFilenameAttribute.Value,
                        TargetFilePath = targetFilename,
                        Overwrite = allowOverwrite || onlyUpdate
                    };

                    _filesToCopy.Add(fileToCopy);

                    if (loadAssembly)
                    {
                        string tempFilename = Path.Combine(this.InstallerContext.TempDirectory, Path.GetFileName(targetFilename));

                        this.InstallerContext.ZipFileSystem.WriteFileToDisk(sourceFilename, tempFilename);

                        PackageAssemblyHandler.AddAssembly(tempFilename);
                    }
                }
            }

            if (directoriesElement != null)
            {
                foreach (XElement directoryElement in directoriesElement.Elements("Directory"))
                {
                    XAttribute sourceDirectoryAttribute = directoryElement.Attribute("sourceDirectory");
                    XAttribute targetDirectoryAttribute = directoryElement.Attribute("targetDirectory");

                    if (sourceDirectoryAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("sourceDirectory"), directoryElement); 
                        continue;
                    }

                    if (targetDirectoryAttribute == null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingAttribute("targetDirectory"), directoryElement); 
                        continue;
                    }


                    XAttribute allowOverwriteAttribute = directoryElement.Attribute("allowOverwrite");
                    XAttribute assemblyLoadAttribute = directoryElement.Attribute("assemblyLoad");
                    XAttribute deleteTargetDirectoryAttribute = directoryElement.Attribute("deleteTargetDirectory");
                    XAttribute onlyUpdateAttribute = directoryElement.Attribute("onlyUpdate");

                    if (assemblyLoadAttribute != null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_AssemblyLoadNotAllowed, directoryElement);
                        continue;
                    }

                    if (onlyUpdateAttribute != null)
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyUpdateNotAllowed, directoryElement);
                        continue;
                    }


                    bool allowOverwrite = false;
                    if (!ParseBoolAttribute(allowOverwriteAttribute, validationResult, ref allowOverwrite))
                    {
                        continue;
                    }

                    bool deleteTargetDirectory = false;
                    if (!ParseBoolAttribute(deleteTargetDirectoryAttribute, validationResult, ref deleteTargetDirectory))
                    {
                        continue;
                    }

                    string sourceDirectory = sourceDirectoryAttribute.Value;
                    if (!this.InstallerContext.ZipFileSystem.ContainsDirectory(sourceDirectory))
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingDirectory(sourceDirectory), sourceDirectoryAttribute);
                        continue;
                    }

                    string targetDirectory = PathUtil.Resolve(targetDirectoryAttribute.Value);

                    if (deleteTargetDirectory)
                    {
                        if (C1Directory.Exists(targetDirectory))
                        {
                            _directoriesToDelete.Add(targetDirectory);
                        }
                    }

                    foreach (string sourceFilename in this.InstallerContext.ZipFileSystem.GetFilenames(sourceDirectory))
                    {
                        string resolvedSourceFilename = sourceFilename.Remove(0, sourceDirectory.Length);
                        if (resolvedSourceFilename.StartsWith("/"))
                        {
                            resolvedSourceFilename = resolvedSourceFilename.Remove(0, 1);
                        }

                        string targetFilename = Path.Combine(targetDirectory, resolvedSourceFilename);

                        if (C1File.Exists(targetFilename) && !deleteTargetDirectory && !allowOverwrite)
                        {
                            validationResult.AddFatal(Texts.FilePackageFragmentInstaller_FileExists(targetFilename), targetDirectoryAttribute);
                            continue;
                        }

                        var fileToCopy = new FileToCopy
                        {
                            SourceFilename = sourceFilename,
                            TargetRelativeFilePath = Path.Combine(targetDirectoryAttribute.Value, resolvedSourceFilename),
                            TargetFilePath = targetFilename,
                            Overwrite = allowOverwrite
                        };
                        _filesToCopy.Add(fileToCopy);
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _filesToCopy = null;
                _directoriesToDelete = null;
            }

            return validationResult;
        }

        private static bool ParseBoolAttribute(XAttribute attribute, List<PackageFragmentValidationResult> validationResult,
                                               ref bool resultValue)
        {
            if (attribute == null) return true;
            
            if (!attribute.TryGetBoolValue(out resultValue))
            {
                validationResult.AddFatal(Texts.FilePackageFragmentInstaller_WrongAttributeBoolFormat, attribute);
                return false;
            }
            
            return true;
        }

        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            Verify.IsNotNull(_filesToCopy, "{0} has not been validated", this.GetType().Name);

            foreach (string directoryToDelete in _directoriesToDelete)
            {
                Directory.Delete(directoryToDelete, true);
            }

            var fileElements = new List<XElement>();
            foreach (FileToCopy fileToCopy in _filesToCopy)
            {
                Log.LogVerbose(LogTitle, "Installing the file '{0}' to the target filename '{1}'", fileToCopy.SourceFilename, fileToCopy.TargetFilePath);

                string targetDirectory = Path.GetDirectoryName(fileToCopy.TargetFilePath);
                if (!Directory.Exists(targetDirectory))
                {
                    Directory.CreateDirectory(targetDirectory);
                }

                string backupFileName = null;

                if (C1File.Exists(fileToCopy.TargetFilePath) && fileToCopy.Overwrite)
                {
                    if ((C1File.GetAttributes(fileToCopy.TargetFilePath) & FileAttributes.ReadOnly) > 0)
                    {
                        FileUtils.RemoveReadOnly(fileToCopy.TargetFilePath);
                    }

                    if (InstallerContext.PackageInformation.CanBeUninstalled)
                    {
                        backupFileName = GetBackupFileName(fileToCopy.TargetFilePath);

                        string backupFilesFolder = this.InstallerContext.PackageDirectory + "\\FileBackup";

                        C1Directory.CreateDirectory(backupFilesFolder);

                        C1File.Copy(fileToCopy.TargetFilePath, backupFilesFolder + "\\" + backupFileName);
                    }
                }

                this.InstallerContext.ZipFileSystem.WriteFileToDisk(fileToCopy.SourceFilename, fileToCopy.TargetFilePath);

                // Searching for static IData interfaces
                string targetFilePath = fileToCopy.TargetFilePath;

                if (targetFilePath.StartsWith(Path.Combine(PathUtil.BaseDirectory, "Bin"), StringComparison.InvariantCultureIgnoreCase)
                    && targetFilePath.EndsWith(".dll", StringComparison.InvariantCultureIgnoreCase))
                {
                    string fileName = Path.GetFileName(targetFilePath);

                    if (!DllsNotToLoad.Any(fileName.StartsWith))
                    {
                        Assembly assembly;

                        try
                        {
                            assembly = Assembly.LoadFrom(targetFilePath);
                        }
                        catch (Exception)
                        {
                            continue;
                        }

                        DataTypeTypesManager.AddNewAssembly(assembly, false);
                    }
                    
                }

                var fileElement = new XElement("File", new XAttribute("filename", fileToCopy.TargetRelativeFilePath));

                if (backupFileName != null)
                {
                    fileElement.Add(new XAttribute("backupFile", backupFileName));
                }

                fileElements.Add(fileElement);
            }

            yield return new XElement("Files", fileElements);
        }

        private string GetBackupFileName(string targetFilePath)
        {
            string fileName = Path.GetFileName(targetFilePath);
            string directory = targetFilePath.Substring(0, targetFilePath.Length - fileName.Length);


            return directory.GetHashCode() + "_" + fileName;
        }


        private sealed class FileToCopy
        {
            public string SourceFilename { get; set; }
            public string TargetRelativeFilePath { get; set; }
            public string TargetFilePath { get; set; }
            public bool Overwrite { get; set; }
        }
    }
}
