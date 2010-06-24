using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
{


    [ConfigurationElementType(typeof(ProviderHookingElementConfigurationElement))]
    public sealed class ProviderHookingElementConfigurationElement : BaseElementConfigurationElement
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
    public sealed class ProviderHookingElementConfigurationElement : BaseElementConfigurationElement
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
