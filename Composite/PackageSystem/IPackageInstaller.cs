using System.Collections.Generic;
using Composite.PackageSystem.Foundation;


namespace Composite.PackageSystem
{
	public interface IPackageInstaller
	{
        bool CanBeUninstalled { get; }
        bool FlushOnCompletion { get; }
        bool ReloadConsoleOnCompletion { get; }
        IEnumerable<PackageFragmentValidationResult> Validate();
        PackageFragmentValidationResult Install(SystemLockingType systemLockingType);        
	}
}
