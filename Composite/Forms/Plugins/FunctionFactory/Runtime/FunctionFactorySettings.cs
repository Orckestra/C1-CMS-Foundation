using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Configuration;


namespace Composite.Forms.Plugins.FunctionFactory.Runtime
{
    internal sealed class FunctionFactorySettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Forms.Plugins.FunctionFactoryConfiguration";

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



    internal sealed class NamespaceConfigurationElement : NamedConfigurationElement
    {       
        private const string _factoriesPropertyName = "Factories";
        [ConfigurationProperty(_factoriesPropertyName, IsRequired=true)]
        public NameTypeManagerTypeConfigurationElementCollection<FunctionFactoryData> Factories
        {
            get { return (NameTypeManagerTypeConfigurationElementCollection<FunctionFactoryData>)base[_factoriesPropertyName]; }
        }
    }



    internal sealed class NamespaceConfigurationElementCollection : ConfigurationElementCollection
    {
        public NamespaceConfigurationElementCollection()
        {
            AddElementName = "Namespace";
        }

        public void Add(NamespaceConfigurationElement element)
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
}
