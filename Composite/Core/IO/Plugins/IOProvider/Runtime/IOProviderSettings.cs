using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.IO.Plugins.IOProvider.Runtime
{
    internal sealed class IOProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Core.IO.Plugins.IOProviderConfiguration";


        private const string _defaultIOProviderProviderProperty = "defaultIOProvider";
        [ConfigurationProperty(_defaultIOProviderProviderProperty, IsRequired = true)]
        public string DefaultIOProvider
        {
            get { return (string)base[_defaultIOProviderProviderProperty]; }
            set { base[_defaultIOProviderProviderProperty] = value; }
        }



        private const string _ioProviderPluginsProperty = "IOProviderPlugins";
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
