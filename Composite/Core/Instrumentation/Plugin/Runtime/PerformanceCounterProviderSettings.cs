using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Instrumentation.Plugin.Runtime
{
	internal sealed class PerformanceCounterProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Core.Instrumentation.Plugin.Runtime.PerformanceCounterProviderConfiguration";


        private const string _defaultPerformanceCounterProviderNameProperty = "defaultPerformanceCounterProviderName";
        [ConfigurationProperty(_defaultPerformanceCounterProviderNameProperty, IsRequired = true)]
        public string DefaultPerformanceCounterProviderName
        {
            get { return (string)base[_defaultPerformanceCounterProviderNameProperty]; }
            set { base[_defaultPerformanceCounterProviderNameProperty] = value; }
        }


        private const string _performanceCounterProviderPluginsProperty = "PerformanceCounterProviderPlugins";
        [ConfigurationProperty(_performanceCounterProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<PerformanceCounterProviderData> PerformanceCounterProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<PerformanceCounterProviderData>)base[_performanceCounterProviderPluginsProperty];
            }
        }
	}
}
