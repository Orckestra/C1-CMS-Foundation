using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class IOProviderSettings : SerializableConfigurationSection
    {
        /// <exclude />
        public const string SectionName = "Composite.Core.IO.Plugins.IOProviderConfiguration";

        
        private const string _defaultIOProviderProviderProperty = "defaultIOProvider";
        /// <summary>
        /// </summary>
        [ConfigurationProperty(_defaultIOProviderProviderProperty, IsRequired = true)]        
        public string DefaultIOProvider
        {
            get { return (string)base[_defaultIOProviderProviderProperty]; }
            set { base[_defaultIOProviderProviderProperty] = value; }
        }



        private const string _ioProviderPluginsProperty = "IOProviderPlugins";
        /// <summary>
        /// </summary>
        [ConfigurationProperty(_ioProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<IOProviderData> IOProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<IOProviderData>)base[_ioProviderPluginsProperty];
            }
        }
    }
}
