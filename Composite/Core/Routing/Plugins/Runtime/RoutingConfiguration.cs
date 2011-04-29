using System.Configuration;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Routing.Plugins.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RoutingConfiguration : SerializableConfigurationSection
    {
        /// <exclude />
        public const string SectionName = "Composite.Core.Routing";


        private const string _defaultPageUrlProviderNameProperty = "defaultPageUrlProviderName";
        /// <exclude />
        [ConfigurationProperty(_defaultPageUrlProviderNameProperty, IsRequired = true)]
        public string DefaultPageUrlProviderName
        {
            get { return (string)base[_defaultPageUrlProviderNameProperty]; }
            set { base[_defaultPageUrlProviderNameProperty] = value; }
        }


        private const string _pageUrlProvidersProperty = "PageUrlProviders";
        /// <exclude />
        [ConfigurationProperty(_pageUrlProvidersProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<PageUrlProviderData> PageUrlProviders
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<PageUrlProviderData>)base[_pageUrlProvidersProperty];
            }
        }
    }
}
