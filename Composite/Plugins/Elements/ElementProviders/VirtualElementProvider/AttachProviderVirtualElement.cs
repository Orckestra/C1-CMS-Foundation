using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [ConfigurationElementType(typeof(AttachProviderVirtualElement))]
    internal class AttachProviderVirtualElement : VirtualElementConfigurationElement
    {
        private const string _providerNameProperty = "providerName";
        [ConfigurationProperty(_providerNameProperty, IsRequired = true)]
        public string ProviderName
        {
            get { return (string)base[_providerNameProperty]; }
            set { base[_providerNameProperty] = value; }
        }
    }
}
