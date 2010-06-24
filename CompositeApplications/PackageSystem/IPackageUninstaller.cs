using System.Collections.Generic;
using Composite.PackageSystem.Foundation;


namespace Composite.PackageSystem
{
    internal interface IPackageUninstaller
    {
        bool FlushOnCompletion { get; }
        bool ReloadConsoleOnCompletion { get; }
        IEnumerable<PackageFragmentValidationResult> Validate();
        PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType);        
    }
}
