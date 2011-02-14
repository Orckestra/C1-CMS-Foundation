using System.Collections.Generic;
using Composite.C1Console.Events;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class RebootingConsoleFragmentUninstaller : BasePackageFragmentUninstaller
    {
        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            return new PackageFragmentValidationResult[0];
        }



        /// <exclude />
        public override void Uninstall()
        {
            ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);
        }
    }
}
