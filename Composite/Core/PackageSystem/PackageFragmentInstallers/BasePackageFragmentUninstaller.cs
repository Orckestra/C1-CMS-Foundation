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
        public void Initialize(PackageUninstallerContext packageUninstallerContext, IEnumerable<XElement> configuration, XElement configurationParent)
        {
            Verify.ArgumentNotNull(packageUninstallerContext, "packageUninstallerContext");
            Verify.ArgumentNotNull(configuration, "configuration");
            Verify.ArgumentNotNull(configurationParent, "configurationParent");
            

            this.UninstallerContext = packageUninstallerContext;
            this.Configuration = configuration;
            this.ConfigurationParent = configurationParent;
        }


        /// <exclude />
        public abstract IEnumerable<PackageFragmentValidationResult> Validate();

        /// <exclude />
        public abstract void Uninstall();

        /// <exclude />
        protected IEnumerable<XElement> Configuration { get; set; }

        /// <exclude />
        protected XElement ConfigurationParent { get; set; }

        /// <exclude />
        public virtual bool ValidateFirst { get { return false; } }

        /// <exclude />
        protected PackageUninstallerContext UninstallerContext { get; private set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
