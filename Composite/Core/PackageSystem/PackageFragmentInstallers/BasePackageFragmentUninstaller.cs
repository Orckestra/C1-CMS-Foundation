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
            if (configuration == null) throw new ArgumentNullException("configuration");
            if (packageUninstallerContext == null) throw new ArgumentNullException("packageUninstallerContext");

            this.Configuration = configuration;
#pragma warning disable 618
            this.AddOnUninstallerContex = packageUninstallerContext;
#pragma warning restore 618
            this.UninstallerContext = packageUninstallerContext;
        }


        /// <exclude />
        public abstract IEnumerable<PackageFragmentValidationResult> Validate();

        /// <exclude />
        public abstract void Uninstall();

        /// <exclude />
        protected IEnumerable<XElement> Configuration { get; set; }

        /// <exclude />
        [Obsolete("Use PackageInformation")]        
        protected PackageUninstallerContext AddOnUninstallerContex { get; private set; }

        /// <exclude />
        [Obsolete("Use UninstallerContext")]
        protected PackageUninstallerContext UninstallerContex { get { return UninstallerContext; }  }

        /// <exclude />
        protected PackageUninstallerContext UninstallerContext { get; private set; }

        internal static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
    }
}
