using System.Collections.Generic;
using System.Xml.Linq;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageFragmentInstaller
    {
        void Initialize(PackageInstallerContext packageInstallerContext, IEnumerable<XElement> configuration, XElement configurationParent);
        IEnumerable<PackageFragmentValidationResult> Validate();

        /// <summary>
        /// 
        /// </summary>
        /// <returns>
        /// Returns uninstall information
        /// </returns>
        IEnumerable<XElement> Install();
    }
}
