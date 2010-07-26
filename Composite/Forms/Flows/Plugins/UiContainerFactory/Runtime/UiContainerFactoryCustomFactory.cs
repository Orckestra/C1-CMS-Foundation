using System;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory.Runtime
{
    internal sealed class UiContainerFactoryCustomFactory : AssemblerBasedCustomFactory<IUiContainerFactory, UiContainerFactoryData>
    {
        protected override UiContainerFactoryData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            UiContainerFactorySettings settings = configurationSource.GetSection(UiContainerFactorySettings.SectionName) as UiContainerFactorySettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", UiContainerFactorySettings.SectionName));
            }

            int index1 = name.IndexOf("->");

            string channelName = name.Substring(0, index1);
            string containerName = name.Substring(index1 + 2);

            ChannelConfigurationElement channelElement = settings.Channels[channelName];
            if (null == channelElement) throw new ConfigurationErrorsException(string.Format("The channel {0} is missing from the configuration", channelName));

            return channelElement.Factories.Get(containerName);
        }
    }

}
