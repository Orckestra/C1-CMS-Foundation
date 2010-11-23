using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Events;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class RebootingConsoleFragmentInstaller : BasePackageFragmentInstaller
    {
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            return new PackageFragmentValidationResult[0];
        }



        public override IEnumerable<XElement> Install()
        {
            ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);

            return new XElement[0];
        }
    }
}
