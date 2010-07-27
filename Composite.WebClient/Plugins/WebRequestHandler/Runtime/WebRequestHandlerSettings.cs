using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.WebClient.Plugins.WebRequestHandler.Runtime
{
    internal class WebRequestHandlerSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.WebClient.Plugins.WebRequestConfiguration";

        private const string _webRequestHandlersProperty = "WebRequestHandlers";
        [ConfigurationProperty(_webRequestHandlersProperty, IsRequired = true)]
        public NameTypeManagerTypeConfigurationElementCollection<WebRequestHandlerData> WebRequestHandlers
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<WebRequestHandlerData>)base[_webRequestHandlersProperty];
            }
        }
    }
}
