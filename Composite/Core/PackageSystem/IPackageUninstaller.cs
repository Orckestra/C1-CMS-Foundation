using System.Collections.Generic;
using Composite.Core.PackageSystem.Foundation;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IPackageUninstaller
    {
        /// <exclude />
        bool FlushOnCompletion { get; }

        /// <exclude />
        bool ReloadConsoleOnCompletion { get; }

        /// <exclude />
        IEnumerable<PackageFragmentValidationResult> Validate();

        /// <exclude />
        PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType);        
    }
}
