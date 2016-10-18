using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary> 
    /// Installs a dll file. If there's already a dll with the same name, will override it only if the installed version is newer,
    /// also will add/update and assembly binding for the dll in web.config to ensure that the system will run.
    /// The specified dll files will not be uninstalled automatically to avoid potential website crash.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class DllPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<FileToCopy> _filesToCopy;

        private static readonly string LogTitle = typeof (DllPackageFragmentInstaller).Name;

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Files") > 1)
            {
                validationResult.AddFatal(Texts.FilePackageFragmentInstaller_OnlyOneFilesElement,
                    this.ConfigurationParent);
                return validationResult;
            }

            XElement filesElement = this.Configuration.SingleOrDefault(f => f.Name == "Files");

            _filesToCopy = new List<FileToCopy>();

            if (filesElement != null)
            {
                foreach (XElement fileElement in filesElement.Elements("File"))
                {
                    XAttribute sourceFilenameAttribute = fileElement.Attribute("sourceFilename");
                    XAttribute targetFilenameAttribute = fileElement.Attribute("targetFilename");

                    if (sourceFilenameAttribute == null)
                    {
                        validationResult.AddFatal(
                            Texts.FilePackageFragmentInstaller_MissingAttribute("sourceFilename"), fileElement);
                        continue;
                    }

                    if (targetFilenameAttribute == null)
                    {
                        validationResult.AddFatal(
                            Texts.FilePackageFragmentInstaller_MissingAttribute("targetFilename"), fileElement);
                        continue;
                    }

                    XAttribute allowOverwriteAttribute = fileElement.Attribute("allowOverwrite");
                    XAttribute assemblyLoadAttribute = fileElement.Attribute("assemblyLoad");
                    XAttribute onlyUpdateAttribute = fileElement.Attribute("onlyUpdate");
                    XAttribute addAssemblyBindingAttribute = fileElement.Attribute("addAssemblyBinding");


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

                    bool addAssemblyBinding = false;
                    if (!ParseBoolAttribute(addAssemblyBindingAttribute, validationResult, ref addAssemblyBinding))
                    {
                        continue;
                    }

                    string sourceFilename = sourceFilenameAttribute.Value;
                    if (!this.InstallerContext.ZipFileSystem.ContainsFile(sourceFilename))
                    {
                        validationResult.AddFatal(Texts.FilePackageFragmentInstaller_MissingFile(sourceFilename),
                            sourceFilenameAttribute);
                        continue;
                    }

                    if (loadAssembly && onlyUpdate)
                    {
                        validationResult.AddFatal(
                            Texts.FilePackageFragmentInstaller_OnlyUpdateNotAllowedWithLoadAssemlby, onlyUpdateAttribute);
                        continue;
                    }

                    string targetFilename = PathUtil.Resolve(targetFilenameAttribute.Value);
                    if (C1File.Exists(targetFilename))
                    {
                        if (!allowOverwrite && !onlyUpdate)
                        {
                            validationResult.AddFatal(Texts.FilePackageFragmentInstaller_FileExists(targetFilename),
                                targetFilenameAttribute);
                            continue;
                        }

                        if (((C1File.GetAttributes(targetFilename) & FileAttributes.ReadOnly) > 0) && !allowOverwrite)
                        {
                            validationResult.AddFatal(Texts.FilePackageFragmentInstaller_FileReadOnly(targetFilename),
                                targetFilenameAttribute);
                            continue;
                        }
                    }
                    else if (onlyUpdate)
                    {
                        Log.LogVerbose(LogTitle, "Skipping updating of the file '{0}' because it does not exist",
                            targetFilename);
                        continue; // Target file does not, so skip this
                    }

                    var fileToCopy = new FileToCopy
                    {
                        SourceFilename = sourceFilename,
                        TargetRelativeFilePath = targetFilenameAttribute.Value,
                        TargetFilePath = targetFilename,
                        Overwrite = allowOverwrite || onlyUpdate,
                        AddAssemblyBinding = addAssemblyBinding
                    };

                    _filesToCopy.Add(fileToCopy);

                    if (loadAssembly)
                    {
                        string tempFilename = Path.Combine(this.InstallerContext.TempDirectory,
                            Path.GetFileName(targetFilename));

                        this.InstallerContext.ZipFileSystem.WriteFileToDisk(sourceFilename, tempFilename);

                        PackageAssemblyHandler.AddAssembly(tempFilename);
                    }
                }
            }


            if (validationResult.Count > 0)
            {
                _filesToCopy = null;
            }

            return validationResult;
        }

        private static bool ParseBoolAttribute(XAttribute attribute,
            List<PackageFragmentValidationResult> validationResult,
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

            var asmBindingsToAdd = new List<AssemblyName>();


            var fileElements = new List<XElement>();
            foreach (FileToCopy fileToCopy in _filesToCopy)
            {
                Log.LogVerbose(LogTitle, "Installing the file '{0}' to the target filename '{1}'",
                    fileToCopy.SourceFilename, fileToCopy.TargetFilePath);

                // Extracting the dll file so version can be checked
                string tempFileName = Path.Combine(InstallerContext.TempDirectory, Path.GetRandomFileName());
                this.InstallerContext.ZipFileSystem.WriteFileToDisk(fileToCopy.SourceFilename, tempFileName);

                // Checking for dll version here:
                var sourceAssemblyName = AssemblyName.GetAssemblyName(tempFileName);
                var sourceAssemblyVersion = sourceAssemblyName.Version;
                var sourceFileVersion = GetDllFileVersion(tempFileName);
                
                string targetDirectory = Path.GetDirectoryName(fileToCopy.TargetFilePath);
                if (!Directory.Exists(targetDirectory))
                {
                    Directory.CreateDirectory(targetDirectory);
                }

                string backupFileName = null;

                bool addAssemblyBinding = fileToCopy.AddAssemblyBinding;

                if (C1File.Exists(fileToCopy.TargetFilePath) && fileToCopy.Overwrite)
                {
                    var existingAssemblyVersion = AssemblyName.GetAssemblyName(fileToCopy.TargetFilePath).Version;
                    var existingFileVersion = GetDllFileVersion(fileToCopy.TargetFilePath);

                    if (existingAssemblyVersion == sourceAssemblyVersion 
                        && existingFileVersion >= sourceFileVersion)
                    {
                        Log.LogInformation(LogTitle,
                            "Skipping installation for file '{0}' version '{1}'. An assembly with the same version already exists.",
                            fileToCopy.TargetRelativeFilePath, sourceAssemblyVersion);
                        continue;
                    }

                    if (existingAssemblyVersion > sourceAssemblyVersion)
                    {
                        Log.LogInformation(LogTitle,
                            "Skipping installation for file '{0}' version '{1}', as a file with a newer version '{2}' already exists.",
                            fileToCopy.TargetRelativeFilePath, sourceAssemblyVersion, existingAssemblyVersion);
                        continue;
                    }

                    addAssemblyBinding = existingAssemblyVersion < sourceAssemblyVersion;

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

                    Log.LogInformation(LogTitle, "Overwriting existing file '{0}' version '{2}', new version is '{1}'",
                        fileToCopy.TargetRelativeFilePath, sourceFileVersion, existingFileVersion);
                }
                
                if (addAssemblyBinding)
                {
                    asmBindingsToAdd.Add(sourceAssemblyName);
                }
                

                File.Delete(fileToCopy.TargetFilePath);
                File.Move(tempFileName, fileToCopy.TargetFilePath);

                var fileElement = new XElement("File",
                    new XAttribute("filename", fileToCopy.TargetRelativeFilePath),
                    new XAttribute("version", sourceFileVersion));

                if (backupFileName != null)
                {
                    fileElement.Add(new XAttribute("backupFile", backupFileName));
                }

                fileElements.Add(fileElement);
            }

            UpdateBindingRedirects(asmBindingsToAdd);

            yield return new XElement("Files", fileElements);
        }

        private Version GetDllFileVersion(string dllFilePath)
        {
            var fileVersionInfo = FileVersionInfo.GetVersionInfo(dllFilePath);
            return new Version(
                fileVersionInfo.FileMajorPart,
                fileVersionInfo.FileMinorPart,
                fileVersionInfo.FileBuildPart,
                fileVersionInfo.FilePrivatePart);
        }

        private void UpdateBindingRedirects(IEnumerable<AssemblyName> assemblyNames)
        {
            string webConfigPath = PathUtil.Resolve("~/web.config");

            var webConfig = XDocument.Load(webConfigPath);

            var assemblyBindingConfig = new AssemblyBindingConfiguration(webConfig);

            foreach (var assemblyName in assemblyNames)
            {
                assemblyBindingConfig.AddRedirectsForAssembly(assemblyName);
            }

            assemblyBindingConfig.SaveIfChanged(webConfigPath);
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
            public bool AddAssemblyBinding { get; set; }
            public bool Overwrite { get; set; }
        }



        private class AssemblyBindingConfiguration
        {
            private static readonly XNamespace AssemblyBindingXNamespace = "urn:schemas-microsoft-com:asm.v1";

            private readonly XDocument _document;
            private readonly XElement _assemblyBindingElement;
            private bool _changed;

            public AssemblyBindingConfiguration(XDocument configFile)
            {
                _document = configFile;

                var root = configFile.Root;
                var runtimeElement = root.Element("runtime");

                if (runtimeElement == null)
                {
                    root.Add(runtimeElement = new XElement("runtime"));
                }

                var assemblyBindingXname = AssemblyBindingXNamespace + "assemblyBinding";
                var assemblyBindingElement = runtimeElement.Element(assemblyBindingXname);

                if (assemblyBindingElement == null)
                {
                    runtimeElement.Add(assemblyBindingElement = XElement.Parse(@"<assemblyBinding xmlns=""urn:schemas-microsoft-com:asm.v1"" />"));
                }

                _assemblyBindingElement = assemblyBindingElement;
            }

            private DependantAssembly[] GetDependantAssemblies()
            {
                return
                    _assemblyBindingElement.Elements(AssemblyBindingXNamespace + "dependentAssembly")
                        .Select(e => new DependantAssembly(e))
                        .ToArray();
            }

            public void AddRedirectsForAssembly(AssemblyName assemblyName)
            {
                var version = assemblyName.Version;
                string newTargetVersionStr = assemblyName.Version.ToString();

                var existingBinding = GetDependantAssemblies().FirstOrDefault(a => a.Name == assemblyName.Name);

                if (existingBinding != null)
                {
                    var oldRedirectToStr = existingBinding.NewVersion;
                    if (oldRedirectToStr == null)
                    {
                        return;
                    }

                    var oldRedirectToVersion = new Version(existingBinding.NewVersion);
                    if (oldRedirectToVersion == version)
                    {
                        return;
                    }

                    existingBinding.OldVersion = "0.0.0.0-" + newTargetVersionStr;
                    existingBinding.NewVersion = newTargetVersionStr;

                    _changed = true;
                    return;
                }

                string publicKeyToken = GetPublicKeyToken(assemblyName);

                if (publicKeyToken != null)
                {
                    _assemblyBindingElement.Add(XElement.Parse(string.Format(@"
                    <assemblyBinding xmlns=""urn:schemas-microsoft-com:asm.v1"">
                     <dependentAssembly>
                        <assemblyIdentity name=""{0}"" publicKeyToken=""{1}"" culture=""neutral""/>
                        <!-- This binding redirect was added by Orckestra CMS package installer -->
                        <bindingRedirect oldVersion=""0.0.0.0-{2}"" newVersion=""{2}"" />
                     </dependentAssembly>
                    </assemblyBinding>", assemblyName.Name, publicKeyToken, newTargetVersionStr)).Elements().Single());

                    _changed = true;
                }
            }

            private string GetPublicKeyToken(AssemblyName assemblyName)
            {
                byte[] publicKeyTokenBytes = assemblyName.GetPublicKeyToken();

                return publicKeyTokenBytes == null || publicKeyTokenBytes.Length == 0 
                    ? "null" 
                    : string.Join("", publicKeyTokenBytes.Select(b => $"{b:x2}"));
            }

            public void SaveIfChanged(string fileName)
            {
                if (!_changed) return;

                _document.Save(fileName);
                _changed = false;
            }

            internal class DependantAssembly
            {
                private readonly XElement _assemblyIdentity;
                private readonly XElement _bindingRedirect;

                public DependantAssembly(XElement innerElement)
                {
                    XElement innerElement1 = innerElement;
                    _assemblyIdentity = innerElement1.Element(AssemblyBindingXNamespace + "assemblyIdentity");
                    _bindingRedirect = innerElement1.Element(AssemblyBindingXNamespace + "bindingRedirect");
                }

                public string Name
                {
                    get
                    {
                        return _assemblyIdentity != null ? (string)_assemblyIdentity.Attribute("name") : null;
                    }
                }

                public string NewVersion
                {
                    get
                    {
                        return _bindingRedirect != null ? (string)_bindingRedirect.Attribute("newVersion") : null;
                    }
                    set
                    {
                        _bindingRedirect.SetAttributeValue("newVersion", value);
                    }
                }

                public string OldVersion
                {
                    get
                    {
                        return _bindingRedirect != null ? (string)_bindingRedirect.Attribute("oldVersion") : null;
                    }
                    set
                    {
                        _bindingRedirect.SetAttributeValue("oldVersion", value);
                    }
                }
            }
        }
    
    }
}