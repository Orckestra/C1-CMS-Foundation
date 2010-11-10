using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.IO;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Serialization;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(PackageManagerUninstallProcessSerializerHandler))]
    public sealed class PackageManagerUninstallProcess
    {
        private IPackageUninstaller _packageUninstaller = null;
        private string _packageInstallDirectory = null;
        private SystemLockingType _systemLockingType;
        private List<PackageFragmentValidationResult> _preUninstallValidationResult = null;
        private List<PackageFragmentValidationResult> _validationResult = null;
        private List<PackageFragmentValidationResult> _uninstallationResult = null;


        internal PackageManagerUninstallProcess(List<PackageFragmentValidationResult> preUninstallValidationResult)
        {
            if (preUninstallValidationResult == null) throw new ArgumentNullException("preUninstallValidationResult");

            _preUninstallValidationResult = preUninstallValidationResult;
        }


        internal PackageManagerUninstallProcess(IPackageUninstaller packageUninstaller, string packageInstallDirectory, SystemLockingType systemLockingType)
        {
            if (packageUninstaller == null) throw new ArgumentNullException("packageUninstaller");
            if (string.IsNullOrEmpty(packageInstallDirectory) == true) throw new ArgumentNullException("packageInstallDirectory");

            _packageUninstaller = packageUninstaller;
            _packageInstallDirectory = packageInstallDirectory;
            _systemLockingType = systemLockingType;

            _preUninstallValidationResult = new List<PackageFragmentValidationResult>();
        }



        public bool FlushOnCompletion
        {
            get
            {
                if (_packageUninstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageUninstaller.FlushOnCompletion;
            }
        }



        public bool ReloadConsoleOnCompletion
        {
            get
            {
                if (_packageUninstaller == null) throw new InvalidOperationException("Pre installation did not validate");

                return _packageUninstaller.ReloadConsoleOnCompletion;
            }
        }



        public List<PackageFragmentValidationResult> PreUninstallValidationResult
        {
            get
            {
                return _preUninstallValidationResult;
            }
        }



        public List<PackageFragmentValidationResult> Validate()
        {
            if (_packageUninstaller == null) throw new InvalidOperationException("Pre uninstallation did not validate");
            if (_validationResult != null) throw new InvalidOperationException("Validate may only be called once");

            _validationResult = _packageUninstaller.Validate().ToList();

            return _validationResult;
        }



        public List<PackageFragmentValidationResult> Uninstall()
        {
            if (_packageUninstaller == null) throw new InvalidOperationException("Pre installation did not validate");
            if (_validationResult == null) throw new InvalidOperationException("Call validation first");
            if (_validationResult.Count > 0) throw new InvalidOperationException("Installation did not validate");
            if (_uninstallationResult != null) throw new InvalidOperationException("Install may only be called onece");

            PackageFragmentValidationResult result = _packageUninstaller.Uninstall(_systemLockingType);

            if (result != null)
            {
                _uninstallationResult = new List<PackageFragmentValidationResult> { result };
            }
            else
            {
                _uninstallationResult = new List<PackageFragmentValidationResult>();

                _uninstallationResult.AddRange(FinalizeProcess());
            }

            return _uninstallationResult;
        }



        private List<PackageFragmentValidationResult> FinalizeProcess()
        {
            try
            {
                if (((_preUninstallValidationResult == null) || (_preUninstallValidationResult.Count == 0)) &&
                    ((_validationResult == null) || (_validationResult.Count == 0)) &&
                    ((_uninstallationResult == null) || (_uninstallationResult.Count == 0)) &&
                    (_packageInstallDirectory != null))
                {
                    if (C1Directory.Exists(_packageInstallDirectory) == true)
                    {
                        DirectoryUtil.DeleteFilesRecursively(_packageInstallDirectory);
                    }
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
