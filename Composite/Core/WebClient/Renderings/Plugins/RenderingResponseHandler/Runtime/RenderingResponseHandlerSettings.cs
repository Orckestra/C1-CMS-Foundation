using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Configuration;
using Composite.Core.Configuration;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    internal sealed class RenderingResponseHandlerSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandlerConfiguration";


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
