using System;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Serialization;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(InstalledPackageInformationSerializerHandler))]
    public sealed class InstalledPackageInformation
    {
        /// <exclude />
        public Guid Id { get; internal set; }

        /// <exclude />
        public string Name { get; internal set; }

        /// <exclude />
        public string GroupName { get; internal set; }

        /// <exclude />
        public string Version { get; internal set; }

        /// <exclude />
        public string Author { get; internal set; }

        /// <exclude />
        public string Website { get; internal set; }

        /// <exclude />
        public string Description { get; internal set; }

        /// <exclude />
        public DateTime InstallDate { get; internal set; }

        /// <exclude />
        public string InstalledBy { get; internal set; }

        /// <exclude />
        public bool IsLocalInstalled { get; internal set; }

        /// <exclude />
        public bool CanBeUninstalled { get; internal set; }

        /// <exclude />
        public bool FlushOnCompletion { get; internal set; }

        /// <exclude />
        public bool ReloadConsoleOnCompletion { get; internal set; }

        /// <exclude />
        public SystemLockingType SystemLockingType { get; internal set; }

        /// <exclude />
        public string PackageServerAddress { get; internal set; }

        /// <exclude />
        internal string PackageInstallPath { get; set; }
    }
}

