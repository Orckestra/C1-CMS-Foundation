using System.Collections.Generic;
using System.Xml.Linq;
using System;
using Composite.ResourceSystem;


namespace Composite.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BasePackageFragmentUninstaller : IPackageFragmentUninstaller
	{
        public void Initialize(IEnumerable<XElement> configuration, PackageUninstallerContext packageUninstallerContex)
        {
            if (configuration == null) throw new ArgumentNullException("configuration");
            if (packageUninstallerContex == null) throw new ArgumentNullException("packageUninstallerContex");

            this.Configuration = configuration;
            this.AddOnUninstallerContex = packageUninstallerContex;
        }


        public abstract IEnumerable<PackageFragmentValidationResult> Validate();
        public abstract void Uninstall();

        protected IEnumerable<XElement> Configuration { get; set; }
        protected PackageUninstallerContext AddOnUninstallerContex { get; private set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
