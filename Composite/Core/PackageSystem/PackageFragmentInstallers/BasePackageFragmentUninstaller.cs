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
        /// <exclude />
        public void Initialize(IEnumerable<XElement> configuration, PackageUninstallerContext packageUninstallerContext)
        {
            Verify.ArgumentNotNull(configuration, "configuration");
            Verify.ArgumentNotNull(packageUninstallerContext, "packageUninstallerContext");

            this.Configuration = configuration;
            this.UninstallerContext = packageUninstallerContext;
        }


        /// <exclude />
        public abstract IEnumerable<PackageFragmentValidationResult> Validate();

        /// <exclude />
        public abstract void Uninstall();

        /// <exclude />
        protected IEnumerable<XElement> Configuration { get; set; }

        /// <exclude />
        protected PackageUninstallerContext UninstallerContext { get; private set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
