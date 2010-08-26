using System;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime
{
    internal sealed class UiControlFactoryCustomFactory : AssemblerBasedCustomFactory<IUiControlFactory, UiControlFactoryData>
    {
        protected override UiControlFactoryData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            UiControlFactorySettings settings = configurationSource.GetSection(UiControlFactorySettings.SectionName) as UiControlFactorySettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", UiControlFactorySettings.SectionName));
            }

            int index1 = name.IndexOf("->");
            int index2 = name.IndexOf("->", index1 + 1);

            string channelName = name.Substring(0, index1);
            string namespaceName = name.Substring(index1 + 2, index2 - index1 - 2);
            string tag = name.Substring(index2 + 2);

            ChannelConfigurationElement channelElement = settings.Channels[channelName];
            if (null == channelElement) throw new ConfigurationErrorsException(string.Format("The channel {0} is missing from the configuration", channelName));

            NamespaceConfigurationElement namespaceElement = channelElement.Namespaces[namespaceName];
            if (null == namespaceElement) throw new ConfigurationErrorsException(string.Format("The namespace {0} is missing from the configuration of channel {1}", namespaceName, channelName));

            return namespaceElement.Factories.Get(tag);
        }
    }

}
