using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Core.Configuration;


namespace Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime
{
    internal sealed class UiControlFactorySettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Forms.Plugins.UiControlFactoryConfiguration";


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



    internal sealed class NamespaceConfigurationElement : NamedConfigurationElement
    {
        private const string _factoriesPropertyName = "Factories";
        [ConfigurationProperty(_factoriesPropertyName, IsRequired = true)]
        public NameTypeManagerTypeConfigurationElementCollection<UiControlFactoryData> Factories
        {
            get { return (NameTypeManagerTypeConfigurationElementCollection<UiControlFactoryData>)base[_factoriesPropertyName]; }
        }
    }



    internal sealed class NamespaceConfigurationElementCollection : ConfigurationElementCollection
    {
        public NamespaceConfigurationElementCollection()
            : base()
        {
            AddElementName = "Namespace";
        }

        public void Add(NamedConfigurationElement element)
        {
            BaseAdd(element);
        }

        new public NamespaceConfigurationElement this[string Name]
        {
            get
            {
                return (NamespaceConfigurationElement)BaseGet(Name);
            }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new NamespaceConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return (element as NamespaceConfigurationElement).Name;
        }
    }



    internal sealed class ChannelConfigurationElement : NamedConfigurationElement
    {
        private const string _debugControlNamespacePropertyName = "debugControlNamespace";
        [ConfigurationProperty(_debugControlNamespacePropertyName, IsRequired = true)]
        public string DebugControlNamespace
        {
            get { return (string)base[_debugControlNamespacePropertyName]; }
            set { base[_debugControlNamespacePropertyName] = value; }
        }


        private const string _debugControlNamePropertyName = "debugControlName";
        [ConfigurationProperty(_debugControlNamePropertyName, IsRequired = true)]
        public string DebugControlName
        {
            get { return (string)base[_debugControlNamePropertyName]; }
            set { base[_debugControlNamePropertyName] = value; }
        }


        private const string _namespacesProperty = "Namespaces";
        [ConfigurationProperty(_namespacesProperty, IsRequired = true)]
        public NamespaceConfigurationElementCollection Namespaces
        {
            get
            {
                return (NamespaceConfigurationElementCollection)base[_namespacesProperty];
            }
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
