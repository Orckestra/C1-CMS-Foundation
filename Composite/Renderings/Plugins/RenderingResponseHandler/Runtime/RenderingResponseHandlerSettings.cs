using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Configuration;
using Composite.Configuration;


namespace Composite.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    public sealed class RenderingResponseHandlerSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Renderings.Plugins.RenderingResponseHandlerConfiguration";


        private const string _hookRegistratorPluginsProperty = "RenderingResponseHandlerPlugins";
        [ConfigurationProperty(_hookRegistratorPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<RenderingResponseHandlerData> RenderingResponseHandlerPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<RenderingResponseHandlerData>)base[_hookRegistratorPluginsProperty];
            }
        }
	}
}
