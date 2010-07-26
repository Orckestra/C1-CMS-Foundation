using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Configuration;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory.Runtime
{
    internal sealed class UiContainerFactorySettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Forms.Flows.Plugins.UiContainerFactoryConfiguration";


        private const string _channelsProperty = "Channels";
        [ConfigurationProperty(_channelsProperty, IsRequired = true)]
        public ChannelConfigurationElementCollection Channels
        {
            get
            {
                return (ChannelConfigurationElementCollection)base[_channelsProperty];
            }
        }
    }



    internal sealed class ChannelConfigurationElement : NamedConfigurationElement
    {
        private const string _factoriesPropertyName = "Factories";
        [ConfigurationProperty(_factoriesPropertyName, IsRequired = true)]
        public NameTypeManagerTypeConfigurationElementCollection<UiContainerFactoryData> Factories
        {
            get { return (NameTypeManagerTypeConfigurationElementCollection<UiContainerFactoryData>)base[_factoriesPropertyName]; }
        }
    }



    internal sealed class ChannelConfigurationElementCollection : ConfigurationElementCollection
    {
        public ChannelConfigurationElementCollection()
            : base()
        {
            AddElementName = "Channel";
        }

        public void Add(ChannelConfigurationElement channelConfigurationElement)
        {
            BaseAdd(channelConfigurationElement);
        }

        new public ChannelConfigurationElement this[string Name]
        {
            get
            {
                return (ChannelConfigurationElement)BaseGet(Name);
            }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new ChannelConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return (element as ChannelConfigurationElement).Name;
        }
    }

}
