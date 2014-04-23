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
        private static readonly string LogTitle = typeof (PackageManagerUninstallProcess).Name;

        private readonly IPackageUninstaller _packageUninstaller;
        private readonly string _packageInstallDirectory;
        private readonly SystemLockingType _systemLockingType;
        private readonly List<PackageFragmentValidationResult> _preUninstallValidationResult;
        private List<PackageFragmentValidationResult> _validationResult;
        private List<PackageFragmentValidationResult> _uninstallationResult;


        internal PackageManagerUninstallProcess(List<PackageFragmentValidationResult> preUninstallValidationResult)
        {
            if (preUninstallValidationResult == null) throw new ArgumentNullException("preUninstallValidationResult");

            _preUninstallValidationResult = preUninstallValidationResult;
        }


        internal PackageManagerUninstallProcess(IPackageUninstaller packageUninstaller, string packageInstallDirectory, SystemLockingType systemLockingType)
        {
            if (packageUninstaller == null) throw new ArgumentNullException("packageUninstaller");
            if (string.IsNullOrEmpty(packageInstallDirectory)) throw new ArgumentNullException("packageInstallDirectory");

            _packageUninstaller = packageUninstaller;
            _packageInstallDirectory = packageInstallDirectory;
            _systemLockingType = systemLockingType;

            _preUninstallValidationResult = new List<PackageFragmentValidationResult>();
        }



        /// <exclude />
        public bool FlushOnCompletion
        {
            get
            {
                Verify.IsNotNull(_packageUninstaller, "Pre un-installation did not validate");

                return _packageUninstaller.FlushOnCompletion;
            }
        }



        /// <exclude />
        public bool ReloadConsoleOnCompletion
        {
            get
            {
                Verify.IsNotNull(_packageUninstaller, "Pre un-installation did not validate");

                return _packageUninstaller.ReloadConsoleOnCompletion;
            }
        }



        /// <exclude />
        public List<PackageFragmentValidationResult> PreUninstallValidationResult
        {
            get
            {
                return _preUninstallValidationResult;
            }
        }



        /// <exclude />
        public List<PackageFragmentValidationResult> Validate()
        {
            Verify.IsNotNull(_packageUninstaller, "Pre un-installation did not validate");
            if (_validationResult != null) throw new InvalidOperationException("Validate may only be called once");

            _validationResult = _packageUninstaller.Validate().ToList();

            return _validationResult;
        }



        /// <exclude />
        public List<PackageFragmentValidationResult> Uninstall()
        {
            Verify.IsNotNull(_packageUninstaller, "Pre un-installation did not validate");
            if (_validationResult == null) throw new InvalidOperationException("Call validation first");
            if (_validationResult.Count > 0) throw new InvalidOperationException("Installation did not validate");
            if (_uninstallationResult != null) throw new InvalidOperationException("Install may only be called onece");

            PackageFragmentValidationResult result = _packageUninstaller.Uninstall(_systemLockingType);

            _uninstallationResult = new List<PackageFragmentValidationResult>();

            if (result != null)
            {
                _uninstallationResult.Add( result );
            }
            else
            {
                _uninstallationResult.AddRange( FinalizeProcess() );
            }

            return _uninstallationResult;
        }



        private IEnumerable<PackageFragmentValidationResult> FinalizeProcess()
        {
            try
            {
                if (_packageInstallDirectory != null
                    && (_preUninstallValidationResult == null || _preUninstallValidationResult.Count == 0) 
                    && (_validationResult == null || _validationResult.Count == 0) 
                    && (_uninstallationResult == null || _uninstallationResult.Count == 0))
                {
                    if (C1Directory.Exists(_packageInstallDirectory))
                    {
                        C1Directory.Delete(_packageInstallDirectory, true);
                    }

                    Log.LogInformation(LogTitle, "Package successfully uninstalled");
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
