using System.Collections.Generic;
using System.Xml.Linq;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageFragmentUninstaller
    {
        void Initialize(PackageUninstallerContext packageUninstallerContext, IEnumerable<XElement> configuration, XElement configurationParent);
        IEnumerable<PackageFragmentValidationResult> Validate();
        void Uninstall();
        bool ValidateFirst { get; }
    }
}
