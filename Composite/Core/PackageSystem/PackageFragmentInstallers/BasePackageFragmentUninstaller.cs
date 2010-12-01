using System.Collections.Generic;
using System.Xml.Linq;
using System;
using Composite.Core.ResourceSystem;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
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
#pragma warning disable 618
            this.AddOnUninstallerContex = packageUninstallerContex;
#pragma warning restore 618
            this.UninstallerContex = packageUninstallerContex;
        }


        public abstract IEnumerable<PackageFragmentValidationResult> Validate();
        public abstract void Uninstall();

        protected IEnumerable<XElement> Configuration { get; set; }
        [Obsolete("Use PackageInformation")]
        protected PackageUninstallerContext AddOnUninstallerContex { get; private set; }
        protected PackageUninstallerContext UninstallerContex { get; private set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
