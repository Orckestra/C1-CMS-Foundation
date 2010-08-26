using System.Collections.Generic;
using Composite.Core.PackageSystem.Foundation;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageUninstaller
    {
        bool FlushOnCompletion { get; }
        bool ReloadConsoleOnCompletion { get; }
        IEnumerable<PackageFragmentValidationResult> Validate();
        PackageFragmentValidationResult Uninstall(SystemLockingType systemLockingType);        
    }
}
