using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.PackageSystem.Foundation;


namespace Composite.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageInformation
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string GroupName { get; set; }
        public string Author { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
        public bool CanBeUninstalled { get; set; }
        public SystemLockingType SystemLockingType { get; set; }
        public bool FlushOnCompletion { get; set; }
        public bool ReloadConsoleOnCompletion { get; set; }
        public Version MaxCompositeVersionSupported { get; set; }
        public Version MinCompositeVersionSupported { get; set; }
    }
}
