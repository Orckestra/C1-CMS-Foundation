using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Core.ResourceSystem;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BasePackageFragmentInstaller : IPackageFragmentInstaller
	{
        /// <exclude />
        public void Initialize(PackageInstallerContext packageInstallerContext, IEnumerable<XElement> configuration, XElement configurationParent)
        {
            Verify.ArgumentNotNull(packageInstallerContext, "packageInstallerContext");
            Verify.ArgumentNotNull(configuration, "configuration");
            Verify.ArgumentNotNull(configurationParent, "configurationParent");

            this.InstallerContext = packageInstallerContext;
            this.Configuration = configuration;
            this.ConfigurationParent = configurationParent;
        }


        /// <exclude />
        public abstract IEnumerable<PackageFragmentValidationResult> Validate();

        /// <exclude />
        public abstract IEnumerable<XElement> Install();

        /// <exclude />
        protected PackageInstallerContext InstallerContext { get; private set; }

        /// <exclude />
        protected IEnumerable<XElement> Configuration { get; set; }

        /// <exclude />
        protected XElement ConfigurationParent { get; set; }


        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
