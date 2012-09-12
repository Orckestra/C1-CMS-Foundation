using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Serialization;
using System.ComponentModel;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Application;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    [SerializerHandler(typeof(PackageManagerInstallProcess))]
    public sealed class PackageManagerInstallProcess : ISerializerHandler
    {
        private IPackageInstaller _packageInstaller = null;
        private readonly SystemLockingType _systemLockingType;
        private readonly string _zipFilename = null;
        private readonly string _packageInstallDirectory = null;
        private readonly string _packageName = null;
        private readonly Guid _packageId;
        private List<PackageFragmentValidationResult> _preInstallValidationResult = null;
        private List<PackageFragmentValidationResult> _validationResult = null;
        private List<PackageFragmentValidationResult> _installationResult = null;





        public string Serialize(object objectToSerialize)
        {
            PackageManagerInstallProcess processToSerialize = objectToSerialize as PackageManagerInstallProcess;

            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "ZipFileName", processToSerialize._zipFilename);
            StringConversionServices.SerializeKeyValuePair(sb, "PackageInstallDirectory", processToSerialize._packageInstallDirectory);
            StringConversionServices.SerializeKeyValuePair(sb, "HasBeenValidated", processToSerialize._validationResult != null);
            
            // TODO: Add validation results

            return sb.ToString();
        }



        public object Deserialize(string serializedObject)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedObject);

            string zipFilename = StringConversionServices.DeserializeValueString(dic["ZipFileName"]);
            string packageInstallDirectory = StringConversionServices.DeserializeValueString(dic["PackageInstallDirectory"]);
            bool hasBeenValidated = StringConversionServices.DeserializeValueBool(dic["HasBeenValidated"]);

            if (C1File.Exists(zipFilename))
            {
                XElement installContent;
                XmlHelper.LoadInstallXml(zipFilename, out installContent);

                PackageInformation packageInformation;
                PackageManager.ValidatePackageInformation(installContent, out packageInformation);

                string packageZipFilename = Path.Combine(packageInstallDirectory, Path.GetFileName(zipFilename));
                C1File.Copy(zipFilename, packageZipFilename, true);

                IPackageInstaller packageInstaller = new PackageInstaller(new PackageInstallerUninstallerFactory(), packageZipFilename, packageInstallDirectory, TempDirectoryFacade.CreateTempDirectory(), packageInformation);

                PackageManagerInstallProcess packageManagerInstallProcess = new PackageManagerInstallProcess(packageInstaller, packageInformation.SystemLockingType, zipFilename, packageInstallDirectory, packageInformation.Name, packageInformation.Id);
                if (hasBeenValidated)
                    packageManagerInstallProcess.Validate();

                return packageManagerInstallProcess;
            }
            else
            {
                return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult>(), null);;
            }
        }



        public PackageManagerInstallProcess()
        {
            
        }



        internal PackageManagerInstallProcess(List<PackageFragmentValidationResult> preInstallValidationResult, string zipFilename)
        {
            if (preInstallValidationResult == null) throw new ArgumentNullException("preInstallValidationResult");

            _preInstallValidationResult = preInstallValidationResult;
            _zipFilename = zipFilename;
        }



        internal PackageManagerInstallProcess(IPackageInstaller packageInstaller, SystemLockingType systemLockingType, string zipFilename, string packageInstallDirectory, string packageName, Guid packageId)
        {
            if (packageInstaller == null) throw new ArgumentNullException("packageInstaller");
            if (string.IsNullOrEmpty(packageInstallDirectory) == true) throw new ArgumentNullException("packageInstallDirectory");

            _packageInstaller = packageInstaller;
            _systemLockingType = systemLockingType;
            _zipFilename = zipFilename;
            _packageInstallDirectory = packageInstallDirectory;
            _packageName = packageName;
            _packageId = packageId;

            _preInstallValidationResult = new List<PackageFragmentValidationResult>();
        }



        /// <exclude />
        public bool CanBeUninstalled
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.CanBeUninstalled;
            }
        }


        /// <exclude />
        public bool FlushOnCompletion
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.FlushOnCompletion;
            }
        }


        /// <exclude />
        public bool ReloadConsoleOnCompletion
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.ReloadConsoleOnCompletion;
            }
        }


        /// <exclude />
        public List<PackageFragmentValidationResult> PreInstallValidationResult
        {
            get
            {
                return _preInstallValidationResult;
            }
        }



        /// <exclude />
        public List<PackageFragmentValidationResult> Validate()
        {
            if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");
            if (_validationResult != null) throw new InvalidOperationException("Validate may only be called once");

            _validationResult = _packageInstaller.Validate().ToList();

            if (_validationResult.Count > 0)
            {
                _validationResult.AddRange(FinalizeProcess());
            }

            return _validationResult;
        }



        /// <exclude />
        public List<PackageFragmentValidationResult> Install()
        {
            if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");
            if (_validationResult == null) throw new InvalidOperationException("Call validation first");
            if (_validationResult.Count > 0) throw new InvalidOperationException("Installation did not validate");
            if (_installationResult != null) throw new InvalidOperationException("Install may only be called onece");

            LoggingService.LogVerbose("PackageManager", string.Format("Installing package: {0}, Id = {1}", _packageName, _packageId));            

            PackageFragmentValidationResult result = _packageInstaller.Install(_systemLockingType);

            if (result != null)
            {
                _installationResult = new List<PackageFragmentValidationResult> { result };
            }
            else
            {
                _installationResult = new List<PackageFragmentValidationResult>();
            }

            _installationResult.AddRange(FinalizeProcess());

            return _installationResult;
        }



        /// <exclude />
        public void CancelInstallation()
        {
            if ((_zipFilename != null) && (C1File.Exists(_zipFilename))) C1File.Delete(_zipFilename);

            if (C1Directory.Exists(_packageInstallDirectory) == true) DirectoryUtils.DeleteFilesRecursively(_packageInstallDirectory);
        }



        private List<PackageFragmentValidationResult> FinalizeProcess()
        {
            try        
            {
                if ((_zipFilename != null) && (C1File.Exists(_zipFilename))) C1File.Delete(_zipFilename);

                if ((_preInstallValidationResult != null) && (_validationResult.Count > 0) && (C1Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtils.DeleteFilesRecursively(_packageInstallDirectory);
                else if ((_validationResult != null) && (_validationResult.Count > 0) && (C1Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtils.DeleteFilesRecursively(_packageInstallDirectory);
                else if ((_installationResult != null) && (_installationResult.Count > 0) && (C1Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtils.DeleteFilesRecursively(_packageInstallDirectory);
                else
                {
                    C1File.WriteAllText(Path.Combine(_packageInstallDirectory, PackageSystemSettings.InstalledFilename), "");
                }

                return new List<PackageFragmentValidationResult>();
            }
            catch (Exception ex)
            {
                return new List<PackageFragmentValidationResult> { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex) };
            }
        }
    }
}
