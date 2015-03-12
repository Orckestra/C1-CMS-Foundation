using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Events;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary> 
    /// Reloads Composite C1 console after package installation.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("Use reloadConsoleOnCompletion=\"true\" on <mi:PackageInformation ... /> element instead.")]
    public class RebootingConsoleFragmentInstaller : BasePackageFragmentInstaller
    {
        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            return new PackageFragmentValidationResult[0];
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);

            return new XElement[0];
        }
    }
}
