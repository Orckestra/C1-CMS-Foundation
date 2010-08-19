using System;
using Composite.PackageSystem.Foundation;
using Composite.Serialization;


namespace Composite.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(InstalledPackageInformationSerializerHandler))]
    public sealed class InstalledPackageInformation
    {
        public Guid Id { get; internal set; }
        public string Name { get; internal set; }
        public string GroupName { get; internal set; }
        public string Version { get; internal set; }
        public string Author { get; internal set; }
        public string Website { get; internal set; }
        public string Description { get; internal set; }
        public DateTime InstallDate { get; internal set; }
        public string InstalledBy { get; internal set; }
        public bool IsLocalInstalled { get; internal set; }
        public bool CanBeUninstalled { get; internal set; }
        public bool FlushOnCompletion { get; internal set; }
        public bool ReloadConsoleOnCompletion { get; internal set; }
        public SystemLockingType SystemLockingType { get; internal set; }
        public string PackageServerAddress { get; internal set; }
        internal string PackageInstallPath { get; set; }
    }
}

