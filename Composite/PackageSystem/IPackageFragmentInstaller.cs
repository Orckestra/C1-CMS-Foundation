using System.Collections.Generic;
using System.Xml.Linq;


namespace Composite.PackageSystem
{
    internal interface IPackageFragmentInstaller
    {
        void Initialize(PackageInstallerContext packageInstallerContex, IEnumerable<XElement> configuration, XElement configurationParent);
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
