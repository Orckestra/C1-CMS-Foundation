using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.PackageSystem.Foundation;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageInformation
    {
        /// <exclude />
        public Guid Id { get; set; }

        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public string GroupName { get; set; }

        /// <exclude />
        public string Author { get; set; }

        /// <exclude />
        public string Website { get; set; }

        /// <exclude />
        public string Description { get; set; }

        /// <exclude />
        public string Version { get; set; }

        /// <exclude />
        public bool CanBeUninstalled { get; set; }

        /// <exclude />
        public SystemLockingType SystemLockingType { get; set; }

        /// <exclude />
        public bool FlushOnCompletion { get; set; }

        /// <exclude />
        public bool ReloadConsoleOnCompletion { get; set; }

        /// <exclude />
        public Version MaxCompositeVersionSupported { get; set; }

        /// <exclude />
        public Version MinCompositeVersionSupported { get; set; }
    }
}
