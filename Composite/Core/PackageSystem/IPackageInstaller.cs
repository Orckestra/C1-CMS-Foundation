using System.Collections.Generic;
using Composite.Core.PackageSystem.Foundation;


namespace Composite.Core.PackageSystem
{
	internal interface IPackageInstaller
	{
        bool CanBeUninstalled { get; }
        bool FlushOnCompletion { get; }
        bool ReloadConsoleOnCompletion { get; }
        IEnumerable<PackageFragmentValidationResult> Validate();
        PackageFragmentValidationResult Install(SystemLockingType systemLockingType);        
	}
}
