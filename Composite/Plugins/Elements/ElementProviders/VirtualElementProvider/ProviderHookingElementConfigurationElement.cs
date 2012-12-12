using System;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [Obsolete()]
    [ConfigurationElementType(typeof(ProviderHookingElementConfigurationElement))]
    internal sealed class ProviderHookingElementConfigurationElement : BaseElementConfigurationElement
    {
        private const string _providerNameProperty = "providerName";
        [ConfigurationProperty(_providerNameProperty, IsRequired = true)]
        public string ProviderName
        {
            get { return (string)base[_providerNameProperty]; }
            set { base[_providerNameProperty] = value; }
        }
    }

    /*[ConfigurationElementType(typeof(ProviderHookingElementConfigurationElement))]
    internal sealed class ProviderHookingElementConfigurationElement : BaseElementConfigurationElement
    {                                                
        private const string _providerNameProperty = "providerName";
        [ConfigurationProperty(_providerNameProperty, IsRequired = true)]
        public string ProviderName
        {
            get { return (string)base[_providerNameProperty]; }
            set { base[_providerNameProperty] = value; }
        }
    }*/
}
