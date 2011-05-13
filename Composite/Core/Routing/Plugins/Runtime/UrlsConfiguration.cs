using System.Configuration;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Routing.Plugins.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UrlsConfiguration : SerializableConfigurationSection
    {
        /// <exclude />
        public const string SectionName = "Composite.Core.Urls";


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

        private const string _urlFormattersProperty = "UrlFormatters";
        /// <exclude />
        [ConfigurationProperty(_urlFormattersProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<UrlFormatterData> UrlFormatters
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<UrlFormatterData>)base[_urlFormattersProperty];
            }
        }
    }
}
