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
        bool FlushOnCompletion { get; }
        bool ReloadConsoleOnCompletion { get; }
        IEnumerable<PackageFragmentValidationResult> Validate();
        PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType);        
    }
}
