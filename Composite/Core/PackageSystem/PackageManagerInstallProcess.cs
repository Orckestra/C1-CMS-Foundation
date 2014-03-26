using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.Core.IO;
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



        /// <exclude />
        public string Serialize(object objectToSerialize)
        {
            var processToSerialize = objectToSerialize as PackageManagerInstallProcess;

            var sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "ZipFileName", processToSerialize._zipFilename);
            StringConversionServices.SerializeKeyValuePair(sb, "PackageInstallDirectory", processToSerialize._packageInstallDirectory);
            StringConversionServices.SerializeKeyValuePair(sb, "HasBeenValidated", processToSerialize._validationResult != null);
            
            return sb.ToString();
        }


        /// <exclude />
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

                var packageManagerInstallProcess = new PackageManagerInstallProcess(packageInstaller, packageInformation.SystemLockingType, zipFilename, packageInstallDirectory, packageInformation.Name, packageInformation.Id);
                if (hasBeenValidated)
                    packageManagerInstallProcess.Validate();

                return packageManagerInstallProcess;
            }

            return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult>(), null);;
        }


        /// <exclude />
        public PackageManagerInstallProcess()
        {
        }



        internal PackageManagerInstallProcess(List<PackageFragmentValidationResult> preInstallValidationResult, string zipFilename)
        {
            Verify.ArgumentNotNull(preInstallValidationResult, "preInstallValidationResult");

            _preInstallValidationResult = preInstallValidationResult;
            _zipFilename = zipFilename;
        }



        internal PackageManagerInstallProcess(IPackageInstaller packageInstaller, SystemLockingType systemLockingType, string zipFilename, string packageInstallDirectory, string packageName, Guid packageId)
        {
            Verify.ArgumentNotNull(packageInstaller, "packageInstaller");
            Verify.ArgumentNotNullOrEmpty(packageInstallDirectory, "packageInstallDirectory");

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
                Verify.IsNotNull(_packageInstaller, "Pre installation did not validate");

                return _packageInstaller.CanBeUninstalled;
            }
        }


        /// <exclude />
        public bool FlushOnCompletion
        {
            get
            {
                Verify.IsNotNull(_packageInstaller, "Pre installation did not validate");

                return _packageInstaller.FlushOnCompletion;
            }
        }


        /// <exclude />
        public bool ReloadConsoleOnCompletion
        {
            get
            {
                Verify.IsNotNull(_packageInstaller, "Pre installation did not validate");

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
            Verify.IsNotNull(_packageInstaller, "Pre installation did not validate");
            Verify.IsNull(_validationResult, "Validate() may only be called once");

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
            Verify.IsNotNull(_packageInstaller, "Pre installation did not validate");
            Verify.IsNotNull(_validationResult, "Call validation first");
            if (_validationResult.Count > 0) throw new InvalidOperationException("Installation did not validate");
            Verify.IsNull(_installationResult, "Install may only be called once");

            Log.LogVerbose("PackageManager", "Installing package: {0}, Id = {1}", _packageName, _packageId);

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
            if (_zipFilename != null && C1File.Exists(_zipFilename))
            {
                C1File.Delete(_zipFilename);
            }

            if (C1Directory.Exists(_packageInstallDirectory))
            {
                C1Directory.Delete(_packageInstallDirectory, true);
            }
        }



        private List<PackageFragmentValidationResult> FinalizeProcess()
        {
            try        
            {
                if (_zipFilename != null && C1File.Exists(_zipFilename))
                {
                    C1File.Delete(_zipFilename);
                }

                Func<IList<PackageFragmentValidationResult>, bool> isNotEmpty = list => list != null && list.Count > 0;

                if ((isNotEmpty(_preInstallValidationResult) || isNotEmpty(_validationResult) || isNotEmpty(_installationResult))
                    && C1Directory.Exists(_packageInstallDirectory))
                {
                    C1Directory.Delete(_packageInstallDirectory, true);
                }
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
