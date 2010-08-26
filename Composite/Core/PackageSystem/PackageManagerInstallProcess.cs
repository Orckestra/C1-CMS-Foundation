using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Serialization;
using Composite.Core.IO;
using Composite.Core.Logging;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(PackageManagerInstallProcessSerializerHandler))]
    public sealed class PackageManagerInstallProcess
    {
        private IPackageInstaller _packageInstaller = null;
        private SystemLockingType _systemLockingType;
        private string _zipFilename = null;
        private string _packageInstallDirectory = null;
        private string _packageName = null;
        private Guid _packageId;
        private List<PackageFragmentValidationResult> _preInstallValidationResult = null;
        private List<PackageFragmentValidationResult> _validationResult = null;
        private List<PackageFragmentValidationResult> _installationResult = null;


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



        public bool CanBeUninstalled
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.CanBeUninstalled;
            }
        }


        public bool FlushOnCompletion
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.FlushOnCompletion;
            }
        }


        public bool ReloadConsoleOnCompletion
        {
            get
            {
                if (_packageInstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageInstaller.ReloadConsoleOnCompletion;
            }
        }


        public List<PackageFragmentValidationResult> PreInstallValidationResult
        {
            get
            {
                return _preInstallValidationResult;
            }
        }



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



        public void CancelInstallation()
        {
            if ((_zipFilename != null) && (File.Exists(_zipFilename))) File.Delete(_zipFilename);

            if (Directory.Exists(_packageInstallDirectory) == true) DirectoryUtil.DeleteFilesRecursively(_packageInstallDirectory);
        }



        private List<PackageFragmentValidationResult> FinalizeProcess()
        {
            try        
            {
                if ((_zipFilename != null) && (File.Exists(_zipFilename))) File.Delete(_zipFilename);

                if ((_preInstallValidationResult != null) && (_validationResult.Count > 0) && (Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtil.DeleteFilesRecursively(_packageInstallDirectory);
                else if ((_validationResult != null) && (_validationResult.Count > 0) && (Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtil.DeleteFilesRecursively(_packageInstallDirectory);
                else if ((_installationResult != null) && (_installationResult.Count > 0) && (Directory.Exists(_packageInstallDirectory) == true)) DirectoryUtil.DeleteFilesRecursively(_packageInstallDirectory);
                else
                {
                    File.WriteAllText(Path.Combine(_packageInstallDirectory, PackageSystemSettings.InstalledFilename), "");
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
