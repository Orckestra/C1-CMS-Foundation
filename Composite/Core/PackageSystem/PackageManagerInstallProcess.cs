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
using Composite.C1Console.Security;
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
        private static readonly string LogTitle = typeof(PackageManagerInstallProcess).Name;

        private readonly IPackageInstaller _packageInstaller;
        private readonly SystemLockingType _systemLockingType;
        private readonly string _zipFilename;
        private readonly string _packageInstallDirectory;
        private readonly string _packageName;
        private readonly string _packageVersion;
        private readonly Guid _packageId;
        private readonly string _originalPackageInstallDirectory;
        private readonly List<PackageFragmentValidationResult> _preInstallValidationResult;
        private List<PackageFragmentValidationResult> _validationResult;
        private List<PackageFragmentValidationResult> _installationResult;
        



        /// <exclude />
        public string Serialize(object objectToSerialize)
        {
            var processToSerialize = objectToSerialize as PackageManagerInstallProcess;

            var sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "ZipFileName", processToSerialize._zipFilename);
            StringConversionServices.SerializeKeyValuePair(sb, "PackageInstallDirectory", processToSerialize._packageInstallDirectory);
            StringConversionServices.SerializeKeyValuePair(sb, "HasBeenValidated", processToSerialize._validationResult != null);
            StringConversionServices.SerializeKeyValuePair(sb, "OriginalPackageInstallDirectory", processToSerialize._originalPackageInstallDirectory);
            
            
            return sb.ToString();
        }


        /// <exclude />
        public object Deserialize(string serializedObject)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedObject);

            string zipFilename = StringConversionServices.DeserializeValueString(dic["ZipFileName"]);
            string packageInstallDirectory = StringConversionServices.DeserializeValueString(dic["PackageInstallDirectory"]);
            bool hasBeenValidated = StringConversionServices.DeserializeValueBool(dic["HasBeenValidated"]);

            string originalPackageInstallDirectory = null;
            string serializedValue;

            if (dic.TryGetValue("OriginalPackageInstallDirectory", out serializedValue))
            {
                originalPackageInstallDirectory = StringConversionServices.DeserializeValueString(serializedValue);
            }
            
            if (C1File.Exists(zipFilename))
            {
                XElement installContent;
                XmlHelper.LoadInstallXml(zipFilename, out installContent);

                PackageInformation packageInformation;
                PackageManager.ValidatePackageInformation(installContent, out packageInformation);

                string packageZipFilename = Path.Combine(packageInstallDirectory, Path.GetFileName(zipFilename));
                C1File.Copy(zipFilename, packageZipFilename, true);

                var packageInstaller = new PackageInstaller(new PackageInstallerUninstallerFactory(), packageZipFilename, packageInstallDirectory, TempDirectoryFacade.CreateTempDirectory(), packageInformation);

                var packageManagerInstallProcess = new PackageManagerInstallProcess(
                    packageInstaller, 
                    packageInformation.SystemLockingType, 
                    zipFilename, 
                    packageInstallDirectory, 
                    packageInformation.Name, 
                    packageInformation.Version,
                    packageInformation.Id,
                    originalPackageInstallDirectory);

                if (hasBeenValidated)
                {
                    packageManagerInstallProcess.Validate();
                }

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



        internal PackageManagerInstallProcess(
            IPackageInstaller packageInstaller, 
            SystemLockingType systemLockingType, 
            string zipFilename, 
            string packageInstallDirectory, 
            string packageName,
            string packageVersion, 
            Guid packageId,
            string originalPackageInstallDirectory)
        {
            Verify.ArgumentNotNull(packageInstaller, "packageInstaller");
            Verify.ArgumentNotNullOrEmpty(packageInstallDirectory, "packageInstallDirectory");

            _packageInstaller = packageInstaller;
            _systemLockingType = systemLockingType;
            _zipFilename = zipFilename;
            _packageInstallDirectory = packageInstallDirectory;
            _packageName = packageName;
            _packageVersion = packageVersion;
            _packageId = packageId;
            _originalPackageInstallDirectory = originalPackageInstallDirectory;

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
                _validationResult.AddRange(FinalizeProcess(false));
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

            var userName = UserValidationFacade.IsLoggedIn() ? UserValidationFacade.GetUsername() : "<system>";

            Log.LogInformation(LogTitle, $"Installing package: {_packageName}, Version: {_packageVersion}, Id = {_packageId}; User name: '{userName}'");

            PackageFragmentValidationResult result = _packageInstaller.Install(_systemLockingType);

            _installationResult = new List<PackageFragmentValidationResult>();

            if (result != null)
            {
                _installationResult.Add(result);
            }

            _installationResult.AddRange(FinalizeProcess(true));

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



        private ICollection<PackageFragmentValidationResult> FinalizeProcess(bool install)
        {
            try        
            {
                if (_zipFilename != null && C1File.Exists(_zipFilename))
                {
                    C1File.Delete(_zipFilename);
                }

                Func<IList<PackageFragmentValidationResult>, bool> isNotEmpty = list => list != null && list.Count > 0;

                bool installationFailed = isNotEmpty(_preInstallValidationResult) 
                                          || isNotEmpty(_validationResult) 
                                          || isNotEmpty(_installationResult);

                if (installationFailed && C1Directory.Exists(_packageInstallDirectory))
                {
                    C1Directory.Delete(_packageInstallDirectory, true);
                }

                if(!installationFailed && install)
                {
                    Log.LogInformation(LogTitle, "Package successfully installed");

                    C1File.WriteAllText(Path.Combine(_packageInstallDirectory, PackageSystemSettings.InstalledFilename), "");

                    // Moving package files to a proper location, if an newer version of an already installed package is installed
                    if (_originalPackageInstallDirectory != null)
                    {
                        C1Directory.Delete(_originalPackageInstallDirectory, true);

                        C1Directory.Move(_packageInstallDirectory, _originalPackageInstallDirectory);
                    }
                }

                return new PackageFragmentValidationResult[0];
            }
            catch (Exception ex)
            {
                return new [] { new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex) };
            }
        }
    }
}
