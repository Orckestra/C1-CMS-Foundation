using System.Globalization;
using Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime;
using Composite.Data;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.Routing.Plugins.PageUrlsProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [CustomFactory(typeof(PageUrlProviderCustomFactory))]
    public interface IPageUrlProvider: IUrlProvider<IPage>
    {
        /// <summary>
        /// Creates a new instance of PageUrlBuilder which will be used while building a C1 pages sitemap
        /// </summary>
        /// <param name="publicationScope">The publication scope.</param>
        /// <param name="localizationScope">The localization scope.</param>
        /// <param name="urlSpace">The URL space. Is used for providing different urls for f.e. different hostnames, etc.</param>
        /// <returns></returns>
        IPageUrlBuilder CreateUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace);
    }
}
