using System.Collections.Generic;
using System.Xml.Linq;


namespace Composite.PackageSystem
{
    public interface IPackageFragmentUninstaller
    {
        void Initialize(IEnumerable<XElement> configuration, PackageUninstallerContex packageUninstallerContex);
        IEnumerable<PackageFragmentValidationResult> Validate();
        void Uninstall();
    }
}
