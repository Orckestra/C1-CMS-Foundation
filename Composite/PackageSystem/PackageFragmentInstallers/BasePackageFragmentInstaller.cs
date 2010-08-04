using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.ResourceSystem;


namespace Composite.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BasePackageFragmentInstaller : IPackageFragmentInstaller
	{
        public void Initialize(PackageInstallerContext packageInstallerContex, IEnumerable<XElement> configuration, XElement configurationParent)
        {
            if (packageInstallerContex == null) throw new ArgumentNullException("packageInstallerContex");
            if (configuration == null) throw new ArgumentNullException("configuration");
            if (configurationParent == null) throw new ArgumentNullException("configurationParent");

            this.InstallerContex = packageInstallerContex;
            this.Configuration = configuration;
            this.ConfigurationParent = configurationParent;
        }


        public abstract IEnumerable<PackageFragmentValidationResult> Validate();
        public abstract IEnumerable<XElement> Install();

        protected PackageInstallerContext InstallerContex { get; private set; }        
        protected IEnumerable<XElement> Configuration { get; set; }
        protected XElement ConfigurationParent { get; set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
